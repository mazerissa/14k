import { router } from "./engine/router.js";
import { generator } from "./engine/generator.js";

const app = document.getElementById("app");

const route = router();
const page = generator(route);

app.textContent = JSON.stringify(page, null, 2);