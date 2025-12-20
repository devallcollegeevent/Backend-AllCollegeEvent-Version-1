import s3 from "../config/s3";
import { v4 as uuid } from "uuid";

export const uploadToS3 = async (
  file: Express.Multer.File,
  folder = "uploads"
) => {
  try {
    console.log("Uploading to S3:", file.originalname);

    const safeName = file.originalname.replace(/\s+/g, "-");

    const key = `${folder}/${uuid()}-${safeName}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET as string,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();

    console.log("S3 UPLOAD SUCCESS:", result.Location);

    return {
      url: result.Location,
      key: result.Key,
    };
  } catch (err) {
    console.error("S3 UPLOAD FAILED:", err);
    throw err;
  }
};
