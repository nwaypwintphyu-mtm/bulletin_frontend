<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Forgot Password" />

      <div v-if="state.errorMessage" class="error-box p-2 text-start">
        {{ state.errorMessage }}
      </div>
      <div v-if="state.successMessage" class="success-box p-2 text-start">
        {{ state.successMessage }}
      </div>
      <Button label="Back" route="/" />

      <div class="card-body">
        <form @submit.prevent="forgot">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="email" class="col-sm-3 col-form-label">Email:</label>
              <div class="col-sm-9">
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
              <div class="col-sm-3"></div>
              <div class="col-sm-9">
                <button type="submit" class="btn bg-success col-5 my-2">
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
import { reactive, ref } from "vue";
import { useUsersStore } from "../../stores/users";
import { useToast } from "vue-toast-notification";
import SubHeader from "../Layouts/SubHeader.vue";
import Button from "../compos/Button.vue";

export default {
  components: {
    SubHeader,
    Button,
  },
  setup() {
    const usersStore = useUsersStore();
    const toast = useToast();
    const email = ref("");
    const state = reactive({
      errorMessage: "",
      successMessage: "",
    });
    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };
    async function forgot() {
      state.errorMessage = "";
      if (!email.value) {
        state.errorMessage = "Email can't be blank.";
      }
      if (!state.errorMessage) {
        const formData = new FormData();
        formData.append("email", email.value);
        try {
          const response = await usersStore.forgotPassword(formData);
          //if success, sent reset instructions
          if (response.status === 200) {
            state.successMessage =
              "Email sent with password reset instructions.";
          } else if (response.status === 404) {
            //if email doesnt exist
            state.errorMessage = "Email does not exist.";
          } else {
            showErrorToast("Failed to send reset email! Please try again...");
          }
        } catch (error) {
          showErrorToast("Failed to send reset email! Please try again...");
          console.error;
        }
      }
    }
    return {
      state,
      forgot,
      email,
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
</style>
