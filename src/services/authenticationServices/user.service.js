const TokenModel = require("../../models/Token.model")
const User = require("../../models/user.model")

const findByEmail = async (email) => {
    try {
        const user = await User.findOne({email: email})
        return user
    } catch (error) {
        throw error
        // console.log(`Find email Error${error}`)
    }
}

const userCreated = async (payload) => {
    try {
        const createUser = await User.create({...payload})
        return createUser
    } catch (error) {
        throw error
    }
}

const UpdateUserByEmail = async (email) => {
    try {
        const response = await User.updateOne(
            {email: email},
            {isActive: true}
        )
        return response
    } catch (error) {
        throw error
    }
}

// const deleteTokensByUID = async (uid) => {
//     try {
//         const response = await Token.deleteMany({ user: uid })
//         return response
//     } catch (error) {
//         throw error
//     }
// }

const saveToken = async (payload) => {
    try {
        const newToken = new TokenModel({ ...payload })
        const token = await newToken.save()
        return token
    } catch (error) {
        throw error
    }
}

module.exports = {findByEmail,userCreated,saveToken,UpdateUserByEmail}