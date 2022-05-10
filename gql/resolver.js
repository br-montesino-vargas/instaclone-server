const { authRegister, authLogin, authRenew, getUser, getUsers, userUpdateAvatar, userDeleteAvatar, userUpdate } = require('../controllers/_user');
const { isFollow, getFollowers, getFolloweds, getNotFolloweds, follow, unFollow } = require('../controllers/_follow');
const { publish, getPublicationsForUsername, getPublicationsFolloweds } = require('../controllers/_publication');
const { addComment, getCommentsForID } = require('../controllers/_comment');
const { addLike, deleteLike, isLike, countLikes } = require('../controllers/_like');


const resolvers = {
	Query:
	{
		/* User */
		getUser: ( _, { id, username } ) => getUser( id, username ),
		getUsers: ( _, { name } ) => getUsers( name ),

		/* Follow */
		isFollow: ( _, { username }, context ) => isFollow( username, context ),
		getFollowers: ( _, { username } ) => getFollowers( username ),
		getFolloweds: ( _, { username } ) => getFolloweds( username ),
		getNotFolloweds: ( _, {}, context ) => getNotFolloweds( context ),

		/* Publication */
		getPublicationsForUsername: ( _, { username } ) => getPublicationsForUsername( username ),
		getPublicationsFolloweds: ( _, {}, context ) => getPublicationsFolloweds( context ),

		/* Comment */
		getCommentsForID: ( _, { idPublication } ) => getCommentsForID( idPublication ),

		/* Like */
		isLike: ( _, { idPublication }, context ) => isLike( idPublication, context ),
		countLikes: ( _, { idPublication }) => countLikes( idPublication ),
	},
	Mutation:
	{
		/* User */
		authRegister: ( _, { input } ) => authRegister( input ),
		authLogin: ( _, { input }) => authLogin( input ),
		authRenew: ( _, { input }) => authRenew( input ),
		
		userUpdateAvatar: ( _, { file }, context ) => userUpdateAvatar( file, context ),
		userDeleteAvatar: ( _, {}, context ) => userDeleteAvatar( context ),
		userUpdate: ( _, { input }, context ) => userUpdate( input, context ),

		/* Follow */
		follow: ( _, { username }, context ) => follow( username, context ),
		unFollow: ( _, { username }, context ) => unFollow( username, context ),

		/* Publication */
		publish: ( _, { file }, context) => publish( file, context ),

		/* Comment */
		addComment: ( _, { input }, context) => addComment( input, context ),

		/* Like */
		addLike: ( _, { idPublication }, context) => addLike( idPublication, context ),
		deleteLike: ( _, { idPublication }, context) => deleteLike( idPublication, context ),
	}
}

module.exports = { resolvers };