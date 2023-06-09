import styles from './prodProfileCourses.module.css'
import CourseCard from './courseCard'


export default function ProdProfileCourses({}) {
    return (
        <div className={styles.container}>
            <CourseCard/>
            <CourseCard/>
            <CourseCard/>
            <CourseCard/>
        </div>
    )
}
