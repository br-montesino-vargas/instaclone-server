const Follow = require('../models/follow');
const User = require('../models/user');

const isFollow = async ( username, context ) =>
{
	const userFollow = await User.findOne({ username });
	if( !userFollow ) throw new Error("Usuario no encontrado");

	const follow = await Follow.find({ idUser: context.user.uid })
		.where("follow")
		.equals( userFollow._id );

	if( follow.length > 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
}

const getFollowers = async ( username ) =>
{
	const user = await User.findOne({ username });
	const followers = await Follow.find({ follow: user._id }).populate("idUser");
	
	const listFollowers = [];
	for await ( const data of followers )
	{
		listFollowers.push( data.idUser );
	}

	return listFollowers;
}

const getFolloweds = async ( username ) =>
{
	const user = await User.findOne({ username });
	const followeds = await Follow.find({ idUser: user._id }).populate("follow");
	
	const listFolloweds = [];
	for await ( const data of followeds )
	{
		listFolloweds.push( data.follow );
	}

	return listFolloweds;
}

const getNotFolloweds = async ( context ) =>
{
	const users = await User.find().limit(50);
	const arrayUsers = [];

	for await ( const user of users )
	{
		const isFind = await Follow.findOne({ idUser: context.user.uid })
			.where("follow")
			.equals(user._id);

		if( !isFind )
		{
			if( user._id.toString() !== context.user.uid.toString() )
			{
				arrayUsers.push( user );
			}
		}
	}

	return arrayUsers;
}

const follow = async ( username, context ) =>
{
	const userFollow = await User.findOne({ username })
	if( !userFollow ) throw new Error("Usuario no encontrado");

	try
	{
		const newFollow = new Follow(
		{
			idUser: context.user.uid,
			follow: userFollow._id
		});

		newFollow.save();
		return true;
	}
	catch (error)
	{
		console.log(error);
		return false;
	}

}

const unFollow = async ( username, context ) =>
{
	const userUnfollow = await User.findOne({ username })
	const unFollow = await Follow.deleteOne({ idUser: context.user.uid })
		.where("follow")
		.equals( userUnfollow._id );

	if( unFollow.deletedCount > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

module.exports = { isFollow, getFollowers, getFolloweds, getNotFolloweds, follow, unFollow };