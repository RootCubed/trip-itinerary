import fs from "fs";
import { randomUUID } from "crypto";

let trips = JSON.parse(fs.readFileSync("trips/index.json", "utf-8"));

export function getTripIDs() {
    return Object.keys(trips);
}

export function getTripName(id) {
    return trips[id].name;
}

export function getTripCreationTime(id) {
    return new Date(trips[id].created);
}

export function getTripVisibility(id) {
    return trips[id].visibility;
}

export function getTripData(id) {
    return JSON.parse(fs.readFileSync(`trips/${trips[id].file}`, "utf-8"));
}

export function createTrip(name) {
    const id = randomUUID();
    const created = new Date().getTime();
    const file = `${id}.json`;
    trips[id] = { name, created, file, visibility: "private" };
    fs.writeFileSync("trips/index.json", JSON.stringify(trips, null, 4));
    fs.writeFileSync(`trips/${file}`, JSON.stringify({title: name, description: "", legs: []}));
    return id;
}

export function deleteTrip(id) {
    const tripFile = `trips/${trips[id].file}`;
    if (fs.existsSync(tripFile)) {
        fs.unlinkSync(tripFile);
    }
    delete trips[id];
    fs.writeFileSync("trips/index.json", JSON.stringify(trips, null, 4));
}

export function editTrip(id, data) {
    fs.writeFileSync(`trips/${id}.json`, JSON.stringify(data, null, 4));
}
