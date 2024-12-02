const User = require("../../../models/user.model");

const getAllUsers = async (req,res) => {
    try {
        const getData = await User.find();
        return res.status(201).json({ msg: "Users Get Successfully", getData });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
}

const deleteUser = async (req,res) => {
    try {
        const {id} = req.params
        console.log(id);
        // console.log(req);
        
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ msg: "User not found" });
          }
          return res.status(201).json({ msg: "User Deleted", deleteUser });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
}

module.exports = {getAllUsers,deleteUser}