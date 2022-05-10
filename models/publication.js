const { Schema, model } = require('mongoose');

const PublicationSchema = Schema(
{
	idUser:
	{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	file:
	{
		type: String,
		trim: true,
		required: true
	},
	typeFile:
	{
		type: String,
		trim: true
	},
	createAt:
	{
		type: Date,
		default: Date.now()
	}
});

module.exports = model( 'Publication', PublicationSchema );