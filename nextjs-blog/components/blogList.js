import styles from './blogList.module.css'
import Link from 'next/link';
import Image from 'next/image';

export default function BlogList({ Component, pageProps }) {
    return (
        <div>
            <h2>Blogs!</h2>
            <div className={styles.tagsContainer}>
                <div className={styles.tagsLeft}>
                    <a className={styles.tagsAll} href="">All</a>
                    <a href="">Data Science</a>
                    <a href="">Animation</a>
                    <a href="">JavaScript</a>
                    <a href="">Python</a>
                    <input className={styles.tagsInput} type="text" placeholder='type keywords'  />
                    <a className={styles.tagsClear} href="">Clear</a>
                </div>
                <div className={styles.tagsRight}>
                    <a href="">Filter</a>
                </div>
            </div>

            <div className={styles.blogsContainer}>
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

                        </div>
                        <div className={styles.cardViewsSavesLikes}>

                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}
