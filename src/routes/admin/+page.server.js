import { isValidSessionToken } from "$lib/admin.js";
import { redirect } from "@sveltejs/kit";
import { base } from "$app/paths";

export function load({ cookies }) {
    if (isValidSessionToken(cookies.get("session"))) {
        throw redirect(303, base);
    }
}
