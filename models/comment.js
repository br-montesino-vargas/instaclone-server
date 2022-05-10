const { Schema, model } = require('mongoose');

const CommentSchema = Schema(
{
	idPublication:
	{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Publication'
	},
	idUser:
	{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	comment:
	{
		type: String,
		trim: true,
		required: true
	},
	createAt:
	{
		type: Date,
		default: Date.now()
	}
});

module.exports = model( 'Comment', CommentSchema );