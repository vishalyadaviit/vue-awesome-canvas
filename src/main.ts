import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import routes from "./routes.ts";

const app = createApp(App);
app.use(routes).mount("#app");
