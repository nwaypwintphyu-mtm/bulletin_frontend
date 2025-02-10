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
import { reactive } from "vue";
import { usePostsStore } from "../../../stores/posts";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import SubHeader from "../../Layouts/SubHeader.vue";
import Button from "../../compos/Button.vue";

export default {
  components: {
    SubHeader,
    Button,
  },
  setup() {
    const postsStore = usePostsStore();
    const toast = useToast();
    const router = useRouter();
    const allowedTypes = ["text/csv"];

    const state = reactive({
      file: "",
      fileError: "",
    });

    //get file on change
    function onFileChange(event) {
      const file = event.target.files[0];
      state.file = file;
    }

    const showErrorToast = (toastMessage) => {
      toast.error(toastMessage, {
        duration: 5000,
      });
    };

    //upload posts csv
    async function upload() {
      state.fileError = "";

      if (!state.file) {
        state.fileError = "Please choose a file.";
        return;
      }

      //check size
      const maxFileSize = 10 * 1024 * 1024;
      if (state.file.size > maxFileSize) {
        state.fileError = "File size must be less than 10MB.";
        return;
      }

      if (!allowedTypes.includes(state.file.type)) {
        state.fileError = "Please choose a csv format.";
        return;
      }

      if (state.file) {
        const reader = new FileReader();

        //read csv fil
        reader.onload = async () => {
          const fileContent = reader.result;
          //get rows
          const rows = fileContent
            .split("\n")
            .filter((row) => row.trim() !== "");

          //get columns
          const columns = rows.map((row) => row.split(","));

          // check for invalid column title for post
          if (columns) {
            if (columns[0][0].trim() !== "title") {
              state.fileError =
                "Title for post title column must be 'title' in your csv file.";
            }
            if (columns[0][1].trim() !== "description") {
              state.fileError =
                "Title for post description column must be 'description' in your csv file.";
            }
            if (columns[0][2].trim() !== "status") {
              state.fileError =
                "Title for post status column must be 'status' in your csv file.";
            }
          }
          // check for multiple row with same items
          const allRows = new Set();
          for (let i = 1; i < columns.length; i++) {
            const title = columns[i][0];
            const description = columns[i][1];
            const status = columns[i][2];

            const duplicateRows = `${title}-${description}-${status}`;

            if (allRows.has(duplicateRows)) {
              state.fileError = `Duplicate rows found. Rows must be unique.`;
              return;
            }
            allRows.add(duplicateRows);
          }

          //column limit
          const columnLimit = columns[0].length;

          //if col > 3 show error
          if (columnLimit > 3) {
            state.fileError = "Post upload csv must have 3 columns.";
            return;
          }

          if (!state.fileError) {
            const formData = new FormData();
            formData.append("posts", state.file);
            try {
              const response = await postsStore.uploadPost(formData);
              if (response.status === 200) {
                router.push({ name: "Posts" });
              } else {
                showErrorToast(
                  "Failed to upload post with csv! Please try again..."
                );
              }
            } catch (error) {
              console.error(error);
              showErrorToast(
                "Failed to upload post with csv! Please try again..."
              );
            }
          }
        };
        reader.onerror = () => {
          state.fileError = "Error reading the file.";
        };
        //set file into state.file
        reader.readAsText(state.file);
      }
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
