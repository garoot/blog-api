import styles from './sidebar.module.css'

export default function Sidebar({ }) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarTop}>
                <div className={styles.sidebarLogo}>
                    <img src="/images/logo.png" alt="" />
                </div>
                <button>Explore</button>
                <button>Courses</button>
                <button className={styles.gold}>Upcoming</button>
                <button className={styles.used}>Used Courses</button>
                <button>Blogs</button>
                <div>
                    <hr />
                </div>
                <button>Settings</button>
            </div>
            <div className={styles.sidebarBottom}>
                <button>About Us</button>
                <button>Support</button>
            </div>
        </div>
    )
}
