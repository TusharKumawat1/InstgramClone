import ProfileInfo from "../models/ProfileInfo.js";
import User from "../models/User.js";
export const editProfileAttributes = async (req, res) => {
    try {
        const {profileAttributes}=req.body
      const userExist = await User.findById({ _id: req.user._id });
      if (!userExist) {
        return res.status(404).json({success:false,message:"user not found"})
      }
      const userProfile=await ProfileInfo.findOne({userId:req.user._id})
      if(profileAttributes.link)
         userProfile.links=profileAttributes.link
      if(profileAttributes.gender)
         userProfile.gender=profileAttributes.gender
      if(profileAttributes.bio)  
         userProfile.bio=profileAttributes.bio
      if(profileAttributes.pfp)  
         userProfile.pfp=profileAttributes.pfp
      await userProfile.save()
      return res.status(200).json({success:true,message:"change successful"})
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error:error });
    }
  };