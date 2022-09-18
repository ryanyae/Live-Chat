import {Link} from 'react-router-dom'
import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

export default function Login() {

    interface UserInfo {
        username: string,
        password: string,
        token?:string
    }

    const [loginVariable, setLoginVariable] =  useState<UserInfo>({
        username:"",
        password:""
    })

    const LOGIN_USER = gql`
        query login($username:String! $password:String!) {
            login(username:$username password:$password) {
                username, token
            }
        }
    `
    
    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        fetchPolicy: "network-only",
        onCompleted(data) {
            console.log(data)
            localStorage.setItem('token', data.login.token)
            
        }
    })

    const handleLogin = async (e:any) => {
        e.preventDefault()

        try{  
            const user = await loginUser({ 
                variables: { 
                    username: loginVariable.username, 
                    password:loginVariable.password
            }})
    } catch (err) {
        throw err
    }
      
    }

    return(
        <>
            <div id='loginContainer'>
                <div id="loginTitle">Log into Live Chat</div>
                <input type='text' id='usernameInput' className="loginInputs" placeholder="Username" onChange={(e) =>
                setLoginVariable({ ...loginVariable, username: e.target.value })}/>
                <input type='text' id='passwordInput' className="loginInputs" placeholder="Password" onChange={(e) =>
                setLoginVariable({ ...loginVariable, password: e.target.value })}/>
                <div id='loginButtonDiv'>
                    <div id="loginButton" onClick={ handleLogin }>
                        <div id="loginButtonTitle">
                            Log In
                        </div>
                    </div>
                    <Link to='/recover' id='recoverRedirect' className='redirectLink'>Forgot Password?</Link>
                    <div id="registerRedirectDiv" onClick={() => {
                        window.location.href="http://localhost:3000/register"
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
