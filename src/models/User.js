const monogose = require("mongoose");

const UserSchema = new monogose.Schema(
    {
        name: String,
        email: String,
        password: String,
        img: {
            type: String,
            default:
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y",
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true }
);

module.exports = monogose.model("User", UserSchema);
