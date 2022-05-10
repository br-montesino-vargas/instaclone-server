const { Schema, model } = require('mongoose');

const FollowSchema = Schema(
{
	idUser : { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	follow : { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	createAt: { type: Date, default: Date.now() }
});

module.exports = model( 'Follow', FollowSchema );