import styles from './prodProfileAbout.module.css'

export default function ProdProfileAbout({ }) {
    return (
        <div className={styles.container}>
            <div className={styles.prodNumbers}>

                <div className={styles.number}>
                    <img src="/icons/courses.png" alt="" />
                    <p>Courses</p>
                    <p>3</p>
                </div>
                <div className={styles.number}>
                    <img src="/icons/students.png" alt="" />
                    <p>Students</p>
                    <p>12,000</p>
                </div>
                <div className={styles.number}>
                    <img src="/icons/ratings.png" alt="" />
                    <p>Ratings</p>
                    <p>1201</p>
                </div>
                <div className={styles.number}>
                    <img src="/icons/reviews.png" alt="" />
                    <p>Reviews</p>
                    <p>141</p>
                </div>

            </div>

            <div className={styles.biography}>
                <h2>Biography</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est at iusto enim alias sed libero aliquid quibusdam, ab in velit illum quae pariatur voluptatem cum ut animi sunt provident nostrum. Recusandae neque nam libero alias dolorum qui odio sequi consequatur ad. Veniam, ut! Distinctio error, sint illo blanditiis omnis nihil repudiandae accusamus dolor quas, suscipit voluptates possimus in aut quasi saepe excepturi nemo rem? Enim consectetur officia error molestiae labore quas illum quibusdam quae laborum, ipsum voluptatem eligendi laudantium repudiandae quisquam! Distinctio unde qui architecto dolorum suscipit laborum vitae maiores officiis labore hic dignissimos velit mollitia ex, neque accusamus. Odit exercitationem esse molestias sapiente iste tempora earum ab incidunt praesentium, laborum vel quidem nobis excepturi omnis temporibus impedit dignissimos. Obcaecati necessitatibus nisi nesciunt quidem nobis quam minima perspiciatis illo, voluptatibus similique dolorem voluptatum hic, libero repellendus temporibus quos perferendis rerum, illum incidunt ipsum. Doloribus, veniam tenetur. Ea fuga aspernatur id?</p>
            </div>
        </div>
    )
}
