export default function Register() {
    return(
        <>
            <div id="loginContainer">
                <div id="registerContainerTitle">
                    Create an  Account
                </div>
                <input id="newFirstName" className="infoInput" placeholder="First Name"/>
                <input type="passowrd" id="newLastName" className="infoInput" placeholder="Last name"/>
                <input id="newUsername" className="infoInput" placeholder="Username"/>
                <input id="newEmail" className="infoInput" placeholder="Email"/>
                <input id="newPassword" className="infoInput" placeholder="Password"/>
                <div className="inputDiv">
                    <div id="birthdayDiv">
                        <div className="inputTitle">Birthday</div>
                        <input type="date" id="newBirthday" className="infoInput" placeholder="Birthday"/>
                    </div>
                    <div id="genderDiv">
                        <div className="inputTitle">Gender</div>
                        <div className="customSelect">
                            <select id="genderOptions" className="infoInput">
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
            </div>
        </>
    )
}