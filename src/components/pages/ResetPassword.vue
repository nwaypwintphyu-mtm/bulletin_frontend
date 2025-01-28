<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Reset Password" />
      <div v-if="state.successMessage" class="success-box p-2 text-start">
        {{ state.successMessage }}
      </div>
      <Button label="Back" route="/users" />
      <div class="card-body">
        <form @submit.prevent="resetPassword">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="new_password" class="col-4 col-form-label"
                >New password</label
              >
              <div class="col-8">
                <input
                  type="password"
                  id="new_password"
                  class="form-control"
                  v-model="new_password"
                />
                <div v-if="state.new_passwordError" class="text-danger mt-1">
                  {{ state.new_passwordError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="new_confirm_password" class="col-4 col-form-label"
                >Confirm password</label
              >
              <div class="col-8">
                <input
                  type="password"
                  id="new_confirm_password"
                  class="form-control"
                  v-model="new_confirm_password"
                />
                <div
                  v-if="state.new_confirm_passwordError"
                  class="text-danger mt-1"
                >
                  {{ state.new_confirm_passwordError }}
                </div>
                <div v-if="state.passwordMatchError" class="text-danger mt-1">
                  {{ state.passwordMatchError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-4"></div>
              <div class="col-8">
                <button class="btn bg-success w-100" @click="updatePassword">
                  Reset Password
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
import { useUsersStore } from "../../stores/users";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import SubHeader from "../Layouts/SubHeader.vue";
import Button from "../compos/Button.vue";

export default {
  components: {
    SubHeader,
    Button,
  },
  setup() {
    const route = useRoute();
    const toast = useToast();
    const new_password = ref("");
    const new_confirm_password = ref("");
    const usersStore = useUsersStore();
    const token = ref("");

    //set token from url
    onMounted(() => {
      token.value = route.params.token;
    });

    const state = reactive({
      new_passwordError: "",
      new_confirm_passwordError: "",
      passwordMatchError: "",
      successMessage: "",
    });

    //show error
    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };

    //update password
    async function updatePassword() {
      state.new_confirm_passwordError = "";
      state.new_passwordError = "";
      state.passwordMatchError = "";
      if (!new_password.value) {
        state.new_passwordError = "New password can't be blank.";
      }
      if (!new_confirm_password.value) {
        state.new_confirm_passwordError =
          "New confirm password can't be blank.";
      }

      if (new_password.value != new_confirm_password.value) {
        state.passwordMatchError =
          "New password and New confirm password confirmaiton is not match.";
      }
      if (
        !state.new_passwordError &&
        !state.new_confirm_passwordError &&
        !state.passwordMatchError
      ) {
        const formData = new FormData();
        formData.append("token", token.value);
        formData.append("new_password", new_password.value);
        try {
          const response = await usersStore.resetPassword(formData);
          //if success show success message
          if (response.status === 200) {
            state.successMessage = response.message;
          } else {
            //if failed, show toast
            showErrorToast("Failed to reset password! Please try again...");
          }
        } catch (error) {
          showErrorToast("Failed to reset password! Please try again...");
        }
      }
    }
    return {
      state,
      updatePassword,
      new_password,
      new_confirm_password,
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
.success-box {
  background-color: rgba(145, 255, 0, 0.133);
  color: rgb(70, 201, 0);
}

label::after {
  content: " *";
  color: red;
}
</style>
