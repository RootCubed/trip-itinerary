import { derived, writable } from "svelte/store";
import translation_en from "./translations/en";
import translation_de from "./translations/de";

export const locale = writable("en");

const translationStrings = {
    en: translation_en,
    de: translation_de
};

function translate(lc, key) {
    if (!(lc in translationStrings)) return `{${key}}`;
    const lcStrings = translationStrings[lc];
    if (!(key in lcStrings)) return `{${key}}`;

    return [...arguments].slice(2).reduce((a, c, i) => {
        const regex = new RegExp("\\$" + (i + 1), "g");
        return a.replace(regex, c);
    }, lcStrings[key]);
}

export const t = derived(locale, lc => (key, args) => {
    return translate(lc, key, args);
});
