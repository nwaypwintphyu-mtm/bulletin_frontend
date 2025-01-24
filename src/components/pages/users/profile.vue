<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto rounded shadow">
      <SubHeader title="Profile" />
      <Button label="Back" route="/posts" />
      <div class="row mx-2">
        <div class="w-25" v-if="current_user">
          <img
            v-if="current_user.profile.url"
            :src="'http://localhost:3002' + current_user.profile.url"
            alt="Profile Image"
            class="img-fluid rounded"
            style="max-width: 150px; height: auto"
          />
        </div>

        <table class="table w-75">
          <tbody>
            <tr>
              <td><b>Name</b></td>
              <td class="" v-if="current_user">{{ current_user.name }}</td>
            </tr>
            <tr>
              <td><b>Type</b></td>
              <td class="" v-if="current_user">
                <span v-if="current_user.role == 0">Admin</span>
                <span v-else>User</span>
              </td>
            </tr>
            <tr>
              <td><b>Email</b></td>
              <td class="" v-if="current_user">
                {{ current_user.email }}
              </td>
            </tr>
            <tr>
              <td><b>Phone</b></td>
              <td class="" v-if="current_user">
                {{ current_user.phone }}
              </td>
            </tr>
            <tr>
              <td><b>Date of Birth</b></td>
              <td class="" v-if="current_user">
                {{ formatDate(current_user.dob) }}
              </td>
            </tr>
            <tr>
              <td><b>Address</b></td>
              <td class="" v-if="current_user">
                {{ current_user.address }}
              </td>
            </tr>
            <tr>
              <td class="border-none">
                <button class="btn btn-success" @click="toEditProfile">
                  Edit Profile
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../../../stores/users";
import SubHeader from "../../Layouts/SubHeader.vue";
import Button from "../../compos/Button.vue";

export default {
  components: {
    SubHeader,
    Button,
  },
  setup() {
    const usersStore = useUsersStore();
    const current_user = ref(null);
    const router = useRouter();

    onMounted(() => {
      current_user.value = usersStore.current_user;

    });
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }

    function toEditProfile() {
      router.push({ name: "EditProfile" });
    }
    return {
      current_user,
      formatDate,
      toEditProfile,
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
