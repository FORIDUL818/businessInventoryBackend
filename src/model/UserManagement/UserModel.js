import mongoose, { set } from "mongoose"; 
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [2, "First name must be at least 2 characters long"],
        maxlength: [50, "First name must be at most 50 characters long"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [2, "Last name must be at least 2 characters long"],
        maxlength: [50, "Last name must be at most 50 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Simple email validation regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }

    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        set: function (value) {
            // Hash the password before saving it to the database
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            return hashedPassword;
        }
    }
}, {
    timestamps: true,
    versionKey: false,
});

const User = mongoose.model("User", userSchema);

export default User; 