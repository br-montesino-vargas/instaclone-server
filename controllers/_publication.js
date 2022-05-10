const Publication = require("../models/publication");
const User = require("../models/user");
const Follow = require("../models/follow");

const { v4: uuidv4 } = require("uuid");

const { awsUploadImage } = require('../helpers/aws-upload');

const publish = async ( file, { user } ) =>
{
	const { uid } = user;

	const { createReadStream, mimetype } = await file;
	const fileExtension = mimetype.split("/")[1];
	const filepath = `publication/${ uuidv4() }.${ fileExtension }`;
	const fileData = createReadStream();

	try
	{
		const urlPublication = await awsUploadImage( fileData, filepath );
		const publication = new Publication(
		{
			idUser: uid,
			file: urlPublication,
			typeFile: mimetype.split("/")[0]
		});
		await publication.save();

		return {
			status: true,
			urlPublication
		}
	}
	catch (error)
	{
		return {
			status: false,
			urlPublication: null
		}
	}
}

const getPublicationsForUsername = async ( username ) =>
{
	const user = await User.findOne({ username });
	if( !user ) throw new Error("Usuario no encontrado");

	const publications = await Publication.find()
		.where({ idUser: user._id })
		.sort({ createAt: -1 });
		
	return publications;
}

const getPublicationsFolloweds = async ( { user } ) =>
{
	const followeds = await Follow.find({ idUser: user.uid }).populate("follow");
	
	const followedList = [];
	for await ( const data of followeds )
	{
		followedList.push( data.follow );
	}

	const publicationList = [];
	for await ( const data of followedList )
	{
		const publications = await Publication.find()
			.where({ idUser: data._id })
			.sort({ createAt: -1 })
			.populate("idUser");

		publicationList.push( ...publications );

	}

	const result = publicationList.sort( (a, b) =>
	{
		return new Date( b.createAt ) - new Date( a.createAt );
	});

	return result;
}

module.exports = { publish, getPublicationsForUsername, getPublicationsFolloweds };