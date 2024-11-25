import User from "../models/user.js";

export async function addUser(u) {
    const { ip, username, email } = u;
    const user = new User({
        ip,
        username,
        email
    });
    await user.save();
    return {
        id: user._id,
        username: user.username,
        email: user.email
    };
}

export async function getUser(ip, username) {
    return await User.find({ ip, username });
}