import User from "../models/user.js";

export async function addUser(u) {
    const [ ip, username ] = u;
    const user = new User({
        ip,
        username
    });
    await user.save();
    return user;
}

export async function getUser(ip, username) {
    return await User.find({ ip, username });
}