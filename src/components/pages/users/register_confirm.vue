<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Register Confirm" />
      <Button label="Back" route="/register" />
      <div class="card-body">
        <form @submit.prevent="Register" enctype="multipart/form-data">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="name" class="required col-4 col-form-label"
                >Name</label
              >
              <div class="col-8">
                <input id="name" class="form-control" v-model="name" />
                <div v-if="state.nameError" class="text-danger mt-1">
                  {{ state.nameError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="email" class="required col-4 col-form-label"
                >E-Mail Address</label
              >
              <div class="col-8">
                <input id="email" class="form-control" v-model="email" />
                <div v-if="state.emailError" class="text-danger mt-1">
                  {{ state.emailError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="password" class="required col-4 col-form-label"
                >Password</label
              >
              <div class="col-8">
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
            <div class="mb-4 row">
              <label
                for="confirm_password"
                class="required col-4 col-form-label"
                >Confirm password</label
              >
              <div class="col-8">
                <input
                  type="password"
                  id="confirm_password"
                  class="form-control"
                  v-model="confirm_password"
                />
                <div
                  v-if="state.confirm_passwordError"
                  class="text-danger mt-1"
                >
                  {{ state.confirm_passwordError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="role" class="col-4 col-form-label">Type</label>
              <div class="col-8">
                <select
                  name="role"
                  id="role"
                  class="form-control"
                  aria-label="Select role"
                  v-model="role"
                >
                  <option value="0">Admin</option>
                  <option value="1">User</option>
                </select>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="phone" class="col-4 col-form-label">Phone</label>
              <div class="col-8">
                <input
                  type=""
                  id="phone"
                  class="form-control"
                  v-model="phone"
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="dob" class="col-4 col-form-label"
                >Date of birth</label
              >
              <div class="col-8">
                <DatePicker @date-selected="getDate" />
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
import { onMounted, reactive, ref } from "vue";
import SubHeader from "../../Layouts/SubHeader.vue";
import DatePicker from "../../compos/DatePicker.vue";
import { useUsersStore } from "../../../stores/users";
import { useRouter } from "vue-router";
import Button from "../../compos/Button.vue";

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
    const role = ref(1);
    const router = useRouter();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usersStore = useUsersStore();

    onMounted(() => {
      name.value = usersStore.name;
      email.value = usersStore.email;
      password.value = usersStore.password;
      confirm_password.value = usersStore.confirm_password;
      role.value = usersStore.role;
      phone.value = usersStore.phone;
      dob.value = usersStore.dob;
      address.value = usersStore.address;
      profile.value = usersStore.profile;
      confirm_profile.value = usersStore.confirm_profile;
    });

    const state = reactive({
      nameError: "",
      emailError: "",
      passwordError: "",
      confirm_passwordError: "",
      phoneError: "",
      dobError: "",
      addressError: "",
      profileError: "",
    });

    function getDate(date) {
      dob.value = date;
    }

    function toRegister() {
      router.push({ name: "Register" });
    }

    async function Register() {
      state.nameError = "";
      state.emailError = "";
      state.passwordError = "";
      state.confirm_passwordError = "";
      state.profileError = "";
      if (!name.value) {
        state.nameError = "Name can't be blank.";
      }
      if (!email.value) {
        state.emailError = "Email can't be blank.";
      } else if (!emailPattern.test(email.value)) {
        state.emailError = "Email format is invalid";
      }
      if (!password.value) {
        state.passwordError = "Password can't be blank.";
      }
      if (!confirm_password.value) {
        state.confirm_passwordError = "Confirm password can't be blank.";
      }
      if (!profile.value) {
        state.profileError = "Profile can't be blank.";
      }
      if (
        !state.nameError &&
        !state.emailError &&
        !state.passwordError &&
        !state.confirm_passwordError &&
        !state.profileError
      ) {
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
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
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
      getDate,
      address,
      state,
      confirm_profile,
      toRegister,
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
</style>
