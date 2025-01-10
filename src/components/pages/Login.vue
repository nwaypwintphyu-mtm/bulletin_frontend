<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <nav class="bg-success text-light p-3 text-start">
        <h6>Login</h6>
      </nav>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="email" class="col-sm-3 col-form-label">Email:</label>
              <div class="col-sm-9">
                <input
                  type=""
                  id="email"
                  class="form-control"
                  v-model="email"
                />
                <div v-if="state.emailError" class="text-danger mt-1">
                  {{ state.emailError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="password" class="col-sm-3 col-form-label"
                >Password:</label
              >
              <div class="col-sm-9">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                />
                <div v-if="state.passwordError" class="text-danger mt-1">
                  {{ state.passwordError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row align-items-center">
              <div class="col-sm-3"></div>
              <div class="col-sm-5">
                <input type="checkbox" id="rememberMe" v-model="rememberMe" />
                <label for="rememberMe" class="ms-2">Remember me</label>
              </div>
              <div class="col-md-4 text-end">
                <router-link to="/forgot" class="text-decoration-none">Forgotten password?</router-link>
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-sm-3"></div>
              <div class="col-sm-9">
                <button type="submit" class="btn btn-success w-100">
                  Login
                </button>
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-sm-3"></div>
              <div class="col-sm-9">
                <router-link to="/register" class="text-decoration-none">
                  Create account? <i class="fa fa-user"></i>
                </router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();
    const rememberMe = ref(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const state = reactive({
      emailError: "",
      emailFomatError: "",
      passwordError: "",
      allFieldError: "",
    });

    onMounted(() => {
      const savedEmail = localStorage.getItem("savedEmail");
      if (savedEmail) {
        email.value = savedEmail;
        rememberMe.value = true;
      }
    });

    async function login() {
      state.emailError = "";
      state.passwordError = "";
      state.allFieldError = "";

      if (!email.value) {
        state.emailError = "Email can't be blank";
      } else if (!emailPattern.test(email.value)) {
        state.emailError = "Email format is invalid";
      }
      if (!password.value) {
        state.passwordError = "Password can't be blank";
      }

      if (state.emailError || state.passwordError) {
        return;
      }

      try {
        const response = await fetch("http://localhost:3002/api/v1/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        if (response.status == 200) {
          if (rememberMe.value) {
            localStorage.setItem("savedEmail", email.value);
          } else {
            localStorage.removeItem("savedEmail");
          }
          router.push({ path: "/posts" });
        } else {
          const data = await response.json();
          errorMessage.value = data.error || "Login failed. Please try again.";
        }
      } catch (error) {
        errorMessage.value = error.message;
      }
    }

    return {
      email,
      password,
      login,
      state,
      rememberMe,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #e0e0e0;
}
</style>
