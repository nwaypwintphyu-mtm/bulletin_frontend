import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.css';

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify)
app.mount("#app");
