<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Register" />
      <Button label="Back" route="/posts" />
      <div class="card-body">
        <form @submit.prevent="toRegisterConfirm">
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
                <div v-if="state.phoneError" class="text-danger mt-1">
                  {{ state.phoneError }}
                </div>
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
              <label for="profile" class="required col-4 col-form-label"
                >Profile</label
              >
              <div class="col-5 ms-4">
                <div>
                  <FileUpload @file-selected="onFileSelected" />
                </div>
                <div v-if="state.profileError" class="text-danger mt-3">
                  {{ state.profileError }}
                </div>
                <div v-if="state.profileError" class="text-danger mt-3">
                  {{ state.profileError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-4"></div>
              <div class="col-8">
                <button type="submit" class="btn bg-success">Register</button
                >&nbsp;
                <button type="reset" class="btn bg-secondary">Clear</button>
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
import { useUsersStore } from "../../../stores/users";
import { useRouter } from "vue-router";
import SubHeader from "../../Layouts/SubHeader.vue";
import DatePicker from "../../compos/DatePicker.vue";
import FileUpload from "../../compos/FileUpload.vue";
import Button from "../../compos/Button.vue";
export default {
  components: {
    SubHeader,
    DatePicker,
    FileUpload,
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
    const profile = ref(null);
    const confirm_profile = ref("");
    const router = useRouter();
    const usersStore = useUsersStore();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    onMounted(() => {
      name.value = usersStore.name;
      email.value = usersStore.email;
      password.value = usersStore.password;
      confirm_password.value = usersStore.confirm_password;
      role.value = usersStore.role;
      phone.value = usersStore.phone;
      address.value = usersStore.address;
      profile.value = usersStore.profile;
      confirm_profile.value = usersStore.confirm_profile;
    });

    const state = reactive({
      nameError: "",
      emailError: "",
      passwordError: "",
      phoneError: "",
      dobError: "",
      addressError: "",
      profileError: "",
      passwordMatchError: "",
    });

    //get date from datepicker component
    function getDate(date) {
      dob.value = date;
    }

    //get file from fileupload component
    function onFileSelected(file) {
      if (file) {
        profile.value = file;
        confirm_profile.value = URL.createObjectURL(file);
      } else {
        profile.value = null;
        confirm_profile.value = "";
      }
    }

    //go to register confirm page
    function toRegisterConfirm() {
      state.nameError = "";
      state.emailError = "";
      state.passwordError = "";
      state.phoneError = "";
      state.profileError = "";
      state.passwordMatchError = "";
      if (!name.value) {
        state.nameError = "Name can't be blank.";
      } else if (name.value.length > 25) {
        state.nameError = "Name is too long.";
      }
      if (!email.value) {
        state.emailError = "Email can't be blank.";
      } else if (!emailPattern.test(email.value)) {
        state.emailError = "Email format is invalid";
      }
      if (!password.value) {
        state.passwordError = "Password can't be blank.";
      }
      if (phone.value.length > 12) {
        state.phoneError = "Phone number too long.";
      }
      if (!confirm_password.value) {
        state.confirm_passwordError = "Confirm password can't be blank.";
      }
      if (!profile.value) {
        state.profileError = "Profile can't be blank.";
      }
      if (
        password.value &&
        confirm_password.value &&
        password.value != confirm_password.value
      ) {
        state.passwordError =
          "Password and password confirmation is not match.";
        state.confirm_passwordError =
          "Password and password confirmation is not match.";
      }

      if (
        !state.nameError &&
        !state.emailError &&
        !state.passwordError &&
        !state.confirm_passwordError &&
        !state.profileError &&
        !state.phoneError
      ) {
        const params = {
          name: name.value,
          email: email.value,
          password: password.value,
          confirm_password: confirm_password.value,
          role: role.value,
          phone: phone.value,
          dob: dob.value,
          address: address.value,
          profile: profile.value,
          confirm_profile: confirm_profile.value,
        };

        //set user data into store to call from confirm page
        usersStore.setUserData(params);
        //go to confirm page
        router.push({ name: "RegisterConfirm" });
      }
    }

    return {
      toRegisterConfirm,
      email,
      name,
      password,
      confirm_password,
      phone,
      getDate,
      address,
      onFileSelected,
      dob,
      state,
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
