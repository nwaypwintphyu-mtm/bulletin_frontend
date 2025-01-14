<template>
  <div id="app" class="d-flex container flex-column content-box">
    <div class="flex-fill border-success card">
      <SubHeader title="Edit Post" />
      <div class="p-3">
        <form @submit.prevent="edit">
          <div class="w-75 m-auto">
            <div
              v-if="duplicateNameError"
              class="text-center error-box p-2 rounded w-100 text-danger my-2"
            >
              {{ duplicateNameError }}
            </div>
            <div class="mb-4 m-auto row">
              <label for="title" class="col-sm-3 col-form-label text-end"
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
              <label for="description" class="col-sm-3 col-form-label text-end"
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
              <div class="col-sm-3"></div>
              <div class="col-sm-5">
                <button class="btn btn-success">Edit</button>&nbsp;
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
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import { usePostsStore } from "../../../stores/posts";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default {
  components: {
    SubHeader,
  },

  setup() {
    const postsStore = usePostsStore();
    const route = useRoute();
    const router = useRouter();
    const duplicateNameError = ref();

    const state = reactive({
      post: {
        title: "",
        description: "",
      },
    });

    const titleError = ref("");
    const descriptionError = ref("");

    onMounted(() => {
      loadPost();
    });

    async function loadPost() {
      const postId = route.params.id;
      const post = await postsStore.getPostById(postId);
      if (post) {
        state.post.title = post.title;
        state.post.description = post.description;
      }
    }

    async function edit() {
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
          post: state.post,
        };
        try {
          const response = await postsStore.updatePost(params);

          if (response.status === 200) {
            router.push({ path: "/posts" });
          } else if (response.status === 422) {
            duplicateNameError.value = "Post with this name already exist!";
          }
        } catch (error) {
          console.error("Error creating post:", error);
        }
      }
    }

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
      edit,
      clearForm,
      duplicateNameError,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  margin: 20px auto;
}

label {
  position: relative;
}
label::after {
  content: "*";
  color: red;
  margin-left: 4px;
}
.error-box {
  border: 1px solid rgba(255, 0, 0, 0.43);
  background-color: rgba(255, 0, 0, 0.04);
}
</style>
