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
            <a class="nav-link text-success" href="#">Users</a>
          </div>
          <div class="nav-item">
            <a class="nav-link text-success" href="#">Posts</a>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <div class="nav-item">
            <a class="nav-link text-success me-4" href="#">Create User</a>
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
              {{ user ? user.name : ""}}
              <i class="fa fa-user"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Profile</a>
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

export default {
  setup() {
    const router = useRouter();
    const user = ref(null);

    onMounted(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        user.value = JSON.parse(savedUser);
      }
    });

    const logout = async () => {
      try {
        const userId = user.value.id;
        const response = await fetch(
          `http://localhost:3002/api/v1/sessions/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 200) {
          localStorage.removeItem("user");
          router.push({ path: "/" });
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped>
</style>
