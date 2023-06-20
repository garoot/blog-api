import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {getPostsData} from '../utils/posts'
import Navbar from '../components/navbar';
// import BlogList from './blogList/blogList';
// import BlogList from '../components/blogList';
import BlogList from './blogList/page';
import Sidebar from '../components/sidebar';
// import BlogDetails from '../components/blogDetails';
import BlogDetails from './blogDetails/page';
// import BlogDetails from './blogDetails/blogDetails';
import ProdProfile from '../components/prodProfile';
import GsapTest from '../components/testing/gsap-test';
import { Router } from '@reach/router';
import { useEffect, useState } from 'react';

export async function getStaticProps() {

  // const allBlogs = await getPostsData();
  const data = await fetch('http://localhost:8000/blogs')
  const allBlogs = await data.json()

  // console.log(allBlogs)

  return {
    props: {
      allBlogs,
    }
  }
}


export default function Home({allBlogs}) {

  // const [hasMounted, setHadMounted] = useState(false);
  // useEffect(() => {
  //   setHadMounted(true)
  // }, [])

  // if(!hasMounted){
  //   return null
  // }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={styles.left}>
          <Sidebar/>
        </div>
        <div className={styles.right}>

          <Navbar/>

          {/* <Router>

            <BlogList 
              path="/"
              blogs={allBlogs.blogs}
            />
            <BlogDetails path="/blog/:blogId"/>

          </Router> */}


          {/* <BlogDetails/> */}
          {/* <ProdProfile/> */}
          {/* <GsapTest/> */}


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
