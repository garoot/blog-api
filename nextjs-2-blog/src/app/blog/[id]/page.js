

// import { useEffect, useState } from 'react'
import styles from './blogDetails.module.css'
// import {useRouter} from 'next/router'
import Image from 'next/image'


export default async function BlogDetails(props) {

    // const findBlog =  async () => {

    const data = (await fetch(`http://127.0.0.1:8000/blogs/find/${props.params.id}`))
    console.log(props.params.id)
    const blogData = await data.json()
    // for some silly weird reason, it has to be done in 
    // this order to capture the producer
    // otherwise, you can include the producer in backend
    const blog = blogData.blog
    const producer = blog.producer

    // converting json data to (month day, year)
    const jsonDate = blog.createdAt
    const date = new Date(jsonDate)
    const formattedDate = date.toLocaleDateString("end-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    console.log(formattedDate)
    // }

    // findBlog();
    // console.log(blog)


    return (
        <div className={styles.blogContainer}>
            <div className={styles.left}>
                <div className={styles.authorContainer}>
                    <div className={styles.authorLeft}>
                        <img src="/images/author.png" alt="" />
                    </div>
                    <div className={styles.authorRight}>
                        <div className={styles.authorName}>
                            {producer.firstName +" "+ producer.lastName}
                        </div>
                        <div className={styles.authorRightBottom}>
                            <div className={styles.publishDate}>
                                {formattedDate}  &nbsp;&nbsp;&nbsp;&nbsp;.
                            </div>
                            <div className={styles.readLength}>
                                5 min read  &nbsp;&nbsp;&nbsp;&nbsp;.
                            </div>
                            <div className={styles.listenButton}>
                                <img src="icons/listen.png" alt="" />
                                Listen
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.title}>
                    <h1>{blog.title}</h1>
                </div>
                <div className={styles.blogThumbnail}>
                    <img src="/images/image.png" alt="" />
                </div>
                <div className={styles.blogContent}>
                    {blog.content}
                </div>
            
            </div>
            <div className={styles.middle}>
                <div className={styles.bookmark}>
                    <img src="/icons/bookmark.png" alt="" />
                    {blog.usersSaved.length}
                </div>
                <div className={styles.like}>
                    <img src="/icons/unlike.png" alt="" />
                    {blog.usersLikes.length}
                </div>
                <div className={styles.share}>
                    <img src="/icons/share.png" alt="" />
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
