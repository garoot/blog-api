import styles from './courseList.module.css'

export default function CourseList({}) {
    return (
        <div>
            <h1 style={{color:"white", fontWeight:"500", marginBottom:"30px"}}>
                Courses!
            </h1>
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

            <div className={styles.coursesContainer}>

                {/* {allBlogs.blogs.map((blog) =>  {
                    return (<Link key={blog._id} href={`/blog/${blog._id}`} style={{textDecoration: 'none'}} >
                        <BlogCard href={`/blog/${blog._id}`} key={blog._id} className="blogCard" blog={blog} blogs={allBlogs}/>                    
                    </Link> )
                })} */}
            </div>
        </div>
    )
}
