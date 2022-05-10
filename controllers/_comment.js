const Comment = require("../models/comment");

const addComment = async ( input, { user } ) =>
{
	const { uid:idUser } = user;

	const { idPublication, comment } = input;

	try
	{
		const newComment = new Comment({ idPublication, idUser, comment });
		await newComment.save();

		return newComment;
	}
	catch (error)
	{
		console.log(error);
	}
}

const getCommentsForID = async ( idPublication ) =>
{
	const comments = await Comment.find({ idPublication }).populate("idUser");
	return comments;
}

module.exports = { addComment, getCommentsForID };