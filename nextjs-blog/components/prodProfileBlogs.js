import styles from './prodProfileBlogs.module.css'
import BlogCard from './blogCard'

export default function ProdProfileBlogs({  }) {
    return (
        <div className={styles.container}>
            <BlogCard/>
            <BlogCard/>
        </div>
    )
}
