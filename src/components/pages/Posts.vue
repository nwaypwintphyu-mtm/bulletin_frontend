<template>
  <div>
    <h1>This is in posts page</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = new useRouter();

    const logout = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/v1/sessions/1",
          {
            method: "DELETE",
          }
        );

        if (response.status === 200) {
          router.push({ path: "/login" });
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };
    return {
      logout,
    };
  },
};
</script>
