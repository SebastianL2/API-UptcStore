import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME
const API_SECRET= process.env.CLOUDINARY_API_SECRET
const API_KEY = process.env.CLOUDINARY_API_KEY

cloudinary.config({
  cloud_name: CLOUD, 
  api_key: API_KEY, 
  api_secret: API_SECRET,
  secure: true
})


export const uploadImage = async (filePath) => {
  
  return await cloudinary.uploader.upload(filePath, {
    folder: 'replit'
  })
}

export const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId)
}