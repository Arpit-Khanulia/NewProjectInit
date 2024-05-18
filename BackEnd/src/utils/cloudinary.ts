import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
    cloud_name: 'di4jyusxf', 
    api_key: '577412118699267', 
    api_secret: 'HiVzZCHnGAWFvnR2-AROJ4wF1rw' 
  });

const uploadOnCloudinary = async (localFilePath:string) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response.url;

    } catch (error) {

        let attempt = 2;
        while(attempt--){
            console.log('retrying attempt',4-attempt);
            uploadOnCloudinary(localFilePath);
        }
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}