import { pages } from "../content/pages.js";
import { projects } from "../content/projects.js";


export function generator(route) {
    switch (route.name) {
        case "home":
            return pages.home;

        case "about":
            return pages.about;

        case "projects":
            return generateProjectsPage();

        case "project":
            return generateProjectPage(route.id);

        case "blog":
            return pages.blog;

        case "blog-post":
            return generateBlogPostPage(route.slug);

        case "uses":
            return pages.uses;

        case "contact":
            return pages.contact;

        default:
            return {
                type: "page",
                title: "404",
                sections: [
                    {
                        type: "404"
                    }
                ]
            };
    }
}


function generateProjectsPage() {
    return {
        type: "page",
        title: pages.projects.title,

        sections: [
            {
                type: "project-list",
                projects: Object.keys(projects)
            }
        ]
    };
}


function generateProjectPage(id) {
    const project = projects[id];

    if (!project) {
        return {
            type: "page",
            title: "404",
            sections: [
                {
                    type: "404"
                }
            ]
        };
    }

    return {
        type: "page",
        title: project.title,

        sections: [
            {
                type: "project",
                id
            }
        ]
    };
}


function generateBlogPostPage(slug) {
    return {
        type: "page",
        title: slug,

        sections: [
            {
                type: "blog-post",
                slug
            }
        ]
    };
}