import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export default function Login() {

    const loginErrorHTMLDiv = React.useRef<HTMLInputElement>(null)

    interface UserInfo {
        username: string,
        password: string,
    }

    const [loginVariable, setLoginVariable] = useState<UserInfo>({
        username: "",
        password: ""
    })

    const LOGIN_USER = gql`
        query login($username:String! $password:String!) {
            login(username:$username password:$password) {
                username
            }
        }
    `

    const [loginUser] = useLazyQuery(LOGIN_USER, {
        fetchPolicy: "network-only",
        onCompleted(data) {
            localStorage.setItem('info', data.login.username)
            window.location.href = "http://localhost:3000/home"
        }
    })

    const handleLogin = async (e: any) => {
        e.preventDefault()
        try {
            console.log(loginVariable.username)
            if (localStorage.getItem("item")) {
                localStorage.removeItem("item")
            }
            var token = await loginUser({
                variables: {
                    username: loginVariable.username,
                    password: loginVariable.password
                }
            })
            if (!token.data) {
                throw new Error()
            }
        } catch (err) {
            setLEDisplayT()
        }

    }

    const setLEDisplayF = () => {
        if (!loginErrorHTMLDiv.current) {

            return
        }

        loginErrorHTMLDiv.current.style.display = "none"
    }

    const setLEDisplayT = () => {
        if (!loginErrorHTMLDiv.current) {

            return
        }

        loginErrorHTMLDiv.current.style.display = "block"
    }

    const onChange = (e: any, type: String) => {
        if (type === "username") {
            setLoginVariable({ ...loginVariable, username: e.target.value })
        } else if (type === "password") {
            setLoginVariable({ ...loginVariable, password: e.target.value })
        }

        setLEDisplayF()
    }


    return (
        <>
            <div id='loginContainer'>
                <div id="loginTitle">Log into Live Chat</div>
                <input type='text' id='usernameInput' className="loginInputs" placeholder="Username" onChange={(e) =>
                    onChange(e, "username")} />
                <input type='password' id='passwordInput' className="loginInputs" placeholder="Password" onChange={(e) =>
                    onChange(e, "password")} />
                <div id="loginError" className="errorMessage" ref={loginErrorHTMLDiv}>
                    Login failed
                </div>
                <div id='loginButtonDiv'>
                    <div id="loginButton" onClick={handleLogin}>
                        <div id="loginButtonTitle">
                            Log In
                        </div>
                    </div>
                    <Link to='/recover' id='recoverRedirect' className='redirectLink'>Forgot Password?</Link>
                    <div id="registerRedirectDiv" onClick={() => {
                        window.location.href = "http://localhost:3000/register"
                    }}>
                        <div id="registerTitle">
                            Make Account
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
