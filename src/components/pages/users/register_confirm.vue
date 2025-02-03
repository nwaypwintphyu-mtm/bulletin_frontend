<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Register Confirm" />
      <div
        v-if="duplicateError"
        class="alert msg-box px-3 mb-2 alert-dismissible fade show"
        role="alert"
      >
        <div class="row justify-content-between px-5">
          <span>{{ duplicateError }}</span>
          <button
            @click="reloadPage"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            x
          </button>
        </div>
      </div>
      <Button label="Back" route="/register" />
      <div class="card-body">
        <form @submit.prevent="Register" enctype="multipart/form-data">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="name" class="required col-4 col-form-label"
                >Name</label
              >
              <div class="col-8">
                <input id="name" class="form-control" v-model="name" readonly />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="email" class="required col-4 col-form-label"
                >E-Mail Address</label
              >
              <div class="col-8">
                <input
                  id="email"
                  class="form-control"
                  v-model="email"
                  readonly
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="password" class="required col-4 col-form-label"
                >Password</label
              >
              <div class="col-8">
                <input
                  id="password"
                  class="form-control"
                  v-model="password"
                  readonly
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label
                for="confirm_password"
                class="required col-4 col-form-label"
                >Confirm password</label
              >
              <div class="col-8">
                <input
                  id="confirm_password"
                  class="form-control"
                  v-model="confirm_password"
                  readonly
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="role" class="col-4 col-form-label">Type</label>
              <div class="col-8">
                <!-- fix showing role in view -->
                <input
                  v-if="role == 0"
                  class="form-control"
                  value="Admin"
                  readonly
                />
                <input v-else class="form-control" value="User" readonly />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="phone" class="col-4 col-form-label">Phone</label>
              <div class="col-8">
                <input class="form-control" v-model="phone" readonly />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="dob" class="col-4 col-form-label"
                >Date of birth</label
              >
              <div class="col-8">
                <input class="form-control" v-model="dob" readonly />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="address" class="col-4 col-form-label">Address</label>
              <div class="col-8">
                <input
                  type=""
                  id="address"
                  class="form-control"
                  v-model="address"
                  readonly
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="profile" class="col-4 col-form-label">Profile</label>
              <div class="col-8">
                <div v-if="confirm_profile">
                  <img
                    v-if="typeof confirm_profile === 'string'"
                    :src="confirm_profile"
                    alt="Profile Picture"
                    width="100"
                  />
                  <div v-else>
                    <p>Profile image not available</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-sm-4"></div>
              <div class="col-sm-8">
                <button type="submit" class="btn bg-success">Confirm</button
                >&nbsp;
                <button
                  type="button"
                  @click="toRegister"
                  class="btn bg-secondary"
                >
                  Cancel
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
import { onMounted, ref } from "vue";
import { useUsersStore } from "../../../stores/users";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import Button from "../../compos/Button.vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import DatePicker from "../../compos/DatePicker.vue";

export default {
  components: {
    SubHeader,
    DatePicker,
    Button,
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const phone = ref("");
    const dob = ref(new Date());
    const address = ref("");
    const confirm_profile = ref(null);
    const profile = ref("");
    const role = ref(0);
    const router = useRouter();
    const usersStore = useUsersStore();
    const toast = useToast();
    const duplicateError = ref("");

    onMounted(() => {
      name.value = usersStore.name;
      email.value = usersStore.email;
      password.value = usersStore.password;
      confirm_password.value = usersStore.confirm_password;
      role.value = usersStore.role;
      phone.value = usersStore.phone;
      dob.value = formatDate(usersStore.dob);
      address.value = usersStore.address;
      profile.value = usersStore.profile;
      confirm_profile.value = usersStore.confirm_profile;
    });

    //format date yy/mm/dd
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }

    //go to register page
    function toRegister() {
      router.push({ name: "Register" });
    }

    //show errors
    function showErrorToast() {
      toast.error("Failed to register user! Please try again...", {
        duration: 5000,
      });
    }

    //register user
    async function Register() {
      const formData = new FormData();

      formData.append("user[name]", name.value);
      formData.append("user[email]", email.value);
      formData.append("user[password]", password.value);
      formData.append("user[role]", role.value);
      formData.append("user[phone]", phone.value);
      formData.append("user[dob]", dob.value);
      formData.append("user[address]", address.value);
      formData.append("user[profile]", profile.value);
      try {
        const response = await usersStore.setUsers(formData);
        if (response.status === 201) {
          router.push({ name: "Users" });
        } else if (response.status === 422) {
          duplicateError.value = "Email already exists!";
        } else if (response.status === 500) {
          duplicateError.value = "Name already exists!";
        }
      } catch (error) {
        showErrorToast();
        console.error;
      }
    }

    return {
      Register,
      email,
      name,
      password,
      confirm_password,
      role,
      phone,
      address,
      confirm_profile,
      toRegister,
      dob,
      formatDate,
      showErrorToast,
      duplicateError,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #e0e0e0;
}
.required::after {
  content: " *";
  color: red;
}

.msg-box {
  background-color: rgba(255, 0, 0, 0.133);
  color: rgb(201, 0, 0);
}
</style>
