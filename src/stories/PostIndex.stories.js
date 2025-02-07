import PostIndex from "../components/pages/posts/index.vue";

export default {
  title: "Pages/PostIndex",
  component: PostIndex,
};

export const FirstStory = {
  render: (args) => ({
    components: { PostIndex },
    setup() {
      return { args };
    },
    template: '<PostIndex v-bind="args" />',
  }),
  args: {},
};
