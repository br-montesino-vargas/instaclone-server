require('dotenv').config();

const { server } = require("./config/server");
const { database } = require("./config/database");

// Inicializar servidor
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) =>
{
	console.log(`Servidor listo en ${ url }`);
	
	// Inicializar base de datos
	database();
});