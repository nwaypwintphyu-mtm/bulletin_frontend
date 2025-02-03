<template>
  <div id="app">
    <Header />
    <div class="d-flex container-fluid flex-column content-box">
      <div class="border-success card">
        <SubHeader title="Post List" />
        <div
          v-if="state.successMsg"
          class="alert msg-box px-3 mb-2 alert-dismissible fade show"
          role="alert"
        >
          <div class="row justify-content-between px-5">
            <span>{{ state.successMsg }}</span>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            >
              x
            </button>
          </div>
        </div>

        <div class="p-3">
          <div class="row mb-2 mx-1 justify-content-end">
            Keyword:
            <div class="col-md-3">
              <input type="text" v-model="searchText" class="form-control" />
            </div>
            <div class="btn bg-success col-md-1" @click="search">Search</div>
            <div class="btn bg-success col-md-1" @click="toCreatePage">
              Create
            </div>
            <div class="btn bg-success col-md-1" @click="toUpload">Upload</div>
            <div class="btn bg-success col-md-1" @click="downloadCsv">
              Download
            </div>
          </div>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Post Title</th>
                <th>Post Description</th>
                <th>Posted User</th>
                <th>Posted Date</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in paginatedPosts" :key="post.id">
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#postDetailModal"
                    @click="setSelectedPost(post)"
                    class="text-success text-decoration-none"
                    role="button"
                  >
                    {{ post.title }}
                  </a>
                  <div
                    class="modal fade"
                    id="postDetailModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="postDetailModalTitle"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h6
                            class="modal-title col-md-11"
                            id="exampleModalLongTitle"
                          >
                            Post Detail
                          </h6>
                          <button
                            type="button"
                            class="close btn btn-none text-end"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <table class="table">
                            <tbody>
                              <tr>
                                <td><b>Title</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.title }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Description</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.description }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Status</b></td>
                                <td class="text-danger">
                                  <span v-if="state.selectedPost.status == 1"
                                    >Active</span
                                  >
                                  <span v-if="state.selectedPost.status == 0"
                                    >Inactive</span
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td><b>Created Date</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.created_at }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Created User</b></td>
                                <td class="text-danger">
                                  {{ state.createUser }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Updated Date</b></td>
                                <td class="text-danger">
                                  {{
                                    formatDate(state.selectedPost.updated_at)
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Updated User</b></td>
                                <td class="text-danger">
                                  {{ state.updateUser }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-sm btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ post.description }}</td>
                <td>
                  {{ post.create_user["name"] }}
                </td>
                <td>{{ formatDate(post.created_at) }}</td>
                <td>
                  <button
                    id="edit"
                    class="btn btn-primary btn-sm"
                    @click="toEditPage(post.id)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    @click="setSelectedPost(post)"
                  >
                    Delete
                  </button>
                  <div
                    class="modal fade"
                    id="exampleModalCenter"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h6
                            class="modal-title col-md-11"
                            id="exampleModalLongTitle"
                          >
                            Delete Confirm
                          </h6>
                          <button
                            type="button"
                            class="close btn btn-none text-end"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div><h5>Are you sure to delete post?</h5></div>
                          <table class="table">
                            <tbody>
                              <tr>
                                <td><b>ID</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.id }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Title</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.title }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Description</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.description }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Status</b></td>
                                <td class="text-danger">
                                  <span v-if="state.selectedPost.status == 1">
                                    Active
                                  </span>
                                  <span v-else>Inactive</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-sm btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            @click="deletePost(state.selectedPost.id)"
                            class="btn btn-sm btn-danger"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <button
              @click="prevPage"
              class="bg-success"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :disabled="currentPage === page"
              :class="currentPage === page ? 'bg-dark-green' : 'bg-success'"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="bg-success"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { usePostsStore } from "../../../stores/posts";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import SubHeader from "../../Layouts/SubHeader.vue";
import Header from "../../Layouts/Header.vue";
import Footer from "../../Layouts/Footer.vue";

export default {
  components: {
    Header,
    SubHeader,
    Footer,
  },

  setup() {
    const postsStore = usePostsStore();
    const toast = useToast();
    const router = useRouter();
    const searchText = ref("");
    const itemsPerPage = 6;
    const currentPage = ref(1);

    const state = reactive({
      posts: [],
      filterPosts: [],
      successMsg: "",
      selectedPost: "",
      createUser: "",
      updateUser: "",
    });

    //showing posts on mounted
    onMounted(async () => {
      await fetchPosts();
    });

    //error toast to handle error
    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };

    //total page for pagination
    const totalPages = computed(() => {
      return Math.ceil(state.filterPosts.length / itemsPerPage);
    });

    //posts in one page
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return state.filterPosts.slice(start, start + itemsPerPage);
    });

    //next button in pagination
    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }

    //number buttons in pagination
    function goToPage(page) {
      currentPage.value = page;
    }

    //previous button in pagination
    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    //get all posts from store
    const fetchPosts = async () => {
      try {
        const response = await postsStore.getPosts();
        if (response.status === 200) {
          state.posts = response.data;
          state.filterPosts = state.posts;
          state.successMsg = postsStore.successMessage; //for showing success message from post store
        } else {
          showErrorToast("Failed to load posts! Please try again...");
        }
      } catch (error) {
        showErrorToast("Failed to load posts! Please try again...");
        console.error;
      }
    };

    //set selected post for edit, delete modal
    function setSelectedPost(post) {
      state.selectedPost = post;
      state.createUser = post.create_user["name"];
      state.updateUser = post.update_user["name"];
    }

    //delete post in deleted modal
    async function deletePost(id) {
      try {
        const response = await postsStore.deletePost(id);
        if (response.status == 200) {
          state.successMsg = response.message;
          // fix dynamic post deletion update
          state.posts = state.posts.filter((post) => post.id !== id);
          state.filterPosts = state.filterPosts.filter(
            (post) => post.id !== id
          );

          // if there are no posts in the current page, go to the previous page
          if (paginatedPosts.value.length === 0 && currentPage.value > 1) {
            currentPage.value--;
          }
        } else {
          showErrorToast("Failed to delete post! Please try again...");
        }
      } catch (error) {
        showErrorToast("Failed to delete post! Please try again...");
        console.error;
      }
    }

    //filtering posts with keyword
    const search = () => {
      if (!searchText.value) {
        state.filterPosts = state.posts;
      } else {
        state.filterPosts = state.posts.filter((post) => {
          const titleMatch = post.title
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
          const descriptionMatch = post.description
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
          const createUserMatch = post.create_user["name"]
            .toLowerCase()
            .includes(searchText.value.toLowerCase());

          return titleMatch || descriptionMatch || createUserMatch;
        });
      }
    };

    //formattiong date like y/m/d
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }

    //route to create page
    function toCreatePage() {
      router.push({ path: "/posts/create" });
    }

    //route to edit page with post id
    function toEditPage(postId) {
      router.push({ path: `/posts/edit/${postId}` });
    }

    //route to upload page
    function toUpload() {
      router.push({ name: "PostsUpload" });
    }

    //downloading posts csv
    async function downloadCsv() {
      try {
        const response = await postsStore.downloadPosts();
        if (response.status === 200) {
          const blob = await response.data; //post binary data with csv

          const link = document.createElement("a");

          const url = window.URL.createObjectURL(blob); //make url to download

          link.href = url;

          link.setAttribute("download", "posts.csv");

          document.body.appendChild(link);

          link.click();

          document.body.removeChild(link);

          window.URL.revokeObjectURL(url);
        } else {
          showErrorToast("Failed to download posts! Please try again...");
        }
      } catch (error) {
        showErrorToast("Failed to download posts! Please try again...");
        console.error;
      }
    }

    return {
      state,
      toCreatePage,
      paginatedPosts,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      goToPage,
      formatDate,
      toEditPage,
      setSelectedPost,
      deletePost,
      search,
      searchText,
      toUpload,
      downloadCsv,
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

.table {
  overflow: hidden;
}

.table th {
  background-color: #5aa300ac;
  color: white;
}

.table td {
  vertical-align: middle;
}

.btn {
  margin-right: 5px;
}
.content-box {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  margin: 20px auto;
}

.msg-box {
  background-color: rgba(145, 255, 0, 0.133);
  color: rgb(70, 201, 0);
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  cursor: not-allowed;
}
.bg-dark-green {
  background-color: #5aa300ac;
  color: white;
}
</style>
