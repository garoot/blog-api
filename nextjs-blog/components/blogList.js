import styles from './blogList.module.css'
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from './blogCard';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
// import {GetStaticProps} from 'next'


const BlogList = ({ blogs }) => {

    
    useEffect(() => {
        console.log(blogs)
    },[])
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

                {blogs.map((blog) => (
                    <BlogCard blog={blog}/>
                    
                ))}

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

export default BlogList
