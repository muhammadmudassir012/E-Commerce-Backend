require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  userCreated,
  findByEmail,
  saveToken,
  UpdateUserByEmail,
} = require("../../services/authenticationServices/user.service");

const home = (req, res) => {
  try {
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { confrimEmail, otp } = req.body;
    const user = await findByEmail(confrimEmail);
    if (!user) {
      return res.status(404).json({ msg: "Plz Signup Again" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid Otp" });
    }

    const response = await UpdateUserByEmail(user.email);
    return res.status(201).json({ msg: "otp verified", response });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await findByEmail(email);
    if (!userExist) {
      return res.status(401).json({ msg: "User Not Found" });
    }

    // Check if the user is active means user verify his email or not

    // if (!userExist.isActive){
    //   return res.status(502).json({message: "plz verify your account first"});
    // }

    // Check if the user is already logged in

    // const isAlreadyLoggedin = await getTokenByUID(user.id)
    // if (isAlreadyLoggedin?.length > 0) return res.status(500).json({ success: false, message: 'already logged in', data: null })
    const isPasswordValid = await userExist.comparePassword(password);
    const token = jwt.sign(
      { email: userExist.email, id: userExist._id, token: userExist.token },
      process.env.SECRET_KEY,
      { expiresIn: "365d" }
    );
    const generateToken = await saveToken({ token, user: userExist.id });
    // localStorage.setItem('token', token)
    // const user = localStorage.setItem("token", token)
    // console.log(user);

    if (isPasswordValid) {
      return res.status(200).json({
        msg: "Login Successful",
        userId: userExist._id,
        token: token,
        email: userExist.email,
        username: userExist.username,
        // generateToken,
      });
    } else {
      return res.status(401).json("Invalid email or password");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong", error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const userExist = await findByEmail(email);

    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    }

    const payload = {
      username,
      email,
      password,
      phone,
    };
    const usercreated = await userCreated(payload);
    return res
      .status(200)
      .json({ message: "Signup Successful", user: usercreated._id });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong", error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await findByEmail(email);
    if (!userExist) {
      return res.status(401).json({ msg: "Invalid Email Address" });
    }

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id, token: userExist.token },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const generateToken = await saveToken({ token, user: userExist.id });
    const Forget = await ForgetLink(userExist, generateToken.token);
    return res.status(201).json({
      msg: "Forget Password Successfull",
      token: generateToken.token,
      forget: Forget,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Forget Password Failed" });
  }
};

// const logout = async (req, res) => {
//   try {
//       const { uid } = req.body; // Extracting user ID from the request body

//       if (!uid) {
//           return res.status(400).json({ success: false, message: 'User ID is required.' });
//       }

//       console.log(`Logging out user with UID: ${uid}`);

//       const logoutUser = await deleteTokensByUID(uid); // Calling the function to delete tokens

//       if (logoutUser.deletedCount === 0) { // Checking if any tokens were deleted
//           return res.status(404).json({ success: false, message: 'No active session found for this user.', data: null });
//       }

//       return res.status(200).json({ msg: 'Successfully logged out' }); // Successful response
//   } catch (error) {
//       console.error('Logout error:', error); // Log the error for debugging
//       return res.status(500).json({ message: 'Something went wrong', error: error.message });
//   }
// }

const updatepassword = (req, res) => {
  try {
    const { password, confrimPassword } = req.body;
    const { id, token } = req.params;

    if (password !== confrimPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Token" });
      }
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const editPassword = await User.findOneAndUpdate(
          { _id: id },
          { password: hashedPassword },
          { new: true }
        );
        if (!editPassword) {
          return res.status(404).json({ msg: "User Not Found" });
        }
        return res.status(201).json({ msg: "Password Updated Successfully" });
      } catch (error) {
        return res.status(500).json({ msg: "Password Not Updated" });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  home,
  login,
  signup,
  verifyOtp,
  forgetPassword,
  updatepassword,
};
