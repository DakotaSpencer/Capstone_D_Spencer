const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//
//UPDATE USER
router.put("/:id", async(req,res)=>{
    if(req.body.userID === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body, });
            res.status(200).json("Account has been successfully updated!");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only update your own account!");
    }
})

//
//DELETE USER
router.delete("/:id", async(req,res)=>{
    if(req.body.userID === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been successfully deleted.");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your own account!");
    }
})

//
//READ/GET USER
router.get("/", async(req, res) => {
    const userID = req.query.userID;
    const username = req.query.username;
    try{
        const user = userID 
        ? await User.findById(userID) 
        : await User.findOne({username: username});
        //Unnecesary properties sent by GET
        //add admin, email and creation date later
        const {password,updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        return res.status(500).json(err);
    }
})




//        GET PALETTES
//get friends

router.get("/friends/:userID", async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        const friends = await Promise.all(
            user.following.map((friendID) => {
                return User.findById(friendID);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
        } catch (err) {
        res.status(500).json(err);
    }
});



//     save a palette
//
//FOLLOW A USER
router.put("/:id/follow", async(req, res) =>{
    if(req.body.userID !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userID);
            if(!user.followers.includes(req.body.userID)){
                await user.updateOne({$push:{followers:req.body.userID}});
                await currentUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("User followed successfully!");
            }else{
                res.status(403).json("You're already following this user.")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't follow yourself...")
    }
});

//     remove a palette
//
//UNFOLLOW A USER
router.put("/:id/unfollow", async(req, res) =>{
    if(req.body.userID !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userID);
            if(user.followers.includes(req.body.userID)){
                await user.updateOne({$pull:{followers:req.body.userID}});
                await currentUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json("User unfollowed successfully!");
            }else{
                res.status(403).json("You're already unfollowed this user.")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't unfollow yourself...")
    }
})

module.exports = router;