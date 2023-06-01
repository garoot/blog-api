import styles from './navbar.module.css'


export default function Navbar({}) {
    return (
        <div className={styles.container}>
                <div className={styles.navLeft}>
                    <input className={styles.searchBar} type="text" placeholder='Search for courses and blogs..'/>
                </div>
                <ul className={styles.navRight}>
                    <li><a className={styles.btn} href=""><img src="/icons/cart.png" alt="" /></a></li>
                    <li><a className={styles.btn} href=""><img src="/icons/notifications.png" alt="" /></a> </li>
                    {/* <li><a className={styles.profile} href="">Profile</a></li> */}
                    <li><button className={styles.profile}>Profile</button></li>
                </ul>
        </div>
    )
}
