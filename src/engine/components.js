import { element, text, append } from "./dom.js";


export function Hero(section) {
    const hero = element("section", "hero");

    const heading = text("h2", section.title);

    append(hero, heading);

    return hero;
}


export function TextSection(section) {
    const sectionElement = element("section", "text-section");

    const heading = text("h2", section.title);

    const paragraph = text("p", section.content);

    append(sectionElement, heading, paragraph);

    return sectionElement;
}


export function NotFound() {
    const section = element("section", "not-found");

    const heading = text("h2", "404");

    const message = text("p", "Page not found.");

    append(section, heading, message);

    return section;
}