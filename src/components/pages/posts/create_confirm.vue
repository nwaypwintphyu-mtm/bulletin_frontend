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
                  <button class="btn bg-success">Confirm</button>&nbsp;
                  <button
                    type="button"
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
import { onMounted, ref } from "vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import Header from "../../Layouts/Header.vue";

import Footer from "../../Layouts/Footer.vue";

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { usePostsStore } from "../../../stores/posts";
import Button from "../../compos/Button.vue";

export default {
  components: {
    Header,
    SubHeader,
    Footer,
    Button,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = ref("");
    const description = ref("");
    const titleError = ref("");
    const descriptionError = ref("");
    const duplicateNameError = ref("");
    const postsStore = usePostsStore();

    onMounted(() => {
      title.value = route.query.title;
      description.value = route.query.description;
    });

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
        try {
          const response = await postsStore.createPost(params);
          if (response.status === 200) {
            router.push({ path: "/posts" });
          }
        } catch (error) {
          console.error("Error creating post:", error);
        }
      }
    }

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
      duplicateNameError,
      create,
      clearForm,
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
.error-box {
  border: 1px solid rgba(255, 0, 0, 0.43);
  background-color: rgba(255, 0, 0, 0.04);
}
</style>
