import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import axios from 'axios';
import { Error } from 'mongoose';


const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostsData() {
    // const res = await axios.get('http://localhost:8000/blogs').then( response => {
    //     response = JSON.parse(JSON.stringify(response.data))
    //     console.log(response)
    // });
    const data = await fetch('http://localhost:8000/blogs')
    const blogs = await data.json()

    return blogs


}