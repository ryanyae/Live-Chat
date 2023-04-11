import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';
import { join } from 'path';

export default function Register() {
    interface RegisterObject {
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
        birthday: string,
        gender: string
    }

    //Instead of feeding out mutations loads of different fields, we want to just feed it thge registerObject
    // that has all the fields inside of it.
    var [registerVariable, setRegisterVariable] = useState<RegisterObject>({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        birthday: "",
        gender: ""
    })

    const REGISTER_USER = gql`
            mutation register(
                $username: String!,
                $password: String!,
                $email: String!,
                $firstname: String!,
                $lastname: String!
                $birthday: String!, 
                $gender: String!) {
            register(
                username:$username,
                password:$password, 
                email:$email, 
                firstname:$firstname,
                lastname:$lastname,
                birthday:$birthday,
                gender: $gender) {
                username
                email
            }
            }
    `;

    const [registerUser] = useMutation(REGISTER_USER)

    const handleRegister = (e: any) => {
        e.preventDefault()

        try {
            registerUser({
                variables: {
                    username: registerVariable.username,
                    password: registerVariable.password,
                    email: registerVariable.email,
                    firstname: registerVariable.firstName,
                    lastname: registerVariable.lastName,
                    birthday: registerVariable.birthday,
                    gender: registerVariable.gender
                }
            })

            window.location.href="http://localhost:3000/login"

        } catch (err) {
            console.log("hi")
        }
    }


    return (
        <>
            <div id="loginContainer">
                <div id="registerContainerTitle">
                    Create an  Account
                </div>
                <input id="newFirstName" className="infoInput" placeholder="First Name" onChange={(e) =>
                    setRegisterVariable({ ...registerVariable, firstName: e.target.value })} />
                <input id="newLastName" className="infoInput" placeholder="Last name" onChange={(e) =>
                    setRegisterVariable({ ...registerVariable, lastName: e.target.value })} />
                <input id="newUsername" className="infoInput" placeholder="Username" onChange={(e) =>
                    setRegisterVariable({ ...registerVariable, username: e.target.value })} />
                <input id="newEmail" className="infoInput" placeholder="Email" onChange={(e) =>
                    setRegisterVariable({ ...registerVariable, email: e.target.value })} />
                <input id="newPassword" className="infoInput" placeholder="Password" type="password" onChange={(e) =>
                    setRegisterVariable({ ...registerVariable, password: e.target.value })} />
                <div className="inputDiv">
                    <div id="birthdayDiv">
                        <div className="inputTitle">Birthday</div>
                        <input type="date" id="newBirthday" className="infoInput" placeholder="Birthday" onChange={(e) =>
                            setRegisterVariable({ ...registerVariable, birthday: e.target.value })} />
                    </div>
                    <div id="genderDiv">
                        <div className="inputTitle">Gender</div>
                        <div className="customSelect">
                            <select id="genderOptions" className="infoInput" onChange={(e) =>
                                setRegisterVariable({ ...registerVariable, gender: e.target.value })}>
                                <option value="dummyOption">--Select an Option--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="registerButton" onClick={handleRegister}>
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