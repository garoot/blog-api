import styles from './coursePage.module.css'

export default async function CoursePage(props) {

    const data = await fetch(`http://127.0.0.1:8000/courses/find/${props.params.id}`)
    const courseData = await data.json()
    const course = courseData.course
    console.log(courseData)
    const producer = course.producer

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.leftTop}>
                    <h1>Math Skills for Data Science</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla debitis tempore magnam voluptatum voluptatibus, exercitationem at qui quo fugit veniam ullam, cumque non dicta distinctio, maiores voluptates. Nam fugiat cum dolore quidem! Architecto omnis, eligendi est molestiae quaerat deserunt assumenda laudantium perspiciatis. Sed incidunt architecto dignissimos qui tenetur, enim atque laudantium sapiente eveniet, itaque saepe totam, odit sequi commodi dolor.</p>
                </div>
                <div className={styles.leftSecond}>
                    <div className={styles.leftSecondLeft}>
                        <div className={styles.leftSecondLeftTop}>
                            <img src="/icons/stars.png" alt="" />
                            <p> ({course.reviews? course.reviews.length : 0 }  ratings)</p>
                        </div>
                        <div className={styles.leftSecondLeftBottom}>
                            <img src="/icons/students.png" alt="" />
                            <p>1000 students enrolled</p>
                        </div>
                    </div>

                    <div className={styles.leftSecondRight}>
                        <div className={styles.leftSecondRightTop}>
                            <p>Created by: </p>
                            <div className={styles.producer}>
                                <img src="/images/author.png" alt="" />
                                <p>Ahmed Saeed</p>
                            </div>
                        </div>
                        <div className={styles.leftSecondRightBottom}>
                            <img src="/icons/globe.png" alt="" />
                            <p>Languages: English / Arabic / Chinese</p>
                        </div>
                    </div>
                </div>
                <div className={styles.leftThird}>
                    <h2>Objectives</h2>
                    <div className={styles.courseObjective}>
                        <img src="/icons/check.png" alt="" />
                        Learn Crucial Math Rules for Data Science
                    </div>
                    <div className={styles.courseObjective}>
                        <img src="/icons/check.png" alt="" />
                        Apply Math in data science practices
                    </div>
                    <div className={styles.courseObjective}>
                        <img src="/icons/check.png" alt="" />
                        Build projects to enhance your resume
                    </div>
                </div>
                <div className={styles.leftFourth}>
                    <h2>Requirements</h2>
                    <div className={styles.courseRequirement}>
                        <img src="/icons/bullet-point.png" alt="" />
                        Windows or Mac Computer
                    </div>
                    <div className={styles.courseRequirement}>
                        <img src="/icons/bullet-point.png" alt="" />
                        Internet Connection
                    </div>
                    <div className={styles.courseRequirement}>
                        <img src="/icons/bullet-point.png" alt="" />
                        Enthusiasm
                    </div>
                </div>
                <div className={styles.leftFifth}>
                    <div className={styles.description}>
                        <h2>Description</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus delectus repellendus, dolorum facere autem veritatis, repudiandae est quis, nulla consectetur distinctio corporis? Dolor dolorem cumque exercitationem fugit, ad repellat perferendis minima mollitia autem veniam adipisci explicabo inventore officiis ex beatae soluta quo doloremque eaque dolorum earum, culpa quidem. Laboriosam placeat vero excepturi mollitia ratione eius, id nesciunt doloremque. Explicabo ea minima temporibus quas, nisi dolorem deleniti, ex minus veritatis voluptates ullam nostrum vero esse porro mollitia asperiores magni rem, officiis magnam? Nostrum molestiae deserunt pariatur quos ut omnis ipsam nihil fuga sint, sit hic eveniet reiciendis quasi distinctio asperiores sequi.</p>
                    </div>
                    <div className={styles.courseOutline}>
                        <h2>Outline</h2>
                        <h3>Section 1</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                        </ul>
                        <h3>Section 2</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                        </ul>
                        <h3>Section 3</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className={styles.right}>
                <div className={styles.rightCard}>
                    <img className={styles.rightCardImage} src="/images/ml-thumbnail.jpg" alt="" />
                    <div className={styles.rightCardSecond}>
                        <button className={styles.basicPriceButton}> 50 SAR</button>
                        <button className={styles.goldPriceButton}>100 SAR</button>
                    </div>
                    <div className={styles.cardButtons}>
                        <button id={styles.addToCard}>
                            Add to cart
                        </button>
                        <button id={styles.addToWishlist}>
                            Add to wishlist
                        </button>
                    </div>
                    <div className={styles.rightCardBottom}>
                        <p>
                            <img src="/icons/quiz.png" alt="" />
                            Quizzes
                        </p>
                        <p>
                            <img src="/icons/play.png" alt="" />
                            33h:30m
                        </p>
                        <p>
                            <img src="/icons/trophy.png" alt="" />
                            Certificate of Completion
                        </p>
                        <p>
                            <img src="/icons/resalable.png" alt="" />
                            Resalable
                        </p>
                        <p>
                            <img src="/icons/chat-support.png" alt="" />
                            Chat Support
                        </p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}
