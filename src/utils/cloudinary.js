import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


const uploadToCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('File path is required for upload.');
        }
        //UPLOAD THE FILE ON CLOUDINARY
        const resposne = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto", // Automatically detect the file type (image, video, etc.)
            folder: "chai-aur-videos", // Optional: specify a folder in Cloudinary
        })
        //file have been uploaded successfully
        console.log('Cloudinary upload response:', resposne.url);
        return resposne;


    }     catch (error) {
          fs.unlinkSync(filePath); // Delete the local file in case of an error
          console.error('Error uploading to Cloudinary:', error);
          throw error; // Rethrow the error to be handled by the caller
        
    }   

};

export { uploadToCloudinary };


