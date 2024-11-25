import { SERVER_URL } from "./base";

const USER_ROUTE = SERVER_URL + "users/";

export async function addUser(username: string, email: string) {
  return await fetch(USER_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
    }),
  });
}

export async function getUser(username: string) {
  return await fetch(USER_ROUTE + username);
}
