const AWS = require("aws-sdk");

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const ID = process.env.AWS_ID;
const SECRET_KEY = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3(
{
	accessKeyId: ID,
	secretAccessKey: SECRET_KEY
});

const awsUploadImage = async ( file, filepath ) =>
{
	const params = {
		Bucket: BUCKET_NAME,
		Key: `${ filepath }`,
		Body: file
	};

	try
	{
		const response = await s3.upload( params ).promise();
		return response.Location;
	}
	catch (error)
	{
		console.log(error);
		throw new Error();
	}
}

module.exports = { awsUploadImage };