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
import SubHeader from "../../Layouts/SubHeader.vue";
import Header from "../../Layouts/Header.vue";
import Footer from "../../Layouts/Footer.vue";
import { usePostsStore } from "../../../stores/posts";
import { useRouter } from "vue-router";

export default {
  components: {
    SubHeader,
    Header,
    Footer,
  },

  setup() {
    const postsStore = usePostsStore();
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

    onMounted(async () => {
      await fetchPosts();
    });

    const fetchPosts = async () => {
      await postsStore.getPosts();
      state.posts = postsStore.posts;
      state.filterPosts = state.posts;
      state.successMsg = postsStore.successMessage;
    };

    const totalPages = computed(() => {
      return Math.ceil(state.filterPosts.length / itemsPerPage);
    });

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return state.filterPosts.slice(start, start + itemsPerPage);
    });

    function setSelectedPost(post) {
      state.selectedPost = post;
      state.createUser = post.create_user["name"];
      state.updateUser = post.update_user["name"];
    }

    function reloadPage() {
      location.reload();
    }

    async function deletePost(id) {
      try {
        const response = await postsStore.deletePost(id);
        if (response.status == 200) {
          state.successMsg = "Post deleted successfully!";
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }

    function search() {
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
    }
    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }
    function goToPage(page) {
      currentPage.value = page;
    }
    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }

    function toCreatePage() {
      router.push({ path: "/posts/create" });
    }
    function toEditPage(postId) {
      router.push({ path: `/posts/edit/${postId}` });
    }
    function toUpload() {
      router.push({ name: "PostsUpload" });
    }
    async function downloadCsv() {
      try {
        const response = await postsStore.downloadPosts();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();

        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);

        link.href = url;
        link.setAttribute("download", "posts.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading posts:", error);
        throw error;
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
      reloadPage,
      toUpload,
      downloadCsv,
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
