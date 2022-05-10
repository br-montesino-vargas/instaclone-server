const { gql } = require('apollo-server');

const typeDefs = gql`

	type User
	{
		id: ID,
		name : String,
		username : String,
		email : String,
		avatar : String,
		website : String,
		description : String,
		password : String,
		createAt : String
	}

	type Token
	{
		token: String
	}

	type UpdateAvatar
	{
		status: Boolean,
		urlAvatar: String
	}

	type Publish
	{
		status: Boolean
		urlFile: String
	}

	type Publication
	{
		id: ID
		idUser: ID
		file: String
		typeFile: String
		createAt: String	
	}

	type FeedPublication
	{
		id: ID
		idUser: User
		file: String
		typeFile: String
		createAt: String
	}

	type Comment
	{
		idPublication: ID
		idUser: User
		comment: String
		createAt: String
	}

	input RegisterInput
	{
		name: String!,
		username: String!,
		email: String!,
		password: String!
	}

	input LoginInput
	{
		email: String!,
		password: String!
	}

	input RenewInput
	{
		id: ID!,
		name: String!,
		username: String!
	}

	input UserUpdateInput
	{
		name: String,
		email: String,
		currentPassword: String
		newPassword: String
		website: String
		description: String
	}

	input CommentInput
	{
		idPublication: ID,
		comment: String
	}

	type Query
	{
		# User
		getUser( id: ID, username: String ): User
		getUsers( name: String ) : [ User ]

		# Follow
		isFollow( username: String! ) : Boolean
		getFollowers( username: String! ) : [ User ]
		getFolloweds( username: String! ) : [ User ]
		getNotFolloweds: [ User ]

		# Publication
		getPublicationsForUsername( username: String! ) : [ Publication ]
		getPublicationsFolloweds: [ FeedPublication ]

		# Comment
		getCommentsForID( idPublication: ID! ) : [ Comment ]

		# Like
		isLike( idPublication: ID! ) : Boolean
		countLikes( idPublication: ID! ) : Int
	}

	type Mutation
	{
		# User
		authRegister( input: RegisterInput ) : Token
		authLogin( input: LoginInput ) : Token
		authRenew( input: RenewInput ) : Token

		userUpdateAvatar( file: Upload ) : UpdateAvatar
		userDeleteAvatar: Boolean
		userUpdate( input: UserUpdateInput ) : Boolean

		# Follow
		follow( username: String! ) : Boolean
		unFollow( username: String! ) : Boolean

		# Publication
		publish( file: Upload ) : Publish

		# Comment
		addComment( input: CommentInput ) : Comment

		# Like
		addLike( idPublication: ID! ) : Boolean
		deleteLike( idPublication: ID! ) : Boolean
	}

`;

module.exports = { typeDefs };