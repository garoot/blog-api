import styles from './prodProfile.module.css'
import ProdProfileAbout from './prodProfileAbout'
import ProfProfileCourses from './prodProfileCourses'

export default function ProdProfile({ }) {
    return (
        <div className={styles.profProfileContainer}>
            <div className={styles.left}>

                <div className={styles.leftTop}>
                    <button autoFocus>About</button>
                    <button>Courses</button>
                    <button>Blogs</button>
                </div>
                {/* <hr className={styles.hrLine}/> */}

                <div className={styles.leftMain}>
                    {/* <ProdProfileAbout/> */}
                    <ProfProfileCourses/>

                </div>


            </div>

            <div className={styles.right}>
                <div className={styles.rightTop}>
                    <img src="/images/author.png" alt="" />
                </div>
                <div className={styles.rightMiddle}>
                    <p>3.2k followers</p>
                    <p>Data Scientist, Python Programmer</p>
                </div>
                <div className={styles.rightBottom}>
                    <button className={styles.followButton}>Follow</button>
                    <img src="/icons/message.png" alt="" />
                </div>
            </div>
        </div>
    )
}
