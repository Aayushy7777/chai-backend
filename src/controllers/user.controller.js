import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/User.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";;
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - non empty, email format, password strength
  //check if user already exists: username, email
  //check for images, check for avatar
  //upload them to cloudinary, avatar
  //create user object - create entry in database
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const {fullname, email, username, password} = req.body
  console.log("email: ", email);

  //validation
  if(
    [fullname, email, username, password].some
    ((field) => field?.trim() === "")
    ){
    throw new ApiError("All fields are required", 400)
  }

  // to check if user with same email or username already exists
  User.findOne({$or: [{email}, {username}]})

  if(existedUser){
    throw new ApiError
    ("User with same email or username already exists", 409)
  }
  
  //check for images
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  

  if(!avatarLocalPath){
    throw new ApiError("Avatar is required", 400)
  }

  const avatar = await uploadToCloudinary(avatarLocalPath)
  const coverImage = await uploadToCloudinary
  (coverImageLocalPath)

  if(!avatar){
    throw new ApiError("Error uploading avatar", 500)
  }

   const user = await User.create({
    fullname,
    email,
    avatar: avatar.url,
    username: username.toLowerCase(),
    password,
    coverImage: coverImage?.url || "",

  })

  const createdUser = await User.findById(user._id)
  . select("-password -refreshToken")
  .then((user) => {

    if(!createdUser){
      throw new ApiError("User not found", 404)
    }

    res.status(201).json(new ApiResponse
      (true, "User registered successfully", createdUser)
  )
  })
  .catch((err) => {
    throw new ApiError(err.message || "Error registering user", err.code || 500)
  })
  
  
});







export { registerUser };
