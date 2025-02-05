<template>
  <div id="app">
    <Header />
    <div class="d-flex container flex-column content-box">
      <div class="flex-fill border-success card">
        <SubHeader title="Create Post" />
        <Button label="Back" route="/posts/create" />
        <div class="p-3">
          <form @submit.prevent="create">
            <div class="w-75 m-auto">
              <div class="mb-4 m-auto row">
                <label
                  for="title"
                  class="required col-3 col-form-label text-end"
                  >Title</label
                >
                <div class="col-5">
                  <input
                    type="text"
                    Specify
                    the
                    id="title"
                    class="form-control"
                    v-model="title"
                    readonly
                  />
                  <div v-if="titleError" class="text-danger mt-1">
                    {{ titleError }}
                  </div>
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <label
                  for="description"
                  class="required col-3 col-form-label text-end"
                  >Description</label
                >
                <div class="col-5">
                  <textarea
                    id="description"
                    class="form-control"
                    v-model="description"
                    rows="4"
                    readonly
                  ></textarea>
                  <div v-if="descriptionError" class="text-danger mt-1">
                    {{ descriptionError }}
                  </div>
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <div class="col-3"></div>
                <div class="col-5">
                  <button class="btn bg-success">Confirm</button>&nbsp;
                  <button
                    type="reset"
                    class="btn btn-secondary"
                    @click="clearForm"
                  >
                    Cancel
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
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { usePostsStore } from "../../../stores/posts";
import { useToast } from "vue-toast-notification";
import SubHeader from "../../Layouts/SubHeader.vue";
import Header from "../../Layouts/Header.vue";
import Footer from "../../Layouts/Footer.vue";
import Button from "../../compos/Button.vue";

export default {
  components: {
    Header,
    SubHeader,
    Footer,
    Button,
  },

  setup() {
    const postsStore = usePostsStore();
    const router = useRouter();
    const toast = useToast();
    const title = ref("");
    const description = ref("");
    const titleError = ref("");
    const descriptionError = ref("");

    onMounted(() => {
      //showing post input value from create page
      title.value = postsStore.post.title;
      description.value = postsStore.post.description;
    });

    const state = reactive({
      post: [],
    });

    //showing error
    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };

    //create post
    async function create() {
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
        const params = {
          title: title.value,
          description: description.value,
        };

        state.post.title = title.value;
        state.post.description = description.value;
        //set post to store
        postsStore.setPost(state.post);

        try {
          const response = await postsStore.createPost(params);
          // if create success, go to post list page
          if (response.status === 200) {
            postsStore.setPost(null); //clear form after create one post
            router.push({ path: "/posts" });
          } else {
            //if failed, showing toast
            showErrorToast("Failed to create post! Please try again...");
          }
        } catch (error) {
          //if failed, showing toast
          console.error(error);
          showErrorToast("Failed to create post! Please try again...");
        }
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
      create,
      clearForm,
      showErrorToast,
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
