import User from "../models/users.js";

export class Controller {

  findAll = async (req, res) => {
    try {
      const userData = await User.find();
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
      // Create a new User
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        is_active: req.body.is_active,
      });

      // Save user in database
      const createUser = await user.save();
      res.status(201).json({ user: createUser });
      console.log("user added successfully")
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const user =await User.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        is_active: req.body.is_active,
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
}
