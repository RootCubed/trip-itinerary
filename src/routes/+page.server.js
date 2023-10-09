import { getTripIDs, getTripName, getTripCreationTime, getTripVisibility } from "$lib/trips";
import { isValidSessionToken } from "$lib/admin.js";

export function load({ cookies }) {
    let tripFilter = () => true;
    if (!isValidSessionToken(cookies.get("session"))) {
        tripFilter = id => {
            return getTripVisibility(id) == "public";
        }
    }

    return {
        tripList: getTripIDs().filter(tripFilter).map(id => ({
            id,
            name: getTripName(id),
            created: getTripCreationTime(id),
            visibility: getTripVisibility(id)
        }))
    };
}
