import {Link} from 'react-router-dom'

export default function Login() {

    return(
        <>
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet"></link>
            <div id='loginContainer'>
                <div id="loginTitle">Log into Live Chat</div>
                <input type='text' id='usernameInput' className="loginInputs" placeholder="Username"/>
                <input type='text' id='passwordInput' className="loginInputs" placeholder="Password"/>
                <div id='loginButtonDiv'>
                    <div id="loginButton">
                        <div id="loginButtonTitle">
                            Log In
                        </div>
                    </div>
                    <Link to='/recover' id='recoverRedirect' className='redirectLink'>Forgot Password?</Link>
                    <div id="registerRedirectDiv">
                        <div id="registerTitle">
                            Make Account
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
