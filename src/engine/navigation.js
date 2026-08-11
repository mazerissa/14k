import { router } from "./router.js";
import { generator } from "./generator.js";
import { renderer } from "./renderer.js";


export function navigate(path) {
    history.pushState({}, "", path);

    renderCurrentRoute();
}


export function renderCurrentRoute() {
    const app = document.getElementById("app");

    const route = router();

    const page = generator(route);

    renderer(page, app);
}


export function initializeNavigation() {
    document.addEventListener("click", handleClick);

    window.addEventListener("popstate", () => {
        renderCurrentRoute();
    });
}


function handleClick(event) {
    const link = event.target.closest("a");

    if (!link) {
        return;
    }

    const url = new URL(link.href);

    if (url.origin !== window.location.origin) {
        return;
    }

    if (url.hash) {
        return;
    }

    event.preventDefault();

    navigate(url.pathname);
}