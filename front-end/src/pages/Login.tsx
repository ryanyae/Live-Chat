import {Link} from 'react-router-dom'
import React from 'react'

export default function Login() {

    var usernameRef:any = React.useRef<HTMLInputElement>(null)
    var passwordRef:any = React.useRef<HTMLInputElement>(null)

    return(
        <>
            <div id='loginContainer'>
                <div id="loginTitle">Log into Live Chat</div>
                <input type='text' id='usernameInput' className="loginInputs" placeholder="Username or Email" ref={usernameRef}/>
                <input type='text' id='passwordInput' className="loginInputs" placeholder="Password" ref={passwordRef}/>
                <div id='loginButtonDiv'>
                    <div id="loginButton">
                        <div id="loginButtonTitle">
                            Log In
                        </div>
                    </div>
                    <Link to='/recover' id='recoverRedirect' className='redirectLink'>Forgot Password?</Link>
                    <div id="registerRedirectDiv" onClick={() => {
                        window.location.href="http://localhost:3000/register"
                        console.log(usernameRef.current.value + passwordRef.current.value)
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
