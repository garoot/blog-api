import styles from './prodProfile.module.css'
import ProdProfileAbout from './prodProfileAbout'

export default function ProdProfile({ }) {
    return (
        <div className={styles.profProfileContainer}>
            <div className={styles.left}>

                <div className={styles.leftTop}>
                    <button>Courses</button>
                    <button>Blogs</button>
                    <button>About</button>
                </div>
                {/* <hr className={styles.hrLine}/> */}

                <div className={styles.leftMain}>
                    <ProdProfileAbout/>
                </div>


            </div>

            <div className={styles.right}>

            </div>
        </div>
    )
}
