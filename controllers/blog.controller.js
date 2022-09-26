
import Blog from "../models/blogs.js";

export class Controller {
  findAll = async (req, res) => {
    try {
      const blogData = await Blog.find();
      res.json({ blogData: blogData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  create = async (req, res) => {
    try {
      // Validate request
      if (!req.body) {
        return res.status(400).send({
          message: "Please fill all required field",
        });
      }
      //console.log(req);
      // Create a new User

      const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        dateModified: new Date(),
        article: req.body.article
      });
      // Save user in database
      const createBlog = await blog.save();
      res.status(201).json({ blog: createBlog });
      // console.log("user added successfully")
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      res.status(200).json({ blog: blog });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, {
        author: req.body.author,
        title: req.body.title,
        dateModified: new Date(),
        article: req.body.article
      });
      if (!follows) {
        return res.status(404).send({
          message: "Follows not found with id " + req.params.id,
        });
      }
      res.status(200).json({ updatedBlog: blog });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndRemove(req.params.id);
      if (!follows) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).json("Follows successfully deleted");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
