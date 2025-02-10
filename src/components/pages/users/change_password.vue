<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Change Password" />
      <Button label="Back" route="/users" />
      <div class="card-body">
        <form @submit.prevent="updatePassword">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="current_password" class="col-4 col-form-label"
                >Current password</label
              >
              <div class="col-8">
                <input
                  type="password"
                  id="current_password"
                  class="form-control"
                  v-model="current_password"
                />
                <div
                  v-if="state.current_passwordError"
                  class="text-danger mt-1"
                >
                  {{ state.current_passwordError }}
                </div>
              </div>
            </div>
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
                >New Confirm password</label
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
                <button class="btn bg-success w-100">Update Password</button>
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
import { useToast } from "vue-toast-notification";
import { useUsersStore } from "../../../stores/users";
import { useRouter } from "vue-router";
import SubHeader from "../../Layouts/SubHeader.vue";
import Button from "../../compos/Button.vue";

export default {
  components: {
    SubHeader,
    Button,
  },
  setup() {
    const router = useRouter();
    const current_password = ref("");
    const new_password = ref("");
    const new_confirm_password = ref("");
    const usersStore = useUsersStore();
    const toast = useToast();

    const state = reactive({
      current_passwordError: "",
      new_passwordError: "",
      new_confirm_passwordError: "",
      passwordMatchError: "",
    });

    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };

    async function updatePassword() {
      state.current_passwordError = "";
      state.new_confirm_passwordError = "";
      state.new_passwordError = "";
      state.passwordMatchError = "";

      if (!current_password.value) {
        state.current_passwordError = "Current password can't be blank.";
      }
      if (!new_password.value) {
        state.new_passwordError = "New password can't be blank.";
      }
      //check password pattern
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[^\s]+$/;
      if (new_password.value.length < 8) {
        state.new_passwordError = "Password must be at least 8 characters.";
      } else if (!passwordRegex.test(new_password.value)) {
        state.new_passwordError =
          "Password must include at least 1 uppercase letter, 1 number, and no spaces.";
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
        !state.current_passwordError &&
        !state.new_passwordError &&
        !state.new_confirm_passwordError &&
        !state.passwordMatchError
      ) {
        const formData = new FormData();
        formData.append("current_password", current_password.value);
        formData.append("new_password", new_password.value);
        try {
          const response = await usersStore.changePassword(formData);
          if (response.status === 200) {
            router.push({ name: "Users" });
          } else if (response.status === 401) {
            //if current password is wrong
            state.current_passwordError = "Current password is wrong!";
          } else {
            showErrorToast("Failed to change password!");
          }
        } catch (error) {
          console.error(error);
          showErrorToast("Failed to change password!");
        }
      }
    }
    return {
      state,
      updatePassword,
      current_password,
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
