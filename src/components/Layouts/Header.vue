<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ps-3 pe-5">
    <a class="navbar-brand text-success fs-4" href="#">Bulletin_Board</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse w-100" id="navbarSupportedContent">
      <div class="d-flex justify-content-between w-100">
        <div class="navbar-nav">
          <div class="nav-item">
            <a class="nav-link text-success" @click="toUser" href="#">Users</a>
          </div>
          <div class="nav-item">
            <a class="nav-link text-success" href="#" @click="toPost">Posts</a>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <div class="nav-item">
            <a class="nav-link text-success me-4" @click="toCreateUser" href="#"
              >Create User</a
            >
          </div>
          <div class="nav-item dropdown">
            <a
              class="nav-link text-success dropdown-toggle long-text"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-user"></i>
              {{ user ? user.name : "" }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <button class="dropdown-item" @click="toProfile">
                  Profile
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="logout">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../../stores/users";
import { useToast } from "vue-toast-notification";

export default {
  setup() {
    const router = useRouter();
    const user = ref(null);
    const usersStore = useUsersStore();
    const toast = useToast();

    onMounted(() => {
      const savedUser = usersStore.current_user;
      if (savedUser) {
        user.value = savedUser;
      }
    });

    const toPost = () => {
      router.push({ name: "Posts" });
    };

    const toUser = () => {
      router.push({ name: "Users" });
    };

    const showErrorToast = () => {
      toast.error("Logout failed! Please try again...", {
        duration: 5000,
      });
    };

    const logout = async () => {
      try {
        const userId = user.value.id;
        const response = await usersStore.userLogout(userId);
        if (response.status === 200) {
          router.push({ name: "Login" });
        } else {
          showErrorToast();
        }
      } catch (error) {
        console.error(error);
        showErrorToast();
      }
    };

    const toProfile = () => {
      router.push({ name: "UserProfile" });
    };

    const toCreateUser = () => {
      router.push({ name: "Register" });
    };

    return {
      user,
      logout,
      toPost,
      toUser,
      toProfile,
      toCreateUser,
      showErrorToast,
    };
  },
};
</script>

<style scoped>
.long-text {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
