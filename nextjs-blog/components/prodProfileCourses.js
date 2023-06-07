import styles from './prodProfileCourses.module.css'
import BlogCard from './blogCard'

export default function ProfProfileCourses({  }) {
    return (
        <div className={styles.container}>
            <BlogCard/>
            <BlogCard/>
        </div>
    )
}
