import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
    {
        post: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const postModel = mongoose.model("Post", postsSchema, "post");
export default postModel;
