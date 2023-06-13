import { useContext, useEffect, useState } from 'react'
import styles from './blogCard.module.css'
import { AppContext } from './blogList'

export default function BlogCard( {blog} ) {

    // const {blogs} = useContext(AppContext)
    const [title, setTitle] = useState()
    // const [Body, setBody] = useState()
    const [headline, setHeadline] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [bookmarks, setBookmarks] = useState()
    const [reads, setReads] = useState()
    const [likes, setLikes] = useState()

    useEffect( () => {
        setTitle(blog.title)
        // setBody(blog.content)
        setHeadline(blog.headline)
        setThumbnail(blog.blogPic)
        setBookmarks(blog.usersSaved)
        setReads(blog.usersRead)
        console.log(title)

    }, [])

    return (

        <div className={styles.blogCard}>
                    
            <div className={styles.cardThumbnailContainer}>
                <img className={styles.thumbnail} src={blog.pic} alt="" />

            </div>

            <div className={styles.blogCardRight}>
                <div className={styles.cardTopicSave}>
                    <h3>{blog.title}</h3>
                    <a href="">
                        <img src="/icons/save.png" alt="" />
                    </a>
                </div>
                <div className={styles.cardDesc}>
                    {blog.headline}
                </div>
                    <div className={styles.cardViewsSavesLikes}>
                        <span>
                            <img src="/icons/view.png" alt="views" />
                            <p>{
                                blog.reads? blog.reads: '0'
                            }</p>
                        </span>
                        <span>
                            <img src="/icons/saved.png" alt="bookmarks" />
                            <p>{blog.bookmarks}</p>
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


