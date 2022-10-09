const router = require("express").Router();
const Palette = require("../models/Palette");
const User = require("../models/User");

//
//CREATE POST
router.post("/",async(req,res)=>{
    const newPalette = new Palette(req.body)
    try{
        const savedPalette = await newPalette.save();
        res.status(200).json(savedPalette);
    }catch(err){
        res.status(500).json(err)
    }
})

//
//READ/GET POST
router.get("/:id", async(req,res) => {
    try{
        const palette = await Palette.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
});

//
//READ/GET ALL TIMELINE POSTS
router.get("/timeline/:userID", async (req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userID);
        const userPalettes = await Palette.find({ userID: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendID)=>{
                return Post.find({userID:friendID});
            })
        );
        res.status(200).json(userPalettes.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err)
    }
})


//READ/GET ALL USERS POSTS
router.get("/profile/:username", async (req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username})
        const palettes = await Posts.find({userID:user._id})
        res.status(200).json(palettes);
    }catch(err){
        res.status(500).json(err)
    }
})

//
//UPDATEPOST
router.put("/:id", async(req,res)=>{
    try{
        const palette = await Palette.findById(req.params.id);
        if(palette.userID === req.body.userID){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post updated successfully.")
        }else{
            res.status(403).json("You can only update your own posts.")
        }
    }catch(err){
        res.status(500).json(err)
    }
    
})

//
//DELETEPOST
router.delete("/:id", async(req,res)=>{
    try{
        const palette = await Palette.findById(req.params.id);
        if(palette.userID === req.body.userID){
            await palette.deleteOne();
            res.status(200).json("Post deleted successfully.")
        }else{
            res.status(403).json("You can only delete your own posts.")
        }
    }catch(err){
        res.status(500).json(err)
    }
    
})

//
//LIKE/DISLIKE A POST
router.put("/:id/like", async(req,res)=>{
    try{
        const palette = await Palette.findById(req.params.id);
        if(!palette.likes.includes(req.body.userID)){
            await palette.updateOne({$push:{likes:req.body.userID}});
            res.status(200).json("Palette liked successfully!")
        }else{
            await palette.updateOne({$pull:{likes:req.body.userID}});
            res.status(200).json("Palette disliked.")
        }
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;