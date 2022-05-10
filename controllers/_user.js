const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { awsUploadImage } = require('../helpers/aws-upload');


const authRegister = async ( newUser ) =>
{
	const { email, username, password } = newUser;
	
	// Validar si ya existe el email
	let user = await User.findOne({ email: email.toLowerCase() });
	if( user ) throw new Error('El email ya esta registrado');

	// Validar si ya existe el nombre de usuario
	user = await User.findOne({ username: username.toLowerCase() });
	if( user ) throw new Error('El nombre de usuario ya esta registrado');

	// Encriptar contraseña
	const salt = await bcrypt.genSaltSync(10);
	newUser.password = await bcrypt.hashSync( password, salt );

	try
	{
		// Guardar el nuevo usuario
		user = new User( newUser );
		await user.save();

		// Generar JWT
		const token = await generateJWT( user.id, user.name, user.username );

		return { token };
	}
	catch (error)
	{
		console.log(error);
	}
}

const authLogin = async ( dataUser ) =>
{
	const { email, password } = dataUser;
	
	// Validar si existe el usuario
	const user = await User.findOne({ email: email.toLowerCase() });
	if( !user ) throw new Error('Email y/o contraseña incorrectos');

	// Validar contraseña
	const validPass = bcrypt.compareSync( password, user.password );
	if( !validPass ) throw new Error('Email y/o contraseña incorrectos');

	try
	{
		// Generar JWT
		const token = await generateJWT( user.id, user.name, user.username );

		return { token };
	}
	catch (error)
	{
		console.log(error);
	}
}

const authRenew = async ( dataUser ) =>
{
	const { id, name, username } = dataUser;

	try
	{
		// Generar JWT
		const token = await generateJWT( id, name, username );

		return { token };
	}
	catch (error)
	{
		console.log(error);

		return null;
	}
}

const getUser = async ( id, username ) =>
{
	let user = null;

	if( id )
	{
		user = await User.findById( id );
	}
	else if( username )
	{
		user = await User.findOne({ username });
	}
	else
	{
		throw new Error("El usuario no existe");
	}

	return user;
}

const getUsers = async ( name ) =>
{
	const users = await User.find(
	{
		name: { $regex: name, $options: "i" }
	});

	return users;
}

const userUpdateAvatar = async ( file, { user } ) =>
{
	const { uid } = user;

	const { createReadStream, mimetype } = await file;
	const fileExtension = mimetype.split("/")[1];
	const filepath = `avatar/${ uid }.${ fileExtension }`;
	const fileData = createReadStream();

	try
	{
		const urlAvatar = await awsUploadImage( fileData, filepath );

		await User.findByIdAndUpdate( uid, { avatar: urlAvatar } );
		
		return {
			status: true,
			urlAvatar
		}
	}
	catch (error)
	{
		return {
			status: false,
			urlAvatar: null
		}
	}
}

const userDeleteAvatar = async ({ user }) =>
{
	const { uid } = user;

	try
	{
		await User.findByIdAndUpdate( uid, { avatar: "" });
		return true;
	}
	catch ( error )
	{
		console.log( error );
		return false;
	}
}

const userUpdate = async ( input, { user } ) =>
{
	const { currentPassword, newPassword } = input;
	
	try
	{
		if( currentPassword && newPassword )
		{
			/* Cambiar password */
			const userFound = await User.findById( user.uid );
			const passwordSuccess = await bcrypt.compare( currentPassword, userFound.password );


			if ( !passwordSuccess ) throw new Error("Contraseña incorrecta");
			
			const salt = await bcrypt.genSaltSync(10);
			const newPasswordCrypt = await bcrypt.hash( newPassword, salt );

			await User.findByIdAndUpdate( user.uid, { password: newPasswordCrypt });
		}
		else
		{
			await User.findByIdAndUpdate( user.uid, input );
		}
		
		return true;
	}
	catch (error)
	{
		console.log(error);
		return false;
	}
}

module.exports = { authRegister, authLogin, authRenew, getUser, getUsers, userUpdateAvatar, userDeleteAvatar, userUpdate };