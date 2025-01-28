<template>
  <div id="app">
    <Header />
    <div class="d-flex container flex-column content-box">
      <div class="flex-fill border-success card">
        <SubHeader title="Edit Post" />
        <div class="p-3">
          <form @submit.prevent="editPost">
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
                    id="title"
                    class="form-control"
                    v-model="state.post.title"
                    readonly
                  />
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
                    readonly
                  ></textarea>
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <label
                  for="status"
                  class="mt-2 col-sm-3 col-form-label text-end"
                  >Status</label
                >
                <div class="col-sm-5">
                  <SwitchButton :status="state.post.status" :disable="true" />
                </div>
              </div>
              <div class="mb-4 m-auto row">
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                  <button class="btn bg-success">Confirm</button>&nbsp;
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="postEditCancel"
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
import { onMounted, reactive } from "vue";
import { usePostsStore } from "../../../stores/posts";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import SwitchButton from "../../compos/SwitchBtn.vue";
import Header from "../../Layouts/Header.vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import Footer from "../../Layouts/Footer.vue";

export default {
  components: {
    Header,
    SubHeader,
    Footer,
    SwitchButton,
  },

  setup() {
    const postsStore = usePostsStore();
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      post: [],
      message: "",
    });

    //showing post from edit page
    onMounted(() => {
      if (postsStore.post) {
        state.post = postsStore.post;
      } else {
        showErrorToast("Failed to update post! Please try again...");
      }
    });

    //showing error 
    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };


    //edit post 
    async function editPost() {
      //set post id and updated post in param
      const params = {
        id: route.query.id,
        post: state.post,
      };
      try {
        const response = await postsStore.updatePost(params);
        //if update success, go to post list page
        if (response.status === 200) {
          router.push({ path: "/posts" });
        }
        //if fail, show toast
         else {
          showErrorToast("Failed to update post! Please try again...");
        }
      } catch (error) {
        showErrorToast("Failed to update post! Please try again...");
      }
    }

    //when clicking cancel button, go to edit post page
    function postEditCancel() {
      router.push({ path: `/posts/edit/${route.query.id}` });
    }

    return {
      state,
      editPost,
      showErrorToast,
      postEditCancel,
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
  background-color: rgba(255, 0, 0, 0.133);
  color: rgb(201, 0, 0);
}
</style>
