import { getTripData, getTripName } from "$lib/trips.js";

export function load({ params }) {
    return {
        tripName: getTripName(params.id),
        tripData: getTripData(params.id)
    };
}
