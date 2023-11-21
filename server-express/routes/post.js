const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../database/Post");
// Please create an. env file in the root directory and use your own JWT private key
const privateKey = process.env.JWT_PRIVATE_KEY;

//Verify header
//when we need to CRUD our posts, we will have to verify header in the first place
//in this way, our opeartion will only under this login user
router.use(function (req, res, next) {
    // console.log("In post router");
    if (req.header("Authorization")) {
      try {
        req.payload = jwt.verify(req.header("Authorization"), privateKey, {
          algorithms: ["RS256"],
        });
        next();
      } catch (error) {
        return res.status(401).json({ error: error.message });
      }
    } else {
      return res.status(401).json({ error: "Authorization header missing." });
    }
  });

//add new post to database
//using back-end tools like postman http://localhost:4000/post
/*
{
    "id": "655be3fb771b89d06456b53f",
    "title": "example title",
    "content": "example content",
    "createdDate": "2023-11-20T02:00:00.000Z",
    "isCompleted": true,
    "completedDate": "2023-11-20T02:10:00.000Z",
    "author": "655bc0a0584aacac22c90059"
}
*/
router.post("/", async function (req, res) {
    //Obtain the information transmitted from the front-end, specifically, the author comes from Payload
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        createdDate: req.body.createdDate,
        isCompleted: req.body.isCompleted,
        completedDate: req.body.completedDate,
        author: req.payload.id,
    });
    //save into database
    post
      .save()
      .then((savedPost) => {
          return res.status(201).json({
              id: savedPost._id,
              title: savedPost.title,
              content: savedPost.content,
              createdDate: savedPost.createdDate,
              isCompleted: savedPost.isCompleted,
              completedDate: savedPost.completedDate,
              author: savedPost.author,
          });
      })
      .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
});

//get post from database
//http://localhost:4000/post GET
router.get("/", async function (req, res) {
    //console.log("In GET /post handler");
    Post.find()
      .where("author")
      //Obtain posts associated with the current authenticated user
      .equals(req.payload.id)
      .then((posts) => {
        // Map each document convert _id to id
        // otherwise, when we log in and hope to modify our original posts
        // we will have id undefinded, because the id we get will be _id not id, 
        // consideringing that the id we store into the scema is _id
        const transformedPosts = posts.map((post) => ({
          id: post._id,
          title: post.title,
          content: post.content,
          createdDate: post.createdDate,
          isCompleted: post.isCompleted,
          completedDate: post.completedDate,
          author: post.author,
        }));
        return res.status(200).json(transformedPosts);
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
});

//update/patch post from database， which includes toggle and edit this two methods
//If we need to obtain the resource identifier from the URL path, use req.params; 
//else if we need to access the user's authentication information, such as user ID, use req.payload
//using back-end tools like postman http://localhost:4000/post/655be3fb771b89d06456b53f
/*
{
    "id": "655be3fb771b89d06456b53f",
    "title": "example title",
    "content": "example content",
    "createdDate": "2023-11-20T02:00:00.000Z",
    "isCompleted": true,
    "completedDate": "2023-11-20T02:10:00.000Z",
    "author": "655bc0a0584aacac22c90059"
}
*/
router.patch("/:id", async function (req, res) {
    try {

        // Find the post first, but do not update it
        const post = await Post.findById(req.params.id);

        // Ensure that the post exists
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the current user is the author of the post
        if (post.author.toString() !== req.payload.id) {
            // If there is no match, return 403 to prohibit access
            return res.status(403).json({ error: "You can only update your own posts." });
        }

        let updateData = req.body;

        // If isCompleted is true and completedDate is not provided, set to the current time
        if(req.body.isCompleted && !req.body.completedDate) {
            updateData.completedDate = new Date();
        } else if (!req.body.isCompleted) {
            // If isCompleted is false, ensure that completedDate is null
            updateData.completedDate = null;
        }

        // Update it after passing the check, and the {new: true} option will return the updated document
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          // { ...req.body },
          updateData,
          { new: true }
        );

        // Return to the updated post
        return res.status(200).json({
            id: updatedPost._id,
            title: updatedPost.title,
            content: updatedPost.content,
            createdDate: updatedPost.createdDate,
            isCompleted: updatedPost.isCompleted,
            completedDate: updatedPost.completedDate,
            author: updatedPost.author,
        });
    } catch (error) {
        // If an error occurs, return 500
        return res.status(500).json({ error: error.message });
    }
});

//delete post from database
router.delete("/:id", async function (req, res) {
    try {
        // Find the post first, ensure that it exists and that the current user has permission to delete it
        const post = await Post.findById(req.params.id);
        
        // Ensure that the post exists
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
    
        // Confirm whether the current user is the author of the post
        if (post.author.toString() !== req.payload.id) {
          return res.status(403).json({ error: "You can only delete your own posts." });
        }
    
        // Perform deletion operation
        await Post.findByIdAndDelete(req.params.id);
    
        return res.status(200).json({ message: "Post deleted successfully" });
  
    } catch (error) {
        
        return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
