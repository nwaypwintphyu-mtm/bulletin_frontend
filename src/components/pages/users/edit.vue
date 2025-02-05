<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Profile Edit" />
      <Button label="Back" route="/user/profile" />
      <div class="card-body">
        <form @submit.prevent="">
          <div class="w-75 m-auto">
            <div class="mb-4 row">
              <label for="name" class="col-3 col-form-label">Name:</label>
              <div class="col-9">
                <input type="" id="name" class="form-control" v-model="name" />
                <div v-if="state.nameError" class="text-danger mt-1">
                  {{ state.nameError }}
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="email" class="col-3 col-form-label"
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
              <label for="role" class="col-3 col-form-label">Type:</label>
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
              <label for="phone" class="col-3 col-form-label">Phone:</label>
              <div class="col-9">
                <input
                  type=""
                  id="phone"
                  class="form-control"
                  v-model="phone"
                />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="dob" class="col-3 col-form-label"
                >Date of Birth:</label
              >
              <div class="col-9">
                <DatePicker @date-selected="getDate" />
              </div>
            </div>
            <div class="mb-4 row">
              <label for="address" class="col-3 col-form-label">Address:</label>
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
              <label for="old_profile" class="col-3 col-form-label"
                >Old profile:</label
              >
              <div class="w-25 ms-4" v-if="current_user">
                <div v-if="state.preview_profile">
                  <img
                    v-if="state.preview_profile"
                    :src="state.preview_profile"
                    alt="Profile Image"
                    class="img-fluid rounded"
                    style="max-width: 150px; height: auto"
                  />
                </div>
                <div v-else>
                  <img
                    v-if="current_user.profile.url"
                    :src="'http://localhost:3002' + current_user.profile.url"
                    alt="Profile Image"
                    class="img-fluid rounded"
                    style="max-width: 150px; height: auto"
                  />
                </div>
              </div>
            </div>
            <div class="mb-4 row">
              <label for="new_profile" class="col-3 col-form-label"
                >New Profile:</label
              >
              <div class="col-8 ms-4">
                <FileUpload
                  :initial-image="getInitialImage()"
                  @file-selected="onFileSelected"
                />

                <div v-if="state.profileTypeError" class="text-danger mt-1">
                  {{ state.profileTypeError }}
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

    const state = reactive({
      profile: null,
      preview_profile: null,
      nameError: "",
      emailError: "",
      profileTypeError: "",
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
      state.profile = file;
      state.preview_profile = URL.createObjectURL(file);
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
    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };

    //edit user
    async function edit() {
      state.nameError = "";
      state.emailError = "";
      if (!name.value) {
        state.nameError = "Name can't be blank.";
      }
      if (!email.value) {
        state.emailError = "Email can't be blank.";
      } else if (!emailPattern.test(email.value)) {
        state.emailError = "Email format is invalid";
      }

      if (state.profile && !allowedTypes.includes(state.profile.type)) {
        state.profileTypeError = "Please choose an image file.";
      }

      if (!state.nameError && !state.emailError && !state.profileTypeError) {
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
          //if failes, show toast
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
