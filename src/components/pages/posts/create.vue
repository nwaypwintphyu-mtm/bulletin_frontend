<template>
  <div id="app">
    <Header />
    <div class="d-flex container flex-column content-box">
      <div class="flex-fill border-success card">
        <SubHeader title="Create Post" />
        <Button label="Back" route="/posts" />
        <div class="p-3">
          <form @submit.prevent="toCreateConfirm">
            <div class="w-75 m-auto">
              <div class="mb-4 m-auto row">
                <label
                  for="title"
                  class="required col-sm-3 col-form-label text-end"
                  >Title</label
                >
                <div class="col-sm-5">
                  <input
                    type="text"
                    Specify
                    the
                    id="title"
                    class="form-control"
                    v-model="title"
                  />
                  <div v-if="titleError" class="text-danger mt-1">
                    {{ titleError }}
                  </div>
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <label
                  for="description"
                  class="required col-sm-3 col-form-label text-end"
                  >Description</label
                >
                <div class="col-sm-5">
                  <textarea
                    id="description"
                    class="form-control"
                    v-model="description"
                    rows="4"
                  ></textarea>
                  <div v-if="descriptionError" class="text-danger mt-1">
                    {{ descriptionError }}
                  </div>
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <div class="col-sm-3"></div>
                <div class="col-sm-5">
                  <button class="btn bg-success">Create</button>&nbsp;
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="clearForm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePostsStore } from "../../../stores/posts";
import Header from "../../Layouts/Header.vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import Footer from "../../Layouts/Footer.vue";
import Button from "../../compos/Button.vue";

export default {
  components: {
    Header,
    SubHeader,
    Button,
    Footer,
  },

  setup() {
    const postsStore = usePostsStore();
    const router = useRouter();
    const title = ref("");
    const description = ref("");
    const titleError = ref("");
    const descriptionError = ref("");

    onMounted(() => {
      //showing post input value when click back button from confirm page
      title.value = postsStore.post.title;
      description.value = postsStore.post.description;
    });

    const state = reactive({
      post: [],
    });

    //go to create confirm page
    function toCreateConfirm() {
      titleError.value = "";
      descriptionError.value = "";

      if (!title.value) {
        titleError.value = "Title can't be blank.";
      }
      if (!description.value) {
        descriptionError.value = "Description can't be blank.";
      } else if (description.value.length > 255) {
        descriptionError.value = "255 characters is the maixmun allowed!";
      }
      if (title.value && description.value) {
        //set values to state.post to store in postsStore
        state.post.title = title.value;
        state.post.description = description.value;

        //set post in store to call from edit confirm page
        postsStore.setPost(state.post);
        router.push({ path: "/posts/create/confirm" });
      }
    }

    //reset form values
    const clearForm = () => {
      title.value = "";
      description.value = "";

      titleError.value = "";
      descriptionError.value = "";
    };

    return {
      title,
      titleError,
      description,
      descriptionError,
      toCreateConfirm,
      clearForm,
      state,
    };
  },
};
</script>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
}

.content-box {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  margin: 20px auto;
}

label {
  position: relative;
}

.required::after {
  content: "*";
  color: red;
  margin-left: 4px;
}
</style>
