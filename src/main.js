// ============================================================
// MAIN RUNTIME
// ============================================================
//
// Responsibilities:
//
//   data.js
//       ↓
//   main.js
//       ↓
//   generate current page
//       ↓
//   DOM
//
// main.js does NOT contain the actual content.
//
// ============================================================


import {
    SITE,
    PROJECTS,
    POSTS
} from "./data.js";

import {
    maxEquation
} from "./math.js";



// ============================================================
// BACKGROUND
// ============================================================

function background() {

    return `

        <div
            class="background"
            aria-hidden="true"
        >

            <div class="grid"></div>

            <div class="orb orb-a"></div>

            <div class="orb orb-b"></div>


            <div class="cross c1">
                +
            </div>

            <div class="cross c2">
                +
            </div>

            <div class="cross c3">
                +
            </div>


            <div class="coordinate x1">
                X 047.21
            </div>

            <div class="coordinate x2">
                Y 918.04
            </div>

        </div>

    `;
}


// ============================================================
// LOGO
// ============================================================

function logo() {

    return `

        <a
            href="/"
            class="logo"
            aria-label="${SITE.title}"
        >

            <svg
                viewBox="0 0 76 48"
                width="61"
                height="39"
                fill="none"
                aria-hidden="true"
            >

                <!-- Y -->

                <path
                    d="
                        M4 5
                        L20 22
                        L36 5
                        M20 22
                        V43
                    "
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="square"
                    stroke-linejoin="miter"
                />


                <!-- tilted E -->

                <g
                    transform="
                        translate(2 5)
                        rotate(17 48 22)
                    "
                >

                    <path
                        d="
                            M38 6
                            H64

                            M38 6
                            V42
                            H64

                            M38 24
                            H59
                        "
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="square"
                    />

                </g>

            </svg>


            <span class="logo-text">
                ${SITE.title}
            </span>

        </a>

    `;
}


// ============================================================
// HEADER
// ============================================================

function header(activeRoute) {

    return `

        <header class="header">

            ${logo()}


            <nav>

                <a
                    href="/"
                    class="${
                        activeRoute === "/"
                            ? "active"
                            : ""
                    }"
                >
                    INDEX
                </a>


                <a
                    href="/projects"
                    class="${
                        activeRoute === "/projects"
                            ? "active"
                            : ""
                    }"
                >
                    PROJECTS
                </a>


                <a
                    href="/about"
                    class="${
                        activeRoute === "/about"
                            ? "active"
                            : ""
                    }"
                >
                    ABOUT
                </a>


                <a
                    href="/blog"
                    class="${
                        activeRoute === "/blog"
                            ? "active"
                            : ""
                    }"
                >
                    NOTES
                </a>

            </nav>


            <div class="status">

                <i></i>

                ONLINE

            </div>

        </header>

    `;
}


// ============================================================
// HOME
// ============================================================

function home() {

    return `

        <section class="hero">

            <div class="hero-meta">

                <span>
                    SYSTEM / 001
                </span>

                <span>
                    47°29' N
                </span>

            </div>


            <div class="hero-content">

                <div class="hero-small">

                    PERSONAL
                    <br>

                    COMPUTING
                    <br>

                    EXPERIMENTS

                </div>


                <h1>

                    ${SITE.title}<span>.</span>

                </h1>


                <div class="hero-description">

                    <p>
                        ${SITE.description}
                    </p>


                    <a
                        href="/projects"
                        class="enter"
                    >

                        <span>
                            ENTER PROJECTS
                        </span>

                        <b>
                            ↗
                        </b>

                    </a>

                </div>

            </div>


            <div class="hero-bottom">

                <span>
                    SCROLL TO EXPLORE
                </span>

                <span>
                    ↓
                </span>

                <span>
                    0001 / 0004
                </span>

            </div>

        </section>


        <!-- MANIFESTO -->

        <section class="manifesto">

            <div class="section-index">
                01
            </div>


            <div>

                <p class="giant-text">

                    SMALL
                    <span>CODE.</span>

                    <br>

                    BIG
                    <span>IDEAS.</span>

                </p>


                <p class="muted-copy">

                    This website is itself an experiment:
                    minimize the data, maximize the result.
                    Generate what is needed, when it is needed.

                </p>

            </div>

        </section>


        <!-- MATHEMATICS -->

        <section class="math-section">

            <div class="section-top">

                <span>
                    02 / MATHEMATICAL SYSTEM
                </span>

                <span>
                    PROCEDURAL SVG
                </span>

            </div>


            <div class="math-display">

                <div class="math-label">
                    CONSTRAINT
                </div>


                ${maxEquation({
                    size: 34
                })}

            </div>

        </section>


        <!-- PROJECTS -->

        <section class="projects-section">

            <div class="section-top">

                <span>
                    03 / SELECTED WORK
                </span>


                <a href="/projects">
                    VIEW ALL ↗
                </a>

            </div>


            <div class="project-list">

                ${PROJECTS.map(project => `

                    <a
                        href="/projects"
                        class="project-row"
                    >

                        <span class="project-id">
                            ${project.id}
                        </span>


                        <div class="project-main">

                            <span class="project-type">
                                ${project.type}
                            </span>


                            <h2>
                                ${project.title}
                            </h2>

                        </div>


                        <p>
                            ${project.text}
                        </p>


                        <span class="project-arrow">
                            ↗
                        </span>

                    </a>

                `).join("")}

            </div>

        </section>


        <!-- NOTES -->

        <section class="notes-section">

            <div class="section-top">

                <span>
                    04 / NOTES
                </span>


                <a href="/blog">
                    ALL NOTES ↗
                </a>

            </div>


            <div class="notes-grid">

                ${POSTS.map(post => `

                    <a
                        href="/blog/${post.slug}"
                        class="note"
                    >

                        <time>
                            ${post.date}
                        </time>


                        <div>

                            <h3>
                                ${post.title}
                            </h3>


                            <p>
                                ${post.text}
                            </p>

                        </div>


                        <span>
                            READ ↗
                        </span>

                    </a>

                `).join("")}

            </div>

        </section>

    `;
}


// ============================================================
// PROJECTS
// ============================================================

function projects() {

    return `

        <section class="page">

            <div class="page-heading">

                <span>
                    / PROJECTS
                </span>


                <h1>
                    Things
                    <br>
                    built.
                </h1>

            </div>


            <div class="project-list">

                ${PROJECTS.map(project => `

                    <article class="project-row">

                        <span class="project-id">
                            ${project.id}
                        </span>


                        <div class="project-main">

                            <span class="project-type">
                                ${project.type}
                            </span>


                            <h2>
                                ${project.title}
                            </h2>

                        </div>


                        <p>
                            ${project.text}
                        </p>


                        <span class="project-arrow">
                            ↗
                        </span>

                    </article>

                `).join("")}

            </div>

        </section>

    `;
}


// ============================================================
// ABOUT
// ============================================================

function about() {

    return `

        <section class="page about-page">

            <span class="page-label">
                / ABOUT
            </span>


            <h1>

                Curiosity is
                <br>
                a useful bug.

            </h1>


            <div class="about-columns">

                <p>
                    I'm interested in software,
                    electronics, computer architecture,
                    mathematics and robotics.
                </p>


                <p>
                    The interesting part isn't just
                    making something work. It's
                    understanding why it works and
                    finding out how small it can become.
                </p>

            </div>

        </section>

    `;
}


// ============================================================
// BLOG INDEX
// ============================================================

function blog() {

    return `

        <section class="page">

            <div class="page-heading">

                <span>
                    / NOTES
                </span>


                <h1>

                    Things
                    <br>
                    I've written.

                </h1>

            </div>


            <div class="notes-list">

                ${POSTS.map(post => `

                    <a
                        href="/blog/${post.slug}"
                        class="note-large"
                    >

                        <time>
                            ${post.date}
                        </time>


                        <div>

                            <h2>
                                ${post.title}
                            </h2>


                            <p>
                                ${post.text}
                            </p>

                        </div>


                        <span>
                            ↗
                        </span>

                    </a>

                `).join("")}

            </div>

        </section>

    `;
}


// ============================================================
// BLOG POST
// ============================================================

function blogPost(slug) {

    const post =
        POSTS.find(
            item => item.slug === slug
        );


    if (!post) {

        return notFound();

    }


    return `

        <article class="page">

            <span class="page-label">
                / ${post.date}
            </span>


            <h1>
                ${post.title}
            </h1>


            <div class="about-columns">

                <p>
                    ${post.text}
                </p>

            </div>

        </article>

    `;
}


// ============================================================
// 404
// ============================================================

function notFound() {

    return `

        <section class="page not-found">

            <span>
                404
            </span>


            <h1>
                Nothing here.
            </h1>


            <a href="/">
                RETURN HOME ↗
            </a>

        </section>

    `;
}


// ============================================================
// ROUTER
// ============================================================

function route() {

    let path =
        window.location.pathname;


    path =
        path.replace(
            /\/+$/,
            ""
        ) || "/";


    if (path === "/") {

        return [
            "/",
            home()
        ];

    }


    if (path === "/projects") {

        return [
            "/projects",
            projects()
        ];

    }


    if (path === "/about") {

        return [
            "/about",
            about()
        ];

    }


    if (path === "/blog") {

        return [
            "/blog",
            blog()
        ];

    }


    if (
        path.startsWith("/blog/")
    ) {

        const slug =
            decodeURIComponent(
                path.slice("/blog/".length)
            );


        return [
            "/blog",
            blogPost(slug)
        ];

    }


    return [
        "",
        notFound()
    ];
}


// ============================================================
// RENDER
// ============================================================

function render() {

    const [
        routePath,
        html
    ] = route();


    document.title =
        routePath === "/"
            ? SITE.title
            : `${SITE.title} / ${
                routePath
                    .slice(1)
                    .toUpperCase()
            }`;


    const app =
        document.querySelector("#app");


    if (!app) {

        throw new Error(
            "14K: #app was not found."
        );

    }


    app.innerHTML = `

        ${background()}


        <div class="site">

            ${header(routePath)}


            <main>
                ${html}
            </main>


            <footer>

                <span>
                    ${SITE.title} / ${SITE.year}
                </span>


                <span>
                    BUILT WITHOUT A FRAMEWORK
                </span>


                <span>
                    14 KB / TARGET
                </span>

            </footer>

        </div>

    `;
}


// ============================================================
// CLIENT-SIDE NAVIGATION
// ============================================================

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest("a");


        if (!link)
            return;


        const url =
            new URL(
                link.href,
                window.location.href
            );


        if (
            url.origin !==
            window.location.origin
        ) {

            return;

        }


        if (url.hash)
            return;


        if (
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {

            return;

        }


        event.preventDefault();


        history.pushState(
            null,
            "",
            url.pathname
        );


        render();


        window.scrollTo(
            0,
            0
        );

    }
);


// ============================================================
// BACK / FORWARD
// ============================================================

window.addEventListener(
    "popstate",
    render
);


// ============================================================
// START
// ============================================================

render();