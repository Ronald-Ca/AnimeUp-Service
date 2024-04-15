import { v2 as cloudinary } from 'cloudinary';

export default function Upload(file: any, folder: string) {
    return new Promise((resolve, reject) => {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        });

        cloudinary.uploader.upload(file, { folder: folder }, (error: any, result: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}