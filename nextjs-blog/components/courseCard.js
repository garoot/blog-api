import styles from './courseCard.module.css'

export default function CourseCard({ }) {
    return (
        <div className={styles.container}>
            <div className={styles.courseCard}>
                <img className={styles.thumbnail} src="/images/ml-thumbnail.jpg" alt="" />

                <h3>Machine Learning</h3>
                <div className={styles.cardMiddle}>
                    <div className={styles.middleLeft}>
                        <div className={styles.middleLeftTop}>
                            {/* img */}
                            <img src="/icons/stars.png" alt="" />
                            <p>71 ratings</p>
                        </div>
                        <div className={styles.middleLeftBottom}>
                            {/* img */}
                            <img src="icons/students.png" alt="" />
                            <p>7500</p>
                            <p>33:30m</p>
                        </div>
                    </div>
                    <div className={styles.middleRight}>
                        {/* img of Ahmed Saeed */}
                        <img src="images/author.png" alt="" />
                    </div>
                </div>

                <div className={styles.cardBottom}>
                    <div className={styles.cardBottomTop}>
                        <button className={styles.basicPriceButton}>299 SAR</button>
                        <button className={styles.goldPriceButton}>470 SAR</button>

                    </div>
                    <hr />
                    <div className={styles.cardBottomBottom}>
                        <p>Available used units:</p>
                        <p>4</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
