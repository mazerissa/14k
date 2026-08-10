export function router() {

    const path = window.location.pathname;

    if (path === "/") {
        return {
            name: "home"
        };
    }

    if (path === "/about") {
        return {
            name: "about"
        };
    }

    if (path === "/projects") {
        return {
            name: "projects"
        };
    }

    if (path.startsWith("/projects/")) {
        const id = path.split("/")[2];

        return {
            name: "project",
            id
        };
    }

    if (path === "/blog") {
        return {
            name: "blog"
        };
    }

    if (path.startsWith("/blog/")) {
        const slug = path.split("/")[2];

        return {
            name: "blog-post",
            slug
        };
    }

    if (path === "/uses") {
        return {
            name: "uses"
        };
    }

    if (path === "/contact") {
        return {
            name: "contact"
        };
    }

    return {
        name: "404"
    };
}