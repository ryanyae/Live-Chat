import "../style/Recover.css"

export default function Recover() {
    return(
    <>
        <div className="generalDiv">
            <div id="titlePanel">
                Recover
            </div>
            <div className="recoverInputDiv">
                <input id="newUsername" className="infoInput" placeholder="Username"/>
            </div>
        </div>
    </>
    )
}