import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import SeeFriends from "../messaging/seeFriends";
import SeeMessages from "../messaging/seeMessages";
import '../style/Home.css';


export default function Home() {
    interface LocalStorage {
        item: string | null
    }

    const GET_USER = gql`
        query getUser($username:String!){
            getUser(username:$username) {
                username
            }
    }`

    const [checkUser] = useLazyQuery(GET_USER)

    var localStorageCookie = localStorage.getItem('info')

    const [localStorageItem, setLocalItem] = useState<LocalStorage>({item:localStorageCookie})
    
    useEffect(() => {
        window.addEventListener('storage', () => {

            // When local storage changes, dump the list to
            // the console.
            if (!localStorageCookie) return
            setLocalItem({item:localStorageCookie})
        })
    }, [])

    useEffect(() => {
        verifyUser()
    }, [localStorageItem])

    const verifyUser = async () => {
        try {
            console.log(localStorageItem)
            if (!localStorageItem.item) {
                throw new Error("Bad cookie")
            }

            const verifyDecoded = await checkUser({ variables: { username: localStorageItem } })
            
            if (!verifyDecoded.data) {
                throw new Error("Bad Verfication")
            }
            

            /* 
                You actually want to store the local storage item with the title of the user's username
                and than use the password as the value inside that localstorage.

                This makes the authentication system more secure as there are 2 layers of verification
            */

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