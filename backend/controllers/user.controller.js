    import { User } from "../models/user.model.js";
    import bcrypt from 'bcryptjs'
    import jwt from 'jsonwebtoken'
    import getDataUri from "../utils/datauri.js";
    import cloudinary from '../utils/cloudinary.js'

    export const register =async (req,res) => {
        try{
            const {fullname,email,phoneNumber,password,role} =req.body;
            if(!fullname || !email || !phoneNumber || !password || !role){
                return res.status(400).json({
                    message: 'Something is Missing',
                    success: false
                });
            }
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "profile_photos", // Organize uploads into a specific folder
                transformation: {
                    width: 200, 
                    height: 200, 
                    crop: "fill", 
                    gravity: "face", 
                },
            });
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({
                    message: 'Email already exists',
                    success: false
                });
            }

            const hashedPassword = await bcrypt.hash(password,10);
            await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile:{
                    profilePhoto:cloudResponse.secure_url,
                }
            });
            return res.status(201).json({
                message: "Account created successfully.",
                success: true
            });
        }
        catch(err){
            res.status(500).json({
                message: err.message,
                success: false
            });
        }
    };

    export const login = async (req,res) => {
        try{
            const {email, password, role} = req.body;
            if(!email ||!password || !role){
                return res.status(400).json({
                    message: 'Something is Missing',
                    success: false
                });
            }
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message: 'Email or Password is incorrect',
                    success: false
                });
            }
            const isPasswordMatch = await bcrypt.compare(password,user.password);
            if(!isPasswordMatch){
                return res.status(400).json({
                    message: 'Email or Password is incorrect',
                    success: false
                });
            };
            // check role is correct or not
            if (role !== user.role) {
                return res.status(400).json({
                    message: "Account doesn't exist with current role.",
                    success: false
                })
            };
            const tokenData = {
                userId: user._id,
            }
            const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'});
            user={
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
                phoneNumber:user.phoneNumber,
                role:user.role,
                profile:user.profile
            }
            return res.status(200).cookie("token", token, {maxAge: 24 * 60 * 60 * 1000 
                , httpsOnly: true, 
                sameSite:'strict'}).json({
                message: `Welcome Back ${user.fullname}`,
                user,
                success: true,
            });
        }
        
        catch(err){
            res.status(500).json({
                message: err.message,
                success: false
            });
            
        }
    };

    export const logout = async (req, res) => {
        try {
          return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict',
          }).json({
            message: "Logged Out Successfully",
            success: true,
          });
        } catch (err) {
          res.status(500).json({
            message: err.message,
            success: false,
          });
        }
    };
      

    export const updateProfile = async (req, res) => {
        try {
            const { fullname, email, phoneNumber, bio, skills } = req.body;
            const file = req.file;
    
            let cloudResponse;
            if (file) {
                // Validate that the file is a PDF
                if (file.mimetype !== "application/pdf") {
                    return res.status(400).json({
                        message: "Invalid file type. Only PDFs are allowed.",
                        success: false,
                    });
                }
    
                const fileUri = getDataUri(file);
    
                // Upload to Cloudinary as raw resource
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "raw", // Required for non-image files like PDFs
                    format: "pdf", // Explicitly specify the format
                });
            }
    
            let skillsArray;
            if (skills) {
                skillsArray = skills.split(",");
            }
    
            const userId = req.id;
            let user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    message: "User not found",
                    success: false,
                });
            }
    
            // Update user profile details
            if (fullname) user.fullname = fullname;
            if (email) user.email = email;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (bio) user.profile.bio = bio;
            if (skills) user.profile.skills = skillsArray;
    
            // Update resume in profile if a file is provided
            if (cloudResponse) {
                user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
                user.profile.resumeOrignalName = file.originalname; // Save the original file name
            }
    
            await user.save();
    
            user = {
                _id: userId,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            };
    
            return res.status(200).json({
                message: "Profile updated successfully.",
                user,
                success: true,
            });
        } catch (err) {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        }
    };
    
    
    