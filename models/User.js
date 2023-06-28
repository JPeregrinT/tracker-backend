const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true, set: a => a === '' ? undefined : a},
	password: {type: String, required: true, set: b => b === '' ? undefined : b},
	name: {type: String, required: false, set: c => c === '' ? undefined : c},
	surName: {type: String, required: false, set: d => d === '' ? undefined : d},
	gender: {type: String, required: false, set: e => e === '' ? undefined : e},
	birthdate: {type: Date, required: false, set: f => f === '' ? undefined : f},
	userImage: {type: String, required: false, set: g => g === '' ? undefined : g},
	phone: {type: Number, required: false, set: h => h === '' ? undefined : h}, 
	city: {type: String, required: false, set: i => i === '' ? undefined : i},
	country: {type: String, required: false, set: j => j === '' ? undefined : j},
	adress: {type: String, required: false, set: k => k === '' ? undefined : k},
	homeNumber: {type: Number, required: false, set: l => l === '' ? undefined : l},
	postcode: {type: Number, required: false, set: m => m === '' ? undefined : m},
});


//esta funcion se ejecuta "antes" de updatear cualquier usuario en Mongo
UserSchema.pre('findOneAndUpdate',  function(next) {
	const user = this._update.$set;
	console.log("esto es user", user)

	
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