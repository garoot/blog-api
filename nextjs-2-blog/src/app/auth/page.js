"use client"

import { useEffect, useRef, useState } from 'react'
import styles from './auth.module.css'

export default function AuthWindow({ Component, pageProps }) {

    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const activeLogin = useRef(null)
    const activeRegister = useRef(null)

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

    // useEffect(()=> {
    //     activeLogin.current.focus()
    // })

    // useEffect(() => {
    //     console.log(showLogin)
    //     console.log(showRegister)
    // }, [showLogin, showRegister])


    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <div className={styles.buttons}>
                    <button ref={activeRegister} onClick={()=> openRegisterForm()} id={styles.registerButton}>Register</button>
                    <button ref={activeLogin}  onClick={()=> openLoginForm()} id={styles.login}>Login</button>
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
        </div>

    )
}
