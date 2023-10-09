import { isValidSessionToken } from "$lib/admin";

export function load({ cookies }) {
    return {
        isAdmin: isValidSessionToken(cookies.get("session"))
    };
}
