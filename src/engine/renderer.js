import { element, text } from "./dom.js";

import {
    Hero,
    TextSection,
    ProjectList,
    Project,
    NotFound
} from "./components.js";

import { projects } from "../content/projects.js";


export function renderer(page, app) {
    app.innerHTML = "";

    const main = element("main", "page");

    const title = text("h1", page.title);

    main.append(title);

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

        case "project-list":
            parent.append(ProjectList(section));
            break;

        case "project": {
            const project = projects[section.id];

            if (project) {
                parent.append(Project(project));
            }

            break;
        }

        case "404":
            parent.append(NotFound());
            break;

        default:
            console.warn(
                `Unknown section type: ${section.type}`
            );
    }
}