import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Follows from "../models/follows.js";

export class Controller {
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

      const follows = new Follows({
        user_id: req.body.user_id,
        list_of_follows: req.body.list_of_follows,
      });
      // Save user in database
      const createFollows = await follows.save();
      res.status(201).json({ follows: createFollows });
      // console.log("user added successfully")
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req, res) => {
    try {
      const follows = await Follows.findById(req.params.id);
      res.status(200).json({ follows: follows });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const follows = await Follows.findByIdAndUpdate(req.params.id, {
        user_id: req.body.user_id,
        list_of_follows: req.body.list_of_follows,
      });
      if (!follows) {
        return res.status(404).send({
          message: "Follows not found with id " + req.params.id,
        });
      }
      res.status(200).json({ updatedFollows: follows });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const follows = await Follows.findByIdAndRemove(req.params.id);
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
