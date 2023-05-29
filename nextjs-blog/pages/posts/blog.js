import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function Blog() {
    return (
        <Layout>
            <Head>
                <title>The Title of the Blog</title>
            </Head>
            <h1>The Blog!</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </Layout>
    )
}