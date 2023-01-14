#  Blog Project Using ExpressJS 
this blog project will have API's for fetching blogs, users, users' interests based on their readings and other factors.

## Quick Start
within the folder blog-api/server, run
```bash
npm install
```
then
```bash
npm run serve
```

##Dependencies
```json
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mogoose": "0.0.1-security",
    "mongoose": "^6.8.2",
    "mongoose-unique-validator": "^3.1.0",
    "nodemon": "^2.0.20"
  },
```

## API Documentation

| API Route                        |Request Type   | Body                                                              | 
| -------------                    |:-------------:| -----------------------------------------------:                  |   
| http://localhost:8000/blogs      | POST          | {title, headline, content, profilePic, producer}                  |                
| http://localhost:8000/blogs      | GET           |                                                                   |                
| http://localhost:8000/producers  | POST |{firstName, lastName, headline, bio, country, gender, username, email, phoneNumber}|         
| http://localhost:8000/producers  | GET           |                                                                   |                
| http://localhost:8000/keywords   | GET           |                                                                   |                
| http://localhost:8000/keywords   | POST          | {name, iconPic}                                                   |                
| http://localhost:8000/keywords/add-course | PUT  | {course._id, keyword._id}                                         |                
| http://localhost:8000/keywords/add-blog   | PUT  | {blog._id, keyword._id}                                           |                
| http://localhost:8000/blogs/add-keyword   | PUT  | {keywords[], blog._id}                                            |                
| http://localhost:8000/courses     | POST         | {title, description, producer}                                    |                
| http://localhost:8000/courses     | GET          |                                                                   |                
| http://localhost:8000/reviews     | POST         | {course._id, rating, comment, student._id}                        |                
| http://localhost:8000/reviews     | GET          |                                                                   |                
| http://localhost:8000/students    | POST|{firstName, lastName, bio, birthDate, profilePic, country, gender, username, email, phoneNumber} | 
| http://localhost:8000/students/add-to-wishlist| PUT | {course._id, student._id}                                      |                
| http://localhost:8000/students    | GET          |                                                                   |                
| http://localhost:8000/blogs/readBlog | PUT       | {student._id, blog._id}                                           |                
| http://localhost:8000/blogs/saveBlog | PUT       | {student._id, blog._id}                                           |                
| http://localhost:8000/enrollments    | GET       |                                                                   |                
| http://localhost:8000/receipts       | POST      | { to-be-updated in testing phase }                                |                
| http://localhost:8000/receipts       | GET       |                                                                   |                
| http://localhost:8000/fields         | POST      | {name, iconPic}                                                   |                
| http://localhost:8000/fields         | GET       |                                                                   |                
| http://localhost:8000/fields/add-course | PUT    | {course._id, field._id}                                           |                
| http://localhost:8000/fields/add-keyword| PUT    | {field._id, keyword._id}                                          |                
| http://localhost:8000/blogs/add-comment| PUT     | {creator: student/producer._id, blog._id, comment}                |                
| http://localhost:8000/categories     | GET       |                                                                   |                
| http://localhost:8000/categories     | POST      | {title}                                                           |  
| http://localhost:8000/courses/add-to-category|PUT| {course._id, category._id                                         | 
| http://localhost:8000/blogs/add-to-category  |PUT| {blog._id, category._id}                                          | 

