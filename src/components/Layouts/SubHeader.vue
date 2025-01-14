<template>
  <div class="bg-success text-light p-2 fs-5">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
