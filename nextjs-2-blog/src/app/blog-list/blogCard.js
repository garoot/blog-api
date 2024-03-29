"use client"
import { useContext, useEffect, useState } from 'react'
import styles from './blogCard.module.css'
// import { AppContext } from '../pages/blogList'


export default function BlogCard( {blog} ) {

    // const {blogs} = useContext(AppContext)
    const [title, setTitle] = useState()
    // const [Body, setBody] = useState()
    const [headline, setHeadline] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [bookmarks, setBookmarks] = useState()
    const [reads, setReads] = useState()
    const [likes, setLikes] = useState()

    const imgURL = 'http://localhost:8000/public/blogPics/'

    useEffect( () => {
        setTitle(blog.title)
        // setBody(blog.content)
        setLikes(blog.usersLikes)
        setHeadline(blog.headline)
        setThumbnail(blog.blogPic)
        setBookmarks(blog.usersSaved)
        setReads(blog.usersRead)
    }, [])

    return (

        <div className={styles.blogCard} id='blogCard'>
            {/* {console.log(blog.blogPic)} */}
            
            <div className={styles.cardThumbnailContainer}>
                <img className={styles.thumbnail} src={imgURL+thumbnail} alt="" />
                {/* <p>{blog.blogPic}</p> */}

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
                            {
                                blog.reads? blog.reads: '0'
                            }
                        </span>
                        <span>
                            <img src="/icons/saved.png" alt="bookmarks" />
                            {
                                blog.bookmarks? blog.bookmarks: '0'
                            }
                        </span>
                        <span>
                            <img src="/icons/like.png" alt="likes" />
                            
                                { 
                                blog.likes? blog.likes: '0'
                                }
                            
                        </span>
                    </div>
            </div>
                    
        </div>
    )
}

