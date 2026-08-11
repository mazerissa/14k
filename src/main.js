import { router } from "./engine/router.js";
import { generator } from "./engine/generator.js";
import { renderer } from "./engine/renderer.js";

const app = document.getElementById("app");

const route = router();
const page = generator(route);

renderer(page, app);