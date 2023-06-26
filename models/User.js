const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true},
	password: {type: String, required: true},
	name: {type: String, required: false},
	surName: {type: String, required: false},
	gender: {type: String, required: false},
	birthdate: {type: Date, required: false},
	userImage: {type: String, required: false},
});


//esta funcion se ejecuta "antes" de updatear cualquier usuario en Mongo
UserSchema.pre('findOneAndUpdate',  function(next) {
	const user = this._update.$set;
	console.log("esto es password", user)

	
	if (!user.password) return next();
		
	
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			
			user.password = hash;
			console.log("hola", user.password)
			next();
		});
	});
});

UserSchema.pre('save',  function(next) {
	const user = this;
	console.log("esto es user", user)
	//si no se ha cambiado la contraseña, seguimos
	if (!user.isModified('password')) return next();

	//encriptamos la contraseña
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// si no ha habido error en el encryptado, guardamos
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// * Method to generate the JWT (You choose the name)
UserSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date();

	expirationDate.setDate(today.getDate() + 60);
	
	let payload = {
		id: this._id,
		name: this.name,
		email: this.email,
	};
	// * This method is from the json-web-token library (who is in charge to generate the JWT
	return jwt.sign(payload,secret, {
		expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
	});
};

const User = mongoose.model('User', UserSchema);



module.exports = User;