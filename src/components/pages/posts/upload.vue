<template>
  <div class="container-fluid">
    <div class="card w-50 m-auto mt-5 rounded shadow">
      <SubHeader title="Upload CSV File" />
      <div v-if="state.fileError" class="p-2 msg-box" role="alert">
        {{ state.fileError }}
      </div>
      <Button label="Back" route="/posts" />
      <div class="card-body">
        <form @submit.prevent="">
          <div class="w-75 m-auto">
            <div class="col-12 my-5 rounded border p-2">
              <input
                type="file"
                @change="onFileChange"
                accept=".csv,text/csv"
              />
            </div>
            <div class="mb-4 row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                <button type="submit" @click="upload" class="btn bg-success">
                  Upload</button
                >&nbsp;
                <button @click="clearForm" class="btn bg-secondary">
                  Clear
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
import { usePostsStore } from "../../../stores/posts";
import Button from "../../compos/Button.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    SubHeader,
    Button,
  },
  setup() {
    const postsStore = usePostsStore();
    const router = useRouter();
    onMounted(() => {});
    const allowedTypes = ["text/csv"];

    const state = reactive({
      file: "",
      fileError: "",
      successMessage: "",
    });
    function onFileChange(event) {
      const file = event.target.files[0];
      state.file = file;
    }

    async function upload() {
      state.fileError = "";

      if (!state.file) {
        state.fileError = "Please choose a file.";
        return;
      }

      if (!allowedTypes.includes(state.file.type)) {
        state.fileError = "Please choose a csv format.";
        return;
      }

      const reader = new FileReader();

      reader.onload = async () => {
        const fileContent = reader.result;
        const rows = fileContent.split("\n").filter((row) => row.trim() !== "");
        const columns = rows.map((row) => row.split(","));

        const rowLimit = rows.length;
        const columnLimit = columns[0].length;

        if (columnLimit > 3) {
          state.fileError = "Post upload csv must have 3 columns.";
          return;
        }
        if (rowLimit > 100) {
          state.fileError = "Maximun 100 posts are allowed to create.";
          return;
        }

        if (!state.fileError) {
          const formData = new FormData();
          formData.append("posts", state.file);

          try {
            const response = await postsStore.uploadPost(formData);
            if (response.status === 200) {
              router.push({name:"Posts"})
            }
          } catch (error) {
            console.error("Error during upload:", error);
            state.fileError = "Error uploading the file.";
          }
        }
      };

      reader.onerror = () => {
        state.fileError = "Error reading the file.";
      };
      reader.readAsText(state.file);
    }

    return {
      state,
      onFileChange,
      upload,
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
