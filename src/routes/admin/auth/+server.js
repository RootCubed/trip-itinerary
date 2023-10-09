import { makeSessionToken } from "$lib/admin.js";
import { base } from "$app/paths";

export async function POST({ request, cookies }) {
    const data = (await request.text()).split("=");
    if (data.length == 2 && data[0] == "password") {
        if (data[1] == process.env.ADMIN_PASSWORD) {
            cookies.set("session", makeSessionToken(), { path: base });
            return new Response("OK", {
                status: 303,
                headers: {
                    Location: base
                }
            });
        } else {
            return new Response("Unauthorized", { status: 401 });
        }
    } else {
        return new Response("Bad Request", { status: 400 });
    }
}
