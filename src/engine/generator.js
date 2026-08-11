export function generator(route) {

    switch (route.name) {
        case "home":
            return {
                type: "page",
                title: "Home",
                sections: [
                    {
                        type: "hero",
                        title: "bomboclatt"
                    }
                ]
            };

        case "about":
            return {
                type: "page",
                title: "About",
                sections: [
                    {
                        type: "text",
                        title: "About Me",
                        content: "This is the about page."
                    }
                ]
            };

        case "projects":
            return {
                type: "page",
                title: "Projects",
                sections: [
                    {
                        type: "project-list"
                    }
                ]
            };

        case "project":
            return {
                type: "page",
                title: route.id,
                sections: [
                    {
                        type: "project",
                        id: route.id
                    }
                ]
            };

        case "blog":
            return {
                type: "page",
                title: "Blog",
                sections: [
                    {
                        type: "blog-list"
                    }
                ]
            };

        case "blog-post":
            return {
                type: "page",
                title: route.slug,
                sections: [
                    {
                        type: "blog-post",
                        slug: route.slug
                    }
                ]
            };

        case "uses":
            return {
                type: "page",
                title: "Uses",
                sections: [
                    {
                        type: "uses"
                    }
                ]
            };

        case "contact":
            return {
                type: "page",
                title: "Contact",
                sections: [
                    {
                        type: "contact"
                    }
                ]
            };

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