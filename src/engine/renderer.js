import { element, text, append } from "./dom.js";

import {
    Hero,
    TextSection,
    NotFound
} from "./components.js";


export function renderer(page, app) {
    app.innerHTML = "";

    const main = element("main", "page");

    const title = text("h1", page.title);

    append(main, title);

    for (const section of page.sections) {
        renderSection(section, main);
    }

    app.append(main);
}


function renderSection(section, parent) {
    switch (section.type) {
        case "hero":
            parent.append(Hero(section));
            break;

        case "text":
            parent.append(TextSection(section));
            break;

        case "404": // 404 for when u mess ts up
            parent.append(NotFound());
            break;

        default:
            console.warn(
                `you f..ked up ts: ${section.type}`
            );
    }
}