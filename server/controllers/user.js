import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

//Import User Model
import userModel from "../models/Users/index.js";


//Import Utils
import tokenGenerator from "../utils/tokengenerator.js";
import auth from "../authentication/userauth.js";

router.post(
    "/register",
    async (req, res) => {
        try {
            //Check if User already Exists
            const userFound = await userModel.findOne({ email: req.body.email });
            if (userFound) {
                return res.status(409).json({ success: false, msg: "User Already Exists" });
            } else {

                req.body.password = await bcrypt.hash(req.body.password, 12);
                let user = new userModel(req.body);
                await user.save();
                res.status(200).json({ success: true, msg: 'Registered successfully' });



            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }
);


router.post("/login", async (req, res) => {
    try {
        let userFound = await userModel.findOne({ email: req.body.email });
        if (!userFound) {
            return res.status(401).json({ success: false, msg: "Unauthorised Access" });
        }

        let matchPassword = await bcrypt.compare(req.body.password, userFound.password);
        console.log(matchPassword)
        if (!matchPassword) {
            return res.status(401).json({ success: false, msg: "Unauthorised Access" });
        }
        let payload = {
            id: userFound._id
        }
        let token = tokenGenerator(payload, '1d');
        res.status(200).json({ success: true, msg: 'logged in successfully', token,userFound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
})
router.get("/searchuser/:email", async (req, res) => {
    try {
        let userFound = await userModel.findOne({
            email: req.params.email

        }); if (!userFound) {
            return res.status(401).json({ success: false, msg: "User Not  Found" });
        }
        delete userFound.password
        res.status(200).json({ success: true, msg: 'fetched user details successfully', userFound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
})
router.get("/fetchuser",auth, async (req, res) => {
    try {
        let userFound = await userModel.findOne(
            { _id: req.body.userFound }
        ); if (!userFound) {
            return res.status(401).json({ success: false, msg: "User Not  Found" });
        }
        delete userFound.password
        res.status(200).json({ success: true, msg: 'fetched user details successfully', userFound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
})
export default router;
