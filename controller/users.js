const model = require('../models/users')
const USERS = model.USERS


exports.getAllUsers = async(req,res)=>{
    const user = await USERS.find()
    res.status(200).json(user)

}

exports.getUser = async (req,res)=>{
    const id = req.params.id
    const user = await USERS.findById(id)
    res.status(200).json(user)
}

exports.replaceUser =async (req,res) =>{
    const id = req.params.id
    const user = await USERS.findOneAndReplace({_id:id},req.body)
    res.status(201).json(user)
}

exports.updateUser = async (req,res) =>{
    const id = req.params.id;
    const user = await USERS.findOneAndUpdate({_id:id},req.body)
    res.status(201).json(user)
}

exports.deleteUser = async (req,res)=>{
    const id = req.params.id
    const user = await USERS.findOneAndDelete({_id:id},req.body)
    res.status(202).json(user) 
}