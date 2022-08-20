import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Controller {
  findAll = async (req, res) => {
    try {
      const userData = await User.find().select("-password");
      res.json({ ListOfUsers: userData });
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
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        res.status(400).send({
          message: "Email already exists",
        });
        return;
      }
      const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });
      user.password = bcrypt.hashSync(req.body.password, 10);

      // Save user in database
      const createUser = await user.save();
      res.status(201).json({ user: createUser });
      // console.log("user added successfully")
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // findByEmail = async (req, res) => {
  //   try {
  //     const emailExists = await User.findOne({email:req.body.email}).select('-password');
  //     if (emailExists){
  //       res.status(200).json({ user: emailExists });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  update = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).json({ updatedUser: user });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).json("User successfully deleted");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  sign_in = async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findOne({ email: req.body.email });
      //Check if user email exists or password is incorrect
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
        });
      }

      return res.json({
        token: jwt.sign(
          { email: user.email, first_name: user.first_name, _id: user._id },
          process.env.TOKEN_KEY
        ),
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
