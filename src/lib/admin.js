import { writable } from "svelte/store";
import crypto from "crypto";

const sessionTokens = {};

export function isValidSessionToken(token) {
    if (!sessionTokens[token]) return false;
    if (sessionTokens[token].validUntil < Date.now()) {
        delete sessionTokens[token];
        return false;
    }
    return true;
}

export function makeSessionToken() {
    const token = crypto.randomUUID();
    sessionTokens[token] = { validUntil: Date.now() + 1000 * 60 * 60 * 24 };
    return token;
}

export const isAdmin = writable(false);
