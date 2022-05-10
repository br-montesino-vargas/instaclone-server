const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { typeDefs } = require('../gql/schema');
const { resolvers } = require('../gql/resolver');


const server = new ApolloServer(
{
	typeDefs,
	resolvers,
	context: ({ req }) =>
	{
		const token = req.headers.authorization;

		if(token)
		{
			try
			{
				const user = jwt.verify(
					token.replace('Bearer ', ''),
					process.env.SECRET_JWT
				);

				return {
					user
				}
			}
			catch (error)
			{
				console.log('### ERROR ###');
				console.log(error);
				throw new Error('Token inválido');

			}
		}
	}
});

module.exports = { server };