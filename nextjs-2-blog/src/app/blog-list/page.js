
// "use client"

import styles from './blogList.module.css'
import Link from 'next/link';
// import BlogCard from '../../components/blogCard';
// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';
import dynamic from 'next/dynamic'
import BlogCard from './blogCard';
// import {Router, Link, navigate} from '@reach/router'
// import {GetStaticProps} from 'next'


export async function BlogList () {

    const data = await fetch('http://localhost:8000/blogs')
    const allBlogs = await data.json()
    console.log(allBlogs.message)

    return (
        <div>
            <h1 style={{color:"white", fontWeight:"500", marginBottom:"30px"}}>Blogs!</h1>
            <div className={styles.tagsContainer}>
                <div className={styles.tagsLeft}>
                    <a className={styles.tagsAll} href="">All</a>
                    <a href="">Data Science</a>
                    <a href="">Animation</a>
                    <a href="">JavaScript</a>
                    <a href="">Python</a>
                </div>
                <div className={styles.tagsRight}>
                    <input className={styles.tagsInput} type="text" placeholder='type keywords'  />
                    <a className={styles.tagsClear} href="">Clear</a>
                    <a href="">Filter</a>
                </div>
            </div>

            <div className={styles.blogsContainer}>

                {allBlogs.blogs.map((blog) =>  {
                    return (<Link key={blog._id} href={`/blog/${blog._id}`} style={{textDecoration: 'none'}} >
                        <BlogCard blog={blog}/>                    
                    </Link> )
                })}

                {/* <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/> */}
            </div>
        </div>
            
    )
}

// export default BlogList

export default dynamic (() => Promise.resolve(BlogList), {ssr: false})

