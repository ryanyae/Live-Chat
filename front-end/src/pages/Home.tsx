import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import SeeFriends from "../messaging/seeFriends";
import SeeMessages from "../messaging/seeMessages";

interface jwtDecoded {
    username:any,
    iat:Number,
    exp:Number
}

export default function Home() {
    var localStorageCookie = localStorage.getItem('info')
    
    const GET_USER = gql`
        query getUser($username:String!){
            getUser(username:$username token:$token) {
                username token
            }
    }`

    const [checkUser, { loading, error, data }] = useLazyQuery(GET_USER)


    useEffect(() => {
        try {
            verifyUser()
            
        } catch (error) {
            console.log("failed verification in the front end")
        }
    }, [localStorageCookie])

    const verifyUser = async () => {
        try {
            const tokenValue = localStorage.getItem('info')
            if (!tokenValue) {
                throw new Error("Bad cookie")
            }

            const verifyDecoded = await checkUser({ variables: {username: tokenValue}})

        } catch (error) {
            console.log("error")
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