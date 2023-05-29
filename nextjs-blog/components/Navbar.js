import styles from './Navbar.module.css'


export default function Navbar({}) {
    return (
        <div className={styles.container}>
                <div className={styles.searchBarContainer}>
                    <input className={styles.searchBar} type="text" placeholder='Search for courses and blogs..'/>
                </div>
                <ul className={styles.nav}>
                    <li><a className={styles.btn} href="">Cart</a></li>
                    <li><a className={styles.btn} href="">Notifications</a> </li>
                    <li><a className={styles.profile} href="">Profile</a></li>
                </ul>
        </div>
    )
}
