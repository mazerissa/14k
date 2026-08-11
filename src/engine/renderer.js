export function renderer(page, app) {
    app.innerHTML = "";

    const pageElement = document.createElement("main");
    pageElement.className = "page";

    const title = document.createElement("h1");
    title.textContent = page.title;

    pageElement.appendChild(title);

    for (const section of page.sections) {
        renderSection(section, pageElement);
    }

    app.appendChild(pageElement);
}

function renderSection(section, parent) {
    switch (section.type) {
        case "hero":
            renderHero(section, parent);
            break;

        case "text":
            renderText(section, parent);
            break;

        default:
            console.warn(`Unknown section type: ${section.type}`);
    }
}

function renderHero(section, parent) {
    const hero = document.createElement("section");
    hero.className = "hero";

    const heading = document.createElement("h2");
    heading.textContent = section.title;

    hero.appendChild(heading);
    parent.appendChild(hero);
}

function renderText(section, parent) {
    const sectionElement = document.createElement("section");

    const heading = document.createElement("h2");
    heading.textContent = section.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = section.content;

    sectionElement.appendChild(heading);
    sectionElement.appendChild(paragraph);

    parent.appendChild(sectionElement);
}