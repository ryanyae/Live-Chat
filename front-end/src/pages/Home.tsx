import { gql, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";

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
    // const GET_USERS = gql`
    //     query getUsers {
    //         getUsers {
    //             username, token
    //         }
    // }`
    const [checkUser] = useLazyQuery(GET_USER)
    // const [getUsers] = useLazyQuery(GET_USERS)


    useEffect(() => {
        verifyUser()
        // loadUserInfo()
    }, [localStorageCookie])

    const verifyUser = async () => {
        try {
            const tokenValue = localStorage.getItem('info')
            if (!tokenValue) {
                throw new Error("Bad cookie")
            }

            const jwtDecoded:jwtDecoded = jwt_decode(tokenValue) 

            const verifyDecoded = await checkUser(jwtDecoded.username)

            console.log(verifyDecoded)
            
        } catch (error) {
            window.location.href = "http://localhost:3000/login"
        }
    }

    // const loadUserInfo = async () => {
    //     try {
    //         // const tokenValue = localStorage.getItem('info')
    //         // const getInfo = await getUsers()

    //         // //TODO Load all user data (conversations that this user has had with other users)
            
    //     } catch (error) {
    //         throw error
    //     }
    // }

    return (
        <>
        </>
    )
}