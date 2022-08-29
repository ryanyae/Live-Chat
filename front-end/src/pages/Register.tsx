import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    
    var newFirstNameRef:any = React.useRef<HTMLInputElement>(null)
    var newLastNameRef:any = React.useRef<HTMLInputElement>(null)
    var newUsernameRef:any = React.useRef<HTMLInputElement>(null)
    var newEmailRef:any = React.useRef<HTMLInputElement>(null)
    var newPasswordRef:any = React.useRef<HTMLInputElement>(null)
    var newBirthdayRef:any = React.useRef<HTMLInputElement>(null)
    var newGenderRef:any = React.useRef<HTMLSelectElement>(null!)
    
    return(
        <>
            <div id="loginContainer">
                <div id="registerContainerTitle">
                    Create an  Account
                </div>
                <input id="newFirstName" className="infoInput" placeholder="First Name" ref={newFirstNameRef}/>
                <input type="passowrd" id="newLastName" className="infoInput" placeholder="Last name" ref={newLastNameRef}/>
                <input id="newUsername" className="infoInput" placeholder="Username" ref={newUsernameRef}/>
                <input id="newEmail" className="infoInput" placeholder="Email" ref={newEmailRef}/>
                <input id="newPassword" className="infoInput" placeholder="Password" ref={newPasswordRef}/>
                <div className="inputDiv">
                    <div id="birthdayDiv">
                        <div className="inputTitle">Birthday</div>
                        <input type="date" id="newBirthday" className="infoInput" placeholder="Birthday" ref={newBirthdayRef}/>
                    </div>
                    <div id="genderDiv">
                        <div className="inputTitle">Gender</div>
                        <div className="customSelect">
                            <select id="genderOptions" className="infoInput" ref={newGenderRef}>
                                <option value="dummyOption">--Select an Option--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="registerButton">
                    <div id='registerButtonTitle'>
                        Register
                    </div>
                </div>
                <Link to="/login" id="loginRedirect" className='redirectLink'>Already have an account?</Link>
                {/* ^ This link uses similar class styling as redirectLink seen in Login.css in the styles folder */}
            </div>
        </>
    )
}