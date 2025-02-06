<template>
  <tr>
    <td :colspan="column" class="text-center">No data available in table</td>
  </tr>
</template>
<script>
export default {
  props: {
    column: {
      type: Number,
    },
  },
};
</script>
