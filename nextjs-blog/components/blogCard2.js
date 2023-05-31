import styles from './blogList.module.css'

export default function BlogCard({ Component, pageProps }) {
    return (
        <div className={styles.blogCard}>
                    
                    <div className={styles.cardThumbnailContainer}>
                        <img className={styles.thumbnail} src="/images/image.png" alt="" />
                    </div>

                    <div className={styles.blogCardRight}>
                        <div className={styles.cardTopicSave}>
                            <h3>Panda Quick Guide</h3>
                            <a href="">
                                <img src="/icons/save.png" alt="" />
                            </a>
                        </div>
                        <div className={styles.cardDesc}>
                            <body>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.
                            </body>

                        </div>
                        <div className={styles.cardViewsSavesLikes}>
                            <span>
                                <img src="/icons/view.png" alt="views" />
                                <p>1.2k</p>
                            </span>
                            <span>
                                <img src="/icons/saved.png" alt="bookmarks" />
                                <p>112</p>
                            </span>
                            <span>
                                <img src="/icons/like.png" alt="likes" />
                                <p>400</p>
                            </span>

                        </div>
                    </div>
                    
                </div>
    )
}


