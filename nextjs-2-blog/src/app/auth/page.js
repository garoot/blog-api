import styles from './auth.module.css'

export default function AuthWindow({ Component, pageProps }) {
    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <div className={styles.buttons}>
                    <button id={styles.registerButton}>Register</button>
                    <button id={styles.login}>Login</button>
                </div>
                <div className={styles.socialAuth}>
                    <button id={styles.google}>
                        <img src="/images/Google.png" alt="" />
                    </button>
                    <button id={styles.facebook}>
                        <img src="/images/facebook.png" alt="" />
                    </button>
                </div>
                <form className={styles.loginForm} action="">
                    <label htmlFor="userName">
                        <input type="text" name="username" id="userName" placeholder='Email Address'/>
                    </label>
                    <label htmlFor="password">
                        <input type="text" name="password" id="password" placeholder='Password'/>
                    </label>
                    <button className={styles.submitButton} type='submit'>Login</button>
                </form>

            </div>
        </div>

    )
}
