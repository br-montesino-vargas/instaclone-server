const Like = require("../models/like");

const addLike = async ( idPublication, { user } ) =>
{
	const { uid:idUser } = user;

	try
	{
		const newLike = new Like({ idPublication, idUser });
		await newLike.save();

		return true;
	}
	catch (error)
	{
		console.log(error);
		return false;
	}
}

const deleteLike = async ( idPublication, { user } ) =>
{
	const { uid:idUser } = user;

	try
	{
		await Like.findOneAndDelete({ idPublication }).where({ idUser });

		return true;
	}
	catch (error)
	{
		console.log(error);
		return false;
	}
}

const isLike = async ( idPublication, { user } ) =>
{
	const { uid:idUser } = user;

	try
	{
		const response = await Like.findOne({ idPublication }).where({ idUser });
		if( !response ) throw new Error("El usuario no existe");

		return true;
	}
	catch (error)
	{
		console.log(error);
		return false;
	}
}

const countLikes = async ( idPublication ) =>
{
	try
	{
		const response = await Like.countDocuments({ idPublication });
		return response;
	}
	catch (error)
	{
		console.log(error);
	}
}

module.exports = { addLike, deleteLike, isLike, countLikes };