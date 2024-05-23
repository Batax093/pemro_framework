import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function(v) {
					return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v);
				},
				message: props => `${props.value} is not a valid email address!`
			}
		},
		role: {
			type: String,
			enum: ['umum', 'supplier', 'manajer', 'administrator'],
			default: 'umum',
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;