const { Schema, model } = require('mongoose');

const UserSchema = Schema(
{
	name: 	  { type: String, required: true },
	username: { type: String, required: true, trim: true, lowercase: true, unique: true },
	email: 	  { type: String, required: true, lowercase: true, unique: true },
	avatar:   { type: String, trim: true },
	website:  { type: String, trim: true },
	description: { type: String, trim: true },
	password: { type: String, required: true, trim: true },
	createAt: { type: Date, default: Date.now() }
});

module.exports = model( 'User', UserSchema );