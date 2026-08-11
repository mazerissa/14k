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
import { element, text, append } from "./dom.js";
import { projects } from "../content/projects.js";


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


export function ProjectList(section) {
    const container = element("section", "project-list");

    for (const id of section.projects) {
        const project = projects[id];

        if (!project) {
            continue;
        }

        const card = ProjectCard(project, id);

        container.append(card);
    }

    return container;
}


export function ProjectCard(project, id) {
    const article = element("article", "project-card");

    const heading = text("h2", project.title);

    const description = text("p", project.description);

    const technologies = text(
        "p",
        project.technologies.join(" · ")
    );

    const link = document.createElement("a");

    link.href = `/projects/${id}`;

    link.textContent = "View project";

    append(
        article,
        heading,
        description,
        technologies,
        link
    );

    return article;
}


export function Project(project) {
    const article = element("article", "project");

    const heading = text("h2", project.title);

    const description = text("p", project.description);

    const technologies = text(
        "p",
        project.technologies.join(" · ")
    );

    append(
        article,
        heading,
        description,
        technologies
    );

    return article;
}


export function NotFound() {
    const section = element("section", "not-found");

    const heading = text("h2", "404");

    const message = text("p", "Page not found.");

    append(section, heading, message);

    return section;
}
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