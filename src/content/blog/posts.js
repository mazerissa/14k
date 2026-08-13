export const posts = {
    "building-a-14kb-website": {
        title: "Building a 14 KB Website",
        date: "2026-08-11",
        tags: ["web", "performance", "javascript"],

        content: [
            {
                type: "heading",
                level: 2,
                text: "Why 14 KB?"
            },

            {
                type: "paragraph",
                text: "The goal is to build a personal website that generates only the content required for the current route."
            },

            {
                type: "paragraph",
                text: "The engine should be small, deterministic and fast."
            },

            {
                type: "heading",
                level: 2,
                text: "The architecture"
            },

            {
                type: "paragraph",
                text: "The website uses a router, generator, renderer and content layer."
            }
        ]
    }
};