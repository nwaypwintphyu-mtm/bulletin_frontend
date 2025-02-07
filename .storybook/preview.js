/** @type { import('@storybook/vue3').Preview } */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createPinia } from "pinia";
import { setup } from "@storybook/vue3";

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
});

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
