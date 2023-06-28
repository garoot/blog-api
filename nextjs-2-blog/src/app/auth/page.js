"use client"

import { useEffect, useRef, useState } from 'react'
import styles from './auth.module.css'

export default function AuthWindow({authWindow, setAuthWindow }) {

    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

    // const mainContainer = useRef(null)
    // const popupContainer = useRef(null)

    const [mainContainer, setMainContainer] = useState()
    const [popupContainer, setPopupContainer] = useState()

    useEffect(() => {
        // setMainContainer(document.getElementsByClassName("container"))
        // if(mainContainer){
        //     mainContainer[0].addEventListener("click", closeAuthWindow)
        // }
        // document.getElementById("popup").addEventListener('click', function(e){
        //     console.log("popup clicked")
        //     console.log(e.target.className)
        // })
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
    // document.getElementById("mainContainer").addEventListener("mousedown", closeAuthWindow, false)

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

    // const closeAuthWindow = () => {
    //     console.log(e)
    //     console.log("click")
    // }


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
                    <form className={styles.loginForm} action="">
                        <label htmlFor="userName">
                            <input type="text" name="emailAddress" id="emailAddress" placeholder='Email Address'/>
                        </label>
                        <label htmlFor="password">
                            <input type="text" name="password" id="password" placeholder='Password'/>
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
                            <input type="text" name="password" id="password" placeholder='Password'/>
                        </label>
                        <label htmlFor="password2">
                            <input type="text" name="password2" id="password2" placeholder='Repeat your password'/>
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
