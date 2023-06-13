import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import axios from 'axios';
import { Error } from 'mongoose';


const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostsData() {
    const data = await fetch('http://localhost:8000/blogs')
    const blogs = await data.json()

    return blogs

}