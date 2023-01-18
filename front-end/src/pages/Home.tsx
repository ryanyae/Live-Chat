import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import SeeFriends from "../messaging/seeFriends";
import SeeMessages from "../messaging/seeMessages";
import '../style/Home.css';


export default function Home() {
    interface LocalStorage {
        item: string
    }

    const GET_USER = gql`
        query getUser($username:String!){
            getUser(username:$username) {
                username
            }
    }`

    const [checkUser] = useLazyQuery(GET_USER)

    var localStorageCookie = localStorage.getItem('info')

    const [localStorageItem, setLocalItem] = useState<LocalStorage>({
        item: ""
    })

    useEffect(() => {
        verifyUser()
    }, [localStorageItem])

    useEffect(() => {
        window.addEventListener('storage', () => {

            // When local storage changes, dump the list to
            // the console.
            if (!localStorageCookie) return
            setLocalItem({ item: localStorageCookie })
        })
    }, [])

    const verifyUser = async () => {
        try {
            if (!localStorageCookie) {
                throw new Error("Bad cookie")
            }

            const verifyDecoded = await checkUser({ variables: { username: localStorageCookie } })

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
                <SeeFriends />
                <SeeMessages />
            </div>
        </>
    )
}