import express from "express";
import auth from "../authentication/userauth.js";
import postModel from "../models/Posts/index.js";
const router = express.Router();

router.post(
    "/create",
    auth,
    async (req, res) => {
        try {
            req.body.user = req.body.userFound
            let post = new postModel(req.body);
            await post.save();
            res.status(200).json({ success: true, msg: 'Post publish successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }
);
router.put(
    "/edit",
    auth,
    async (req, res) => {
        try {
            const post = await postModel.findOne({ _id: req.body.postId, user: req.body.userFound });
            if (!post)
                res.status(404).json({ success: false, msg: "Post not found" });
            post.post = req.body.post;
            await post.save();
            res.status(200).json({ success: true, msg: 'Post edited successfully' });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }
);



router.delete(
    "/delete/:postId",
    auth,
    async (req, res) => {
        try {
            let postId = req.params.postId;
            const post = await postModel.findById(postId);
            if (!post)
                res.status(404).json({ success: false, msg: "Post not found" });
            await postModel.deleteOne({_id : postId})
            res.status(200).json({ success: true, msg: "Post deleted" });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }
);

router.get("/fetchall", auth, async (req, res) => {
    try {
        const posts = await postModel
            .find({ user: req.body.userFound }).populate('user')
        res.status(200).json({ success: true,posts, msg: "Fetched all posts" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
});

export default router;
