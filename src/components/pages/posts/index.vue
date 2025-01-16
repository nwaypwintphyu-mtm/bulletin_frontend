<template>
  <div>
    <Header />
    <div class="d-flex container flex-column content-box">
      <div class="border-success card">
        <SubHeader title="Post List" />
        <div v-if="state.successMsg" class="msg-box p-3 text-start">
          {{ state.successMsg }}
        </div>
        <div class="p-3">
          <div class="row m-2">
            <div class="col-md-3">
              <input type="text" v-model="searchText" class="form-control" />
            </div>
            <div class="btn bg-success col-md-1" @click="search">Search</div>
            <div class="btn bg-success col-md-1" @click="toCreatePage">
              Create
            </div>
            <div class="btn bg-success col-md-1">Upload</div>
            <div class="btn bg-success col-md-1">Download</div>
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
                                  {{ state.selectedPost.user_name }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Updated Date</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.updated_at }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Updated User</b></td>
                                <td class="text-danger">
                                  {{ state.selectedPost.user_name }}
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
                <td>{{ post.create_user_id }}</td>
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
                                  {{ state.selectedPost.status }}
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
              :disabled="currentPage.value === 1"
            >
              Previous
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :disabled="currentPage.value === page"
              :class="
                currentPage.value === page ? 'bg-dark-green' : 'bg-success'
              "
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage.value === totalPages"
              class="bg-success"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import Header from "../../Layouts/Header.vue";
import { usePostsStore } from "../../../stores/posts";
import { useRouter } from "vue-router";

export default {
  components: {
    SubHeader,
    Header,
  },

  setup() {
    const postsStore = usePostsStore();
    const router = useRouter();
    const searchText = ref("");
    const userRole = localStorage.getItem("user");

    const state = reactive({
      posts: [],
      filteredPosts: [],
      successMsg: "",
      selectedPost: "",
    });

    const itemsPerPage = 8;
    const currentPage = reactive({ value: 1 });

    onMounted(async () => {
      await fetchPosts();
    });

    const fetchPosts = async () => {
      await postsStore.getPosts();
      state.posts = postsStore.posts.filter((post) => post.deleted_at === null);
      state.filteredPosts = state.posts;
      state.successMsg = postsStore.successMessage;
    };

    const totalPages = computed(() => {
      return Math.ceil(state.posts.length / itemsPerPage);
    });

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return state.filteredPosts.slice(start, start + itemsPerPage);
    });

    function setSelectedPost(post) {
      state.selectedPost = post;
    }

    function closeModal() {
      location.reload();
    }

    function deletePost(id) {
      closeModal();

      try {
        const response = postsStore.deletePost(id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }

    function search() {
      if (!searchText.value) {
        state.filteredPosts = state.posts;
      } else {
        state.filteredPosts = state.posts.filter((post) => {
          const titleMatch = post.title
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
          const descriptionMatch = post.description
            .toLowerCase()
            .includes(searchText.value.toLowerCase());

          return titleMatch || descriptionMatch;
        });
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
      closeModal,
      search,
      searchText,
    };
  },
};
</script>

<style scoped>
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
  background-color: rgba(0, 255, 128, 0.133);
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
