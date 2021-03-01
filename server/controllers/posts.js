import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'

export const getPosts = async (req,res)=>{
    try {
        const postMessage= await PostMessage.find()

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const createPosts = async (req,res)=>{
    const post = req.body;
    const newPost =PostMessage({...post,creator:req.userId,createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const updatePost = async (req,res)=>{
    const{ id: _id } =req.params;//alias name of id to _id;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ ...post , _id },{ new:true});
    res.json(updatedPost);
}

export const deletePost = async (req,res)=>{
    const{ id } =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);
    res.json({ message:'Post Deleted succesfully' });
}

export const likePost = async (req,res)=>{
    const{ id: _id } =req.params;//alias name of id to _id;
    if(!req.userId) return res.json({message: 'Unauthenticated'});
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const post = await PostMessage.findById(_id)
    const index = post.likes.findIndex((id)=> id === String(req.userId))
    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{ new:true});
    // const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ likeCount:post.likeCount + 1 },{ new:true});
    res.json(updatedPost);
}
