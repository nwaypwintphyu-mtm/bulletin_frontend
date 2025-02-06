import Header from "../components/Layouts/Header.vue";


export default {
  title: "Layouts/Header",
  component: Header,
};

export const FirstStory = {
  render: (args) => ({
    components: { Header },
    setup() {
      return { args };
    },
    template: '<Header v-bind="args" />',
  }),
  args: {
   
  },
};