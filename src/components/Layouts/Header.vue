<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ps-3 pe-5">
    <a class="navbar-brand text-success fs-4" href="#">Bulletin_Board</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
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
              class="nav-link text-success dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ user ? user.name : "" }}
              <i class="fa fa-user"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <button class="dropdown-item" @click="toProfile">Profile</button>
              <button class="dropdown-item" @click="logout">Logout</button>
            </div>
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

export default {
  setup() {
    const router = useRouter();
    const user = ref(null);
    const usersStore = useUsersStore();

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

    async function logout() {
      const userId = user.value.id;
      try {
        const response = await usersStore.userLogout(userId);
        if (response.status === 200) {
          router.push({ name: "Login" });
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    function toProfile() {
      router.push({ name: "UserProfile" });
    }

    function toCreateUser() {
      router.push({ name: "Register" });
    }

    return {
      user,
      logout,
      toPost,
      toUser,
      toProfile,
      toCreateUser
    };
  },
};
</script>

<style scoped></style>
