import Login from "../components/pages/Login.vue";

export default {
  title: "Pages/Login",
  component: Login,
};

export const FirstStory = {
  render: (args) => ({
    components: { Login },
    setup() {
      return { args };
    },
    template: '<Login v-bind="args" />',
  }),
  args: {},
};
