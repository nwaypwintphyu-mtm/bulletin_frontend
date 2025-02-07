<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Login" />
      <div v-if="errorMessage" class="error-box p-3 text-start">
        {{ errorMessage }}
      </div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="email" class="col-3 col-form-label">Email:</label>
              <div class="col-9">
                <input
                  type="email"
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
              <label for="password" class="col-3 col-form-label"
                >Password:</label
              >
              <div class="col-9">
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
              <div class="col-3"></div>
              <div class="col-4">
                <input type="checkbox" id="rememberMe" v-model="rememberMe" />
                <label for="rememberMe" class="m-2">Remember me</label>
              </div>
              <div class="col-5 text-end">
                <router-link
                  to="/forgot"
                  class="text-decoration-none text-primary"
                  >Forgotten password?</router-link
                >
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-3"></div>
              <div class="col-9">
                <button type="submit" class="btn bg-success w-100">
                  Login
                </button>
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
import { useUsersStore } from "../../stores/users";
import { useToast } from "vue-toast-notification";
import SubHeader from "../Layouts/SubHeader.vue";

export default {
  components: {
    SubHeader,
  },
  setup() {
    const email = ref("");
    const current_user = ref(null);
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();
    const rememberMe = ref(false);
    const usersStore = useUsersStore();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const toast = useToast();

    const state = reactive({
      emailError: "",
      passwordError: "",
    });

    onMounted(() => {
      //if remembered checked auto filled email and password
      const savedEmail = localStorage.getItem("savedEmail");
      const savedPassword = localStorage.getItem("savedPassword");
      current_user.value = useUsersStore.current_user;

      if (savedEmail && savedPassword) {
        email.value = savedEmail;
        password.value = savedPassword;
        rememberMe.value = true;
      }
    });

    //show error
    const showErrorToast = () => {
      toast.error("Login failed! Please try again..", {
        duration: 5000,
      });
    };

    //login
    async function login() {
      state.emailError = "";
      state.passwordError = "";

      if (!email.value) {
        state.emailError = "Email can't be blank";
      } else if (!emailPattern.test(email.value)) {
        state.emailError = "Email format is invalid";
      }

      if (!password.value) {
        state.passwordError = "Password can't be blank";
      }

      if (!state.emailError && !state.passwordError) {
        const params = {
          email: email.value,
          password: password.value,
        };
        try {
          const response = await usersStore.userLogin(params);

          if (response.status === 200) {
            if (rememberMe.value) {
              localStorage.setItem("savedEmail", email.value);
              localStorage.setItem("savedPasswrod", password.value);
            } else {
              localStorage.removeItem("savedEmail");
              localStorage.removeItem("savedPassword");
            }
            router.push({ path: "/posts" });
          } else {
            errorMessage.value = "Incorrect email or password!";
          }
        } catch (error) {
          console.error(error);
          showErrorToast();
        }
      }
    }

    return {
      email,
      password,
      login,
      state,
      rememberMe,
      errorMessage,
      showErrorToast,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #e0e0e0;
}
.error-box {
  background-color: rgba(255, 0, 0, 0.133);
  color: rgb(201, 0, 0);
}
</style>
