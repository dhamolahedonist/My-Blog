const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("", async (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express and Mongodb",
  };
  try {
    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate({ $sort: { createdAt: -1 } })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express and Mongodb",
      currentRoute: `/post/${slug}`,
    };
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

router.post("/like/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    // Find the post by ID in the database
    const post = await Post.findById(postId);
    // Increment the like_count
    post.like_count++;
    // Save the updated post in the database
    await post.save();
    res.status(200).json({
      message: "Post liked successfully",
      like_count: post.like_count,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the post" });
  }
});

// get ALl post
router.get("", async (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express and Mongodb",
  };
  try {
    const data = await Post.find();
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// post searchTErm
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express and Mongodb",
    };
    let searchTerm = req.body.searchTerm;
    const NoSpechialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(NoSpechialChar, "i") } },
        { body: { $regex: new RegExp(NoSpechialChar, "i") } },
      ],
    });
    res.render("search", {
      data,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about", { currentRoute: "/about" });
});

// GET Home
router.get("", (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express and Mongodb",
  };
  res.render("index", locals);
});

router.get("/about", (req, res) => {
  res.render("about");
});

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//       body: "This is the body text",
//     },
//     {
//       title: "this is a Blog",
//       body: "This is the body text",
//     },
//     {
//       title: " a Blog",
//       body: "This is the body text",
//     },
//     {
//       title: "it is a Blog",
//       body: "This is the body text",
//     },
//   ]);
// }
// insertPostData();

module.exports = router;
