import { SERVER_URL } from "./base";

const USER_ROUTE = SERVER_URL + 'user/'

export async function addUser(username: String, email: String) {
    return await fetch(USER_ROUTE, {
        method: 'POST',
        body: {
            username,
            email
        } 
    })
}

export async function getUser(username: String) {
    return await fetch(USER_ROUTE + username); 
}