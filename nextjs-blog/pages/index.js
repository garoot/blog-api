import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {getPostsData} from '../utils/posts'
import Navbar from '../components/Navbar'

export async function getStaticProps() {
  const allPostsData = await getPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      {/* {allPostsData.blogs[0].title} */}

        {/* <ul>
          {allPostsData.blogs.map( ({title}) => (
            <li>
              {title}
              <br />
            </li>
          ))}
        </ul> */}
      <div className={styles.left}>

      </div>
      <div className={styles.right}>
        <Navbar/>

        <main>
          <h1 className={styles.title}>
            Hello World!
          </h1>
          <div className={styles.grid}>

            <Link
              href="/posts/blog"
              className={styles.card}
            >
              <h3>The Blog! &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </Link>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h3>Deploy &rarr;</h3>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>
        <footer></footer>
      </div>




      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
