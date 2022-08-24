export default function Login() {

    return(
        <>
            <div id='loginContainer'>
                <div id='usernameContainer' className="loginInputs">
                    <div className="inputText"> Username</div>
                    <input type='text' id='usernameDiv'/>
                </div>
                <div id='passwordContainer' className="loginInputs">
                <div className="inputText"> Password</div>
                    <input type='text' id='passwordDiv' className="loginInputs"/>
                </div>

                <div id='loginverify'>

                </div>
            </div>
        </>
    )
}
