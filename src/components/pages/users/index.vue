<template>
  <div id="app">
    <Header />
    <div class="d-flex container-fluid flex-column content-box">
      <div class="border-success card">
        <SubHeader title="User List" />
        <div
          v-if="state.deleteSuccessMsg"
          class="alert msg-box px-3 mb-2 alert-dismissible fade show"
          role="alert"
        >
          <div class="row justify-content-between px-5">
            <span>{{ state.deleteSuccessMsg }}</span>
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
              @click="removeMsg"
              data-bs-dismiss="alert"
              aria-label="Close"
            >
              x
            </button>
          </div>
        </div>
        <div class="p-3">
          <div class="row mb-3">
            <div class="col-md-3 row align-items-center">
              <div class="col-2">
                <label for="">Name:</label>
              </div>
              <div class="col-9">
                <input type="text" class="form-control" v-model="nameSearch" />
              </div>
            </div>
            <div class="col-md-3 row align-items-center">
              <div class="col-2">
                <label for="">Email:</label>
              </div>
              <div class="col-9">
                <input type="text" class="form-control" v-model="emailSearch" />
              </div>
            </div>
            <div class="col-md-3 row align-items-center">
              <div class="col-2">
                <label for="">From:</label>
              </div>
              <div class="col-9">
                <DatePicker @date-selected="getFromDate" />
              </div>
            </div>

            <div class="col-md-3 row align-items-center">
              <div class="col-2">
                <label for="">To:</label>
              </div>
              <div class="col-8">
                <DatePicker @date-selected="getToDate" />
              </div>
              <div class="col-1">
                <button class="btn bg-success" @click="search">Search</button>
              </div>
            </div>
          </div>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created User</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Created_date</th>
                <th>Updated_date</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in paginatedUsers" :key="user.id">
                <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                <td id="userNameLink">
                  <a
                    data-toggle="modal"
                    data-target="#userDetailModal"
                    @click="setSelectedUser(user)"
                    class="text-success text-decoration-none"
                    role="button"
                  >
                    {{ user.name }}
                  </a>
                  <div
                    class="modal fade"
                    id="userDetailModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="userDetailModalTitle"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content p-3">
                        <div class="modal-header">
                          <h6
                            class="modal-title col-md-11"
                            id="exampleModalLongTitle"
                          >
                            User Detail
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
                          <div class="row">
                            <div class="w-25">
                              <img
                                v-if="state.selectedUser.profile"
                                :src="apiUrl + state.selectedUser.profile.url"
                                alt="Profile Image"
                                class="img-fluid rounded"
                                style="max-width: 100px; height: auto"
                              />
                            </div>

                            <table class="table w-75">
                              <tbody>
                                <tr>
                                  <td><b>Name</b></td>
                                  <td class="">
                                    {{ state.selectedUser.name }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Type</b></td>
                                  <td class="">
                                    <span v-if="state.selectedUser.role == 1"
                                      >User</span
                                    >
                                    <span v-if="state.selectedUser.role == 0"
                                      >Admin</span
                                    >
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Email</b></td>
                                  <td class="">
                                    {{ state.selectedUser.email }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Phone</b></td>
                                  <td class="">
                                    {{ state.selectedUser.phone }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Date of Birth</b></td>
                                  <td class="">
                                    {{ formatDate(state.selectedUser.dob) }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Address</b></td>
                                  <td class="">
                                    {{ state.selectedUser.address }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Created Date</b></td>
                                  <td class="">
                                    {{
                                      formatDate(state.selectedUser.created_at)
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Created User</b></td>
                                  <td class="">
                                    {{ state.selectedUser.create_user_name }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Updated Date</b></td>
                                  <td class="">
                                    {{
                                      formatDate(state.selectedUser.updated_at)
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Updated User</b></td>
                                  <td class="">
                                    {{ state.selectedUser.updated_user_name }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
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
                <td>{{ user.email }}</td>
                <td>{{ user.create_user_name }}</td>
                <td v-if="user.role == 0">Admin</td>
                <td v-else>User</td>
                <td>{{ user.phone }}</td>
                <td>{{ formatDate(user.dob) }}</td>
                <td>{{ user.address }}</td>
                <td>{{ formatDate(user.created_at) }}</td>
                <td>{{ formatDate(user.updated_at) }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    @click="setSelectedUser(user)"
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
                          <div><h5>Are you sure to delete User?</h5></div>
                          <table class="table">
                            <tbody>
                              <tr>
                                <td><b>ID</b></td>
                                <td class="text-danger">
                                  {{ state.selectedUser.id }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Name</b></td>
                                <td class="text-danger">
                                  {{ state.selectedUser.name }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Type</b></td>
                                <td class="text-danger">
                                  <span v-if="state.selectedUser.role == 0">
                                    Admin
                                  </span>
                                  <span v-else>User</span>
                                </td>
                              </tr>
                              <tr>
                                <td><b>Email</b></td>
                                <td class="text-danger">
                                  {{ state.selectedUser.email }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Phone</b></td>
                                <td class="text-danger">
                                  {{ state.selectedUser.phone }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Date of Birth</b></td>
                                <td class="text-danger">
                                  {{ formatDate(state.selectedUser.dob) }}
                                </td>
                              </tr>
                              <tr>
                                <td><b>Address</b></td>
                                <td class="text-danger">
                                  {{ state.selectedUser.address }}
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
                            @click="deleteUser(state.selectedUser.id)"
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
              class="btn bg-success"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <button
              class="btn bg-success"
              v-for="page in totalPages"
              :key="page"
              @click="gotoPage(page)"
              :disabled="currentPage === page"
              :class="currentPage === page ? 'bg-dark-green' : 'bg-success'"
            >
              {{ page }}
            </button>
            <button
              class="btn bg-success"
              @click="nextPage"
              :disabled="currentPage === totalPages"
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
import { reactive, onMounted, ref, computed } from "vue";
import { useUsersStore } from "../../../stores/users";
import { useToast } from "vue-toast-notification";
import SubHeader from "../../Layouts/SubHeader.vue";
import Header from "../../Layouts/Header.vue";
import Footer from "../../Layouts/Footer.vue";
import DatePicker from "../../compos/DatePicker.vue";

export default {
  components: {
    SubHeader,
    Header,
    Footer,
    DatePicker,
  },

  setup() {
    const usersStore = useUsersStore();
    const nameSearch = ref("");
    const emailSearch = ref("");
    const fromDate = ref(null);
    const toDate = ref(null);
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const toast = useToast();
    const apiUrl = import.meta.env.VITE_API_URL;

    const state = reactive({
      users: [],
      filterUsers: [],
      selectedUser: "",
      deleteSuccessMsg: "",
      successMsg: "",
    });

    onMounted(async () => {
      await fetchUsers();
      state.filterUsers = state.users;
      state.successMsg = usersStore.successMessage;
    });

    //formatting date like yy/mm/dd
    function formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    }

    //get from date from datepicker
    function getFromDate(date) {
      fromDate.value = date;
    }

    //get to date from datepicker
    function getToDate(date) {
      toDate.value = date;
    }

    //totalpages for pagination
    const totalPages = computed(() => {
      return Math.ceil(state.filterUsers.length / itemsPerPage);
    });

    //users in one page
    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return state.filterUsers.slice(start, start + itemsPerPage);
    });

    //go to prev page in pagination
    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    //go to next page in pagination
    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }

    //number button in pagination
    function gotoPage(page) {
      currentPage.value = page;
    }

    //filtered users
    function search() {
      if (
        !nameSearch.value &&
        !emailSearch.value &&
        !fromDate.value &&
        !toDate.value
      ) {
        state.filterUsers = state.users;
        return;
      }
      state.filterUsers = state.users.filter((user) => {
        const nameMatch = nameSearch.value
          ? user.name.toLowerCase().includes(nameSearch.value.toLowerCase())
          : true;

        const emailMatch = emailSearch.value
          ? user.email.toLowerCase().includes(emailSearch.value.toLowerCase())
          : true;

        const fromDateMatch = fromDate.value
          ? new Date(user.created_at) >= new Date(fromDate.value)
          : true;

        const toDateMatch = toDate.value
          ? new Date(user.created_at) <= new Date(toDate.value)
          : true;

        //filter users according to name , emial, from , to matches
        return nameMatch && emailMatch && fromDateMatch && toDateMatch;
      });
    }

    //set selected user for delete user modal
    function setSelectedUser(selectedUser) {
      state.selectedUser = selectedUser;
    }

    //show error
    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };

    //remove success message after show once
    function removeMsg() {
      usersStore.successMessage = "";
    }

    //delete user according to id
    async function deleteUser(id) {
      try {
        const response = await usersStore.deleteUser(id);
        if (response.status === 200) {
          state.deleteSuccessMsg = response.message;

          state.users = state.users.filter((user) => user.id !== id);
          state.filterUsers = state.filterUsers.filter((user) => user.id != id);
        } else {
          showErrorToast("Failed to delete user! Please try again...");
        }
      } catch (error) {
        console.error(error);
        showErrorToast("Failed to delete user! Please try again...");
      }
    }

    //get users
    async function fetchUsers() {
      try {
        const response = await usersStore.getUsers();
        if (response.status === 200) {
          state.users = usersStore.users;
        } else {
          showErrorToast("Failed to load users! Please try again...");
        }
      } catch (error) {
        console.error(error);
        showErrorToast("Failed to load users! Please try again...");
      }
    }

    return {
      state,
      formatDate,
      setSelectedUser,
      deleteUser,
      fromDate,
      toDate,
      getFromDate,
      getToDate,
      search,
      nameSearch,
      emailSearch,
      totalPages,
      paginatedUsers,
      currentPage,
      prevPage,
      nextPage,
      gotoPage,
      showErrorToast,
      apiUrl,
      itemsPerPage,
      removeMsg,
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
  margin-top: 10px;
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

.table td#userNameLink {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  margin-right: 5px;
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
