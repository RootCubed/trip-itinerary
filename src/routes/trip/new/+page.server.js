import { createTrip } from "$lib/trips.js";
import { redirect } from "@sveltejs/kit";
import { isValidSessionToken } from "$lib/admin.js";
import { base } from "$app/paths";

export async function load({ url, cookies }) {
    if (!isValidSessionToken(cookies.get("session"))) {
        throw redirect(302, `${base}/admin`);
    }

    const tripName = url.searchParams.get("name");
    const id = createTrip(tripName);
    throw redirect(303, `${base}/trip/${id}`);
}
