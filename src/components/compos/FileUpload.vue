<template>
  <div>
    <label class="custom-file-label" for="fileInput">
      {{ displayFileName }}
    </label>
    <input
      type="file"
      id="fileInput"
      @change="onFileChange"
      accept="image/*"
      style="display: none"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    initialImage: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const file = ref(null);

    const displayFileName = computed(() => {
      if (file.value) {
        return file.value.name;
      } else if (props.initialImage) {
        return props.initialImage;
      } else {
        return "No file chosen";
      }
    });

    const onFileChange = (event) => {
      const selectedFile = event.target.files[0];
      file.value = selectedFile;
      emit("file-selected", selectedFile);
    };

    return {
      file,
      onFileChange,
      displayFileName,
    };
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}

.custom-file-label {
  display: inline-block;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
}

.custom-file-label:hover {
  background-color: #e9ecef;
}

.custom-file-label:active {
  background-color: #ced4da;
}
</style>
