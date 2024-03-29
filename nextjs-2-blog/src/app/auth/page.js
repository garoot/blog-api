"use client"

import { useEffect, useRef, useState } from 'react'
import styles from './auth.module.css'
// import {useSession} from "next-auth/react";

export default function AuthWindow({authWindow, setAuthWindow }) {

    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

    // const mainContainer = useRef(null)
    // const popupContainer = useRef(null)

    const [mainContainer, setMainContainer] = useState()
    const [popupContainer, setPopupContainer] = useState()

    // on clicking outside the authWindow, close
    useEffect(() => {
        var popupContainer = document.getElementById("popup")
        var mainContainer = document.getElementById("container")

        mainContainer.addEventListener('click', function(e){
            if(e.target.className == mainContainer.className && authWindow){
                console.log("outside popup")
                console.log(mainContainer.className)
                setAuthWindow(false)
            } else {
                console.log("inside popup")
                console.log(popupContainer.className)
            }
        })

    },[])

    const openLoginForm = () => {
        if(!showLogin){
            setShowLogin(!showLogin)
            setShowRegister(false)
        }
    }
    const openRegisterForm = () => {
        if(!showRegister){
            setShowRegister(!showRegister)
            setShowLogin(false)
        }
    }

    async function sendLoginReq(e){
        e.preventDefault()
        let username = e.currentTarget.elements.username.value
        let password = e.currentTarget.elements.password.value

        const requestContent = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        await fetch("http://localhost:8000/auth/signin",requestContent)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })
    }


    return (
        <div id='container' ref={mainContainer} className={styles.container}>
            <div id='popup' ref={popupContainer} className={styles.popup}>
                <div className={styles.buttons}>
                    <button 
                        onClick={()=> openRegisterForm()} 
                        id={styles.registerButton}
                        style={showRegister? {border: '2px solid rgba(59, 51, 145, 0.871)'}:{}}
                    >
                        Register
                    </button>
                    <button 
                        onClick={()=> openLoginForm()} 
                        id={styles.loginButton}
                        style={showLogin? {border: '2px solid rgba(59, 51, 145, 0.871)'}:{}}
                    >
                        Login
                    </button>
                </div>
                <div className={styles.loginSocialAuth}>
                    <button id={styles.google}>
                        <img src="/images/Google.png" alt="" />
                    </button>
                    <button id={styles.facebook}>
                        <img src="/images/facebook.png" alt="" />
                    </button>
                </div>
                {
                showLogin? (
                    <form className={styles.loginForm} onSubmit={sendLoginReq}>
                        <label htmlFor="emailAddress">
                            <input type="text" name="username" id="emailAddress" placeholder='Email Address'/>
                        </label>
                        <label htmlFor="password">
                            <input type="password" name="password" id="password" placeholder='Password'/>
                        </label>
                        <button className={styles.submitButton} type='submit'>Login</button>
                    </form>
                ):('')
                }
                
                {
                showRegister? (
                    <form action="" className={styles.registerForm}>
                        <label htmlFor="emailAddress">
                            <input type="text" name="emailAddress" id="emailAddress" placeholder='Email Address'/>
                        </label>
                        <label htmlFor="password">
                            <input type="password" name="password" id="password" placeholder='Password'/>
                        </label>
                        <label htmlFor="password2">
                            <input type="password" name="password2" id="password2" placeholder='Repeat your password'/>
                        </label>
                        <button className={styles.submitButton} type='submit'>Register</button>
                    </form>
                ):('')
                }
                
            </div>
            <script> 
            </script>
        </div>

    )
}
