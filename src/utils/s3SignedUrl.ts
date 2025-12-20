import s3 from "../config/s3";

export const getResolvedImageUrl = (value?: string | null) => {
  if (!value) return null;

  // If already a full URL (public S3)
  if (value.startsWith("http")) {
    return value;
  }

  // Otherwise treat as S3 key
  return s3.getSignedUrl("getObject", {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: value,
    Expires: 60 * 60,
  });
};
