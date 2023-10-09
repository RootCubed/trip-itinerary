import { deleteTrip, editTrip } from "$lib/trips";
import { isValidSessionToken } from "$lib/admin.js";

export async function DELETE({ params, cookies }) {
    if (!isValidSessionToken(cookies.get("session"))) {
        return new Response("Unauthorized", { status: 401 });
    }
    deleteTrip(params.id);
    return new Response(null, { status: 204 });
}

export async function PATCH({ params, request, cookies }) {
    if (!isValidSessionToken(cookies.get("session"))) {
        return new Response("Unauthorized", { status: 401 });
    }
    const data = await request.json();
    editTrip(params.id, data);
    return new Response(null, { status: 204 });
}
