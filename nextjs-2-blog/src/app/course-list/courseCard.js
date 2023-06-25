"use client"

import { useEffect, useState } from 'react'
import styles from './courseCard.module.css'

export default function CourseCard({ course }) {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [enrollments, setEnrollments] = useState()
    const [outcomes, setOutcomes] = useState()
    const [reviews, setReviews] = useState()
    const [requirements, setRequirements] = useState()
    const [keywords, setKeywords] = useState()
    const [pricing, setPricing] = useState()

    const imgURL = 'http://localhost:8000/public/coursePics/'

    useEffect(() => {
        setTitle(course.title)
        setDescription(course.description)
        setThumbnail(course.thumbnail)
        setEnrollments(course.enrollments)
        setOutcomes(course.outcomes)
        setReviews(course.reviews)
        setRequirements(course.requirements)
        setKeywords(course.keywords)
        setPricing(course.pricing)
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.courseCard}>
                <img className={styles.thumbnail} src="/images/ml-thumbnail.jpg" alt="" />

                <h3>Machine Learning</h3>
                <div className={styles.cardMiddle}>
                    <div className={styles.middleLeft}>
                        <div className={styles.middleLeftTop}>
                            {/* img */}
                            <img src="/icons/stars.png" alt="" />
                            <p>71 ratings</p>
                        </div>
                        <div className={styles.middleLeftBottom}>
                            {/* img */}
                            <img src="icons/students.png" alt="" />
                            <p>7500</p>
                            <p>33:30m</p>
                        </div>
                    </div>
                    <div className={styles.middleRight}>
                        {/* img of Ahmed Saeed */}
                        <img src="images/author.png" alt="" />
                    </div>
                </div>

                <div className={styles.cardBottom}>
                    <div className={styles.cardBottomTop}>
                        <button className={styles.basicPriceButton}>299 SAR</button>
                        <button className={styles.goldPriceButton}>470 SAR</button>

                    </div>
                    <hr />
                    <div className={styles.cardBottomBottom}>
                        <p>Available used units:</p>
                        <p>4</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
