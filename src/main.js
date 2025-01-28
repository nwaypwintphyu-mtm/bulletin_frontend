import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "vue-toast-notification/dist/theme-sugar.css";
import "vuetify/styles";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";
import { createVuetify } from "vuetify";

const vuetify = createVuetify();
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueToast);
app.mount("#app");
