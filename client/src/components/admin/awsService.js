import AWS from "aws-sdk";
const region = process.env.REACT_APP_AWS_S3_REGION;
const accessKeyId = process.env.REACT_APP_AWS_ACCESSKEYID;
const secretAccessKey = process.env.REACT_APP_AWS_SECERTKEY;
const Bucket = process.env.REACT_APP_BUCKET_NAME;

AWS.config.update({ accessKeyId, secretAccessKey });

const myBucket = new AWS.S3({ params: { Bucket }, region });

export const s3UploadHandler = (file) => {
  console.log(file,Bucket,region,accessKeyId,secretAccessKey,);
  const params = {
    Body: file,
    Bucket,
    Key: Math.random().toString().replace(".", "") + file.name,
  };
  return new Promise((resolve, reject) => {
    myBucket.putObject(params, (err, data) => {
      if (err) reject(err);
      else resolve(`https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`);
    });
  });
};
