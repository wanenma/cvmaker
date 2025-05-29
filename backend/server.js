const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "your_jwt_secret_key";

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "cvmaker",
});

// Improved database connection handling
db.connect((err) => {
	if (err) {
		console.error("❌ Error connecting to MySQL:", err);
		console.error("Error code:", err.code);
		console.error("Error message:", err.message);
		process.exit(1);
	}
	console.log("✅ Connected to MySQL");
});

// Test database connection
db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error("❌ Database test query failed:", err);
        process.exit(1);
    }
    console.log("✅ Database test query successful");
});

// === Register ===
app.post("/api/register", async (req, res) => {
	const { username, password } = req.body;

	try {
		const hashed = await bcrypt.hash(password, 10);

		db.query(
			"INSERT INTO users (username, password) VALUES (?, ?)",
			[username, hashed],
			(err) => {
				if (err) {
					console.error("❌ Registration error:", err);
					if (err.code === "ER_DUP_ENTRY") {
						return res.status(409).send("Username already exists");
					}
					return res.status(500).send("Server error during registration");
				}
				res.sendStatus(200);
			},
		);
	} catch (e) {
		console.error("❌ Hashing error:", e);
		res.status(500).send("Error hashing password");
	}
});

// === Login ===
app.post("/api/login", (req, res) => {
	const { username, password } = req.body;

	db.query(
		"SELECT * FROM users WHERE username = ?",
		[username],
		async (err, results) => {
			if (err || results.length === 0) {
				return res.status(401).send("Invalid credentials");
			}

			const user = results[0];
			const match = await bcrypt.compare(password, user.password);

			if (!match) return res.status(401).send("Invalid credentials");

			const token = jwt.sign({ id: user.id }, SECRET);
			res.json({ token });
		},
	);
});

// === Auth Middleware ===
function auth(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(401);
	const token = authHeader.split(" ")[1];

	jwt.verify(token, SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

// === Save CV with improved error handling ===
app.post("/api/cv", auth, (req, res) => {
	const { name, email, phone, education, experience, skills } = req.body;
	console.log("📝 Attempting to save CV for user:", req.user.id);
	console.log("CV Data:", { name, email, phone, education, experience, skills });

	db.query(
		"INSERT INTO cvs (user_id, name, email, phone, education, experience, skills) VALUES (?, ?, ?, ?, ?, ?, ?)",
		[req.user.id, name, email, phone, education, experience, skills],
		(err, result) => {
			if (err) {
				console.error("❌ Error saving CV:", err);
				console.error("Error code:", err.code);
				console.error("Error message:", err.message);
				return res.status(500).send("Error saving CV: " + err.message);
			}
			console.log("✅ CV saved successfully. Insert ID:", result.insertId);
			res.status(200).json({ message: "CV saved successfully", id: result.insertId });
		},
	);
});

// === Get CVs for Authenticated User ===
app.get("/api/cvs", auth, (req, res) => {
	db.query(
		"SELECT * FROM cvs WHERE user_id = ?",
		[req.user.id],
		(err, results) => {
			if (err) {
				console.error("❌ Error fetching CVs:", err);
				return res.status(500).send("Error fetching CVs");
			}
			res.json(results);
		},
	);
});

// === Delete CV ===
app.delete("/api/cv/:id", auth, (req, res) => {
    const cvId = req.params.id;
    console.log("🗑️ Attempting to delete CV:", cvId, "for user:", req.user.id);

    // First check if the CV belongs to the user
    db.query(
        "SELECT user_id FROM cvs WHERE id = ?",
        [cvId],
        (err, results) => {
            if (err) {
                console.error("❌ Error checking CV ownership:", err);
                return res.status(500).send("Error checking CV ownership");
            }

            if (results.length === 0) {
                return res.status(404).send("CV not found");
            }

            if (results[0].user_id !== req.user.id) {
                return res.status(403).send("Unauthorized to delete this CV");
            }

            // If we get here, the user owns the CV, so we can delete it
            db.query(
                "DELETE FROM cvs WHERE id = ? AND user_id = ?",
                [cvId, req.user.id],
                (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        console.error("❌ Error deleting CV:", deleteErr);
                        return res.status(500).send("Error deleting CV");
                    }
                    console.log("✅ CV deleted successfully");
                    res.status(200).json({ message: "CV deleted successfully" });
                }
            );
        }
    );
});

app.listen(3001, () =>
	console.log("🚀 Server running on http://localhost:3001"),
);
