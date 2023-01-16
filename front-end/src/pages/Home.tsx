import { gql, useLazyQuery } from '@apollo/client';
import { verify } from 'crypto';
import { useEffect } from 'react';
import SeeFriends from "../messaging/seeFriends";
import SeeMessages from "../messaging/seeMessages";


export default function Home() {
    var localStorageCookie = localStorage.getItem('info')
    
    const GET_USER = gql`
        query getUser($username:String!){
            getUser(username:$username) {
                username
            }
    }`

    const [checkUser] = useLazyQuery(GET_USER)

    useEffect(() => {
        try {
            verifyUser()
            
        } catch (error) {
            console.log("failed verification in the front end")
        }
    }, [localStorageCookie])

    const verifyUser = async () => {
        try {
            const itemValue = localStorage.getItem('info')
            if (!itemValue) {
                throw new Error("Bad cookie")
            }

            const verifyDecoded = await checkUser({ variables: {username: itemValue}})

            if (!verifyDecoded.data) {
                throw new Error("Bad Verfication")
            }

        } catch (error) {
            window.location.href = "http://localhost:3000/login"
        }
    }

    return (
        <>
            <div id='homeDiv'>
                <SeeFriends/>
                <SeeMessages/>
            </div>
        </>
    )
}