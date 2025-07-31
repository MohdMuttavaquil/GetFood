import userModel from '../Models/UserSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const creatrToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// login user
const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        // User exixst or not 
        const exist = await userModel.findOne({ email })

        if (exist) {
            const isuser = await bcrypt.compare(password, exist.password)

            if (!isuser) {
                return res.json({ success: false, message: "email and password dose not match" })
            }

            const token = creatrToken(exist._id)
            return res.json({ success: true, token })
        }

        if (!exist) {
            return res.json({ success: false, message: "user not exise" })
        }

    } catch (error) {
        return res.json({ success: false, message: "some error please try again" })
    }

}


// ragister user 
const ragisterUser = async (req, res) => {

    const { name, email, password } = req.body

    try {
        // User exixst or not 
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: 'user alredy exixst' })
        }

        // Email validation and check strong psaaword 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        // Hasing password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = creatrToken(user._id)
        return res.json({ success: true, token })
    }
    catch (error) {
        return res.json({ success: false, message: "some error please try again" })
    }

}

export { loginUser, ragisterUser }