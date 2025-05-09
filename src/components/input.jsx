import React from 'react'

const Input = ({activeComponent,GeneralInfo,OnGeneralInfoChange}) => {
    const render = () => {
        switch(activeComponent){
            case"generalInfo":
                
                    console.log("generalInfo");
                    return (<div>
                        <label>First name<input 
                            label="first name" 
                            placeholder='John' 
                            value={GeneralInfo.firstname} 
                            type="text"
                            onChange={value=>OnGeneralInfoChange("firstname",value)}
                            /></label>
                        <label>Last name<input 
                            label="last name" 
                            placeholder='Doe' 
                            value={GeneralInfo.lastname}
                            type="text"
                            onChange={value=>OnGeneralInfoChange("lastname",value)}
                            /></label>
                        <label>Phone<input 
                            label="phone"
                            placeholder='55555555'
                            value={GeneralInfo.phone}
                            type="text"
                            onChange={value=>OnGeneralInfoChange("phone",value)}
                            /></label>
                        <label>Email<input 
                            label="email"
                            placeholder='JohnDoe@email.com'
                            value={GeneralInfo.email}
                            type="email"
                            onChange={value=>OnGeneralInfoChange("email",value)}
                            /></label>
                        <label>Location<input 
                            label="location"
                            placeholder='Tunis'
                            value={GeneralInfo.location}
                            type="text"
                            onChange={value=>OnGeneralInfoChange("location",value)}
                            /></label>
                        <label>Languages<input 
                            label="languages" 
                            placeholder='languages'
                            value={GeneralInfo.languages}
                            type="text"
                            onChange={value=>OnGeneralInfoChange("languages",value)}
                            /></label>
                        <label>linkedin<input 
                            label="linkedin"
                            placeholder='linkedin'
                            value={GeneralInfo.linkedin}
                            type="text"
                            onChange={value=>OnGeneralInfoChange("linkedin",value)}

                            /></label>
                        <label>summary<input 
                            label="summary" 
                            placeholder='write a summary' 
                            value={GeneralInfo.summary} 
                            type="textfield"
                            onChange={value=>OnGeneralInfoChange("summary",value)}

                            /></label>  
                    </div>)
                
            case"workExperience":
                
                     console.log("workexp");
                    return(<div>
                        <label>Job title<input 
                        type="text"
                        /></label>
                        <label>Employer<input 
                        type="text"
                        /></label>
                        <label>Job description<input
                        type="textarea" 
                        /></label>
                        <label>start date<input 
                        type="date"
                        /></label>
                        <label>leave date<input 
                        type="date" 
                        /></label>
                        <label>do you still work here<input 
                            type="checkbox"
                        /></label>
                    </div>)
            case"education":
                
                    console.log("Education");
                     return(<div>
                        <label>degree<input 
                            type="text"
                        /></label>
                        <label>school<input 
                            type="text"
                        /></label>
                        <label>start date<input 
                            type="date"                            
                        /></label>
                        <label>finish date<input
                            type="date"
                        /></label>
                        <label>do you still study here<input 
                            type="checkbox"
                        /></label>
                    </div>)
            case"skills":
                
                    console.log("skills");
                    return(<div>
                        <label>add a skill<input type="text"
                            
                        /></label>
                        </div>
                    )

        }
    }
  return (
    <div>
        {render()}
      
    </div>
  )
}

export default Input
