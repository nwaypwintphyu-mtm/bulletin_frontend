<template>
  <div id="app">
    <Header />
    <div class="d-flex container flex-column content-box">
      <div class="flex-fill border-success card">
        <SubHeader title="Edit Post" />
        <div
          v-if="state.message"
          class="alert error-box px-3 mb-2 alert-dismissible fade show"
          role="alert"
        >
          <div class="row justify-content-between px-5">
            <span>{{ state.message }}</span>
            <button
              @click="reloadPage"
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            >
              x
            </button>
          </div>
        </div>
        <Button label="Back" route="/posts" />
        <div class="p-3">
          <form @submit.prevent="toEditConfirm">
            <div class="w-75 m-auto">
              <div
                v-if="duplicateNameError"
                class="text-center error-box p-2 rounded w-100 text-danger my-2"
              >
                {{ duplicateNameError }}
              </div>
              <div class="mb-4 m-auto row">
                <label
                  for="title"
                  class="required col-sm-3 col-form-label text-end"
                  >Title</label
                >
                <div class="col-sm-5">
                  <input
                    type="text"
                    id="title"
                    class="form-control"
                    v-model="state.post.title"
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
                    v-model="state.post.description"
                    rows="4"
                  ></textarea>
                  <div v-if="descriptionError" class="text-danger mt-1">
                    {{ descriptionError }}
                  </div>
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <label
                  for="status"
                  class="mt-2 col-sm-3 col-form-label text-end"
                  >Status</label
                >
                <div class="col-sm-5">
                  <SwitchButton
                    :status="state.post.status"
                    @get-status="getSwtichValue"
                  />
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <div class="col-sm-3"></div>
                <div class="col-sm-5">
                  <button class="btn bg-success">Edit</button>&nbsp;
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
import { onMounted, reactive, ref } from "vue";
import { usePostsStore } from "../../../stores/posts";
import { useUsersStore } from "../../../stores/users";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Header from "../../Layouts/Header.vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import Footer from "../../Layouts/Footer.vue";
import SwitchButton from "../../compos/SwitchBtn.vue";
import Button from "../../compos/Button.vue";

export default {
  components: {
    Header,
    Footer,
    SubHeader,
    SwitchButton,
    Button,
  },

  setup() {
    const current_user = ref(null);
    const postsStore = usePostsStore();
    const usersStore = useUsersStore();
    const route = useRoute();
    const router = useRouter();
    const duplicateNameError = ref("");
    const titleError = ref("");
    const descriptionError = ref("");

    const state = reactive({
      post: {
        title: "",
        description: "",
        status: 0,
      },
      message: "", //message for invalid id entering from url
    });

    //showin posts and set current_user on mounted
    onMounted(() => {
      // get post
      loadPost();
      // set current user
      current_user.value = usersStore.current_user;
    });

    //get switch value from switch component
    const getSwtichValue = (switch_staus) => {
      state.post.status = switch_staus;
    };

    //get posts
    async function loadPost() {
      const postId = route.params.id; //to know current user and to retrieve posts according to role
      const response = await postsStore.getPostById(postId);
      if (response.status === 200) {
        const post = response.data;

        //if posts exists, set into state.posts
        if (post) {
          state.post.title = post.title;
          state.post.description = post.description;
          state.post.status = post.status;
          state.post.updated_user_id = current_user.value.id;
        }
      } else {
        // for entering invalid id
        state.message = "Post not found!";
      }
    }

    //go to edit confirm page
    function toEditConfirm() {
      titleError.value = "";
      descriptionError.value = "";

      if (!state.post.title) {
        titleError.value = "Title can't be blank.";
      }
      if (!state.post.description) {
        descriptionError.value = "Description can't be blank.";
      } else if (description.value.length > 255) {
        descriptionError.value = "255 characters is the maixmun allowed!";
      }

      if (!titleError.value && !descriptionError.value) {
        const params = {
          id: route.params.id,
        };
        postsStore.setPost(state.post);

        //route to confirm page
        router.push({ path: "/posts/edit/confirm", query: params });
      }
    }

    //reset form values
    function clearForm() {
      state.post.title = "";
      state.post.description = "";
      titleError.value = "";
      descriptionError.value = "";
    }

    return {
      state,
      titleError,
      descriptionError,
      toEditConfirm,
      clearForm,
      duplicateNameError,
      getSwtichValue,
    };
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-box {
  flex-grow: 1;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  margin: 50px auto;
}

label {
  position: relative;
}
.required::after {
  content: "*";
  color: red;
  margin-left: 4px;
}
.error-box {
  background-color: rgba(255, 0, 0, 0.133);
  color: rgb(201, 0, 0);
}
</style>
