import { router } from "./engine/router.js";

const app = document.getElementById("app");

// Call the imported router function
const route = router();

// Render the route object as formatted JSON for testing
app.textContent = JSON.stringify(route, null, 2);