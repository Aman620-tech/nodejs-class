const AWS = require("aws-sdk");
// s3 activate
let S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECERET_KEY,
});

//  s3 service define

let uploadS3 = async (fileContent, fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };
  const uploadFile = await S3.upload(params).promise();

  return uploadFile;
};

module.exports = { uploadS3 };
