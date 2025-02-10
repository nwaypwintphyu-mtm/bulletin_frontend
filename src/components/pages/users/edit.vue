<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Profile Edit" />
      <Button label="Back" route="/user/profile" />
      <div class="card-body">
        <form @submit.prevent="">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="name" class="text-end col-3 col-form-label"
                >Name:</label
              >
              <div class="col-9">
                <input type="" id="name" class="form-control" v-model="name" />
                <div v-if="state.nameError" class="text-danger mt-1">
                  {{ state.nameError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="email" class="text-end col-3 col-form-label"
                >Email Address:</label
              >
              <div class="col-9">
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
              <label for="role" class="text-end col-3 col-form-label"
                >Type:</label
              >
              <div class="col-9">
                <select
                  name="role"
                  id="role"
                  class="form-control"
                  v-model="role"
                >
                  <option value="0">Admin</option>
                  <option value="1">User</option>
                </select>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="phone" class="text-end col-3 col-form-label"
                >Phone:</label
              >
              <div class="col-9">
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
              <label for="dob" class="text-end col-3 col-form-label"
                >Date of Birth:</label
              >
              <div class="col-9">
                <DatePicker @date-selected="getDate" />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="address" class="text-end col-3 col-form-label"
                >Address:</label
              >
              <div class="col-9">
                <input
                  type=""
                  id="address"
                  class="form-control"
                  v-model="address"
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="old_profile" class="text-end col-3 col-form-label"
                >Old profile:</label
              >
              <div class="w-25 ms-4" v-if="current_user">
                <img
                  :src="
                    state.preview_profile ||
                    (current_user.profile.url
                      ? apiUrl + current_user.profile.url
                      : '')
                  "
                  alt="Profile Image"
                  class="img-fluid rounded"
                  style="max-width: 150px; height: auto"
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="new_profile" class="text-end col-3 col-form-label"
                >New Profile:</label
              >
              <div class="col-8 ms-4">
                <FileUpload
                  :initial-image="getInitialImage()"
                  @file-selected="onFileSelected"
                />
                <div v-if="state.profileError" class="text-danger mt-1">
                  {{ state.profileError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <div class="col-3"></div>
              <div class="col-9">
                <button class="btn btn-success" @click="edit">Edit</button
                >&nbsp;
                <button
                  class="btn btn-secondary text-light"
                  type="reset"
                  @click="clear"
                >
                  Clear</button
                >&nbsp;
                <button href="" class="text-primary" @click="toChangePassword">
                  Change Password
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
import { useUsersStore } from "../../../stores/users";
import { useToast } from "vue-toast-notification";
import SubHeader from "../../Layouts/SubHeader.vue";
import FileUpload from "../../compos/FileUpload.vue";
import Button from "../../compos/Button.vue";
import DatePicker from "../../compos/DatePicker.vue";

export default {
  components: {
    SubHeader,
    FileUpload,
    Button,
    DatePicker,
  },
  setup() {
    const usersStore = useUsersStore();
    const toast = useToast();
    const router = useRouter();
    const current_user = ref(null);
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const dob = ref("");
    const address = ref("");
    const role = ref(1);
    const profile = ref(null);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const apiUrl = import.meta.env.VITE_API_URL;

    const state = reactive({
      profile: null,
      preview_profile: null,
      nameError: "",
      emailError: "",
      phoneError: "",
      profileError: "",
    });

    onMounted(() => {
      current_user.value = usersStore.current_user; //get current user from store
      name.value = current_user.value.name;
      email.value = current_user.value.email;
      phone.value = current_user.value.phone;
      dob.value = current_user.value.dob;
      address.value = current_user.value.address;
      role.value = current_user.value.role;
      profile.value = current_user.value.profile;
    });

    //get previous image if exist
    function getInitialImage() {
      if (
        current_user.value &&
        current_user.value.profile &&
        current_user.value.profile.url
      ) {
        return getFilename(current_user.value.profile.url);
      }
      //if not exist, return null
      return null;
    }

    //get file name of previous image to show in file upload box
    function getFilename(path) {
      if (path) {
        const pathParts = path.split("/");
        return pathParts[pathParts.length - 1];
      }
    }

    //get selected file from fileupload component
    function onFileSelected(file) {
      if (file) {
        state.profile = file;
        state.preview_profile = URL.createObjectURL(file);
      }
    }

    //get date from datepicker component
    function getDate(date) {
      dob.value = date;
    }

    //go to change password page
    function toChangePassword() {
      router.push({ name: "ChangePassword" });
    }

    //show error
    function showErrorToast(toastMessage) {
      toast.error(toastMessage, {
        duration: 5000,
      });
    }

    //edit user
    async function edit() {
      state.nameError = "";
      state.emailError = "";
      state.phoneError = "";

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

      if (state.profile && !allowedTypes.includes(state.profile.type)) {
        state.profileError = "Please choose an image file.";
      }
      //check size
      const maxFileSize = 2 * 1024 * 1024;
      if (state.profile.size > maxFileSize) {
        state.profileError = "Profile size exceeds 2MB.";
      }

      if (phone.value.length > 12 || phone.value.length < 8) {
        state.phoneError = "Phone number must be between 8 and 12 numbers";
      }
      if (!/^\d+$/.test(phone.value)) {
        state.phoneError = "Phone number must contain only digits.";
      }
      if (
        !state.nameError &&
        !state.emailError &&
        !state.profileError &&
        !state.phoneError
      ) {
        if (!state.profile) {
          state.profile = getFilename(current_user.value.profile.url);
        }
        const formData = new FormData();
        formData.append("user[name]", name.value);
        formData.append("user[email]", email.value);
        formData.append("user[role]", role.value);
        formData.append("user[phone]", phone.value);
        formData.append("user[dob]", dob.value);
        formData.append("user[address]", address.value);
        formData.append("user[profile]", state.profile);
        try {
          const response = await usersStore.updateUser(formData);
          //if update success, go to users list page
          if (response.status === 200) {
            router.push({ name: "Users" });
          }
          //if fails, show toast
          else {
            showErrorToast("Failed to update user! Please try again...");
          }
        } catch (error) {
          console.error(error);
          showErrorToast("Failed to update user! Please try again...");
        }
      }
    }

    function clear() {
      //make null to profile
      state.profile = "";
      current_user.value.profile = "";
    }

    return {
      current_user,
      name,
      email,
      phone,
      dob,
      address,
      role,
      state,
      onFileSelected,
      edit,
      getInitialImage,
      clear,
      getDate,
      toChangePassword,
      apiUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #e0e0e0;
}
</style>
