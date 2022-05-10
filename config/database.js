const mongoose = require('mongoose');
require('dotenv').config();

const database = async () =>
{
	try
	{
		await mongoose.connect( process.env.DB_CNN, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

		console.log('DB Online');
	}
	catch (error)
	{
		console.log(error);
		throw new error('Error a la hora de inicializar BD')
	}
}

module.exports = { database };