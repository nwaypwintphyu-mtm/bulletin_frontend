<template>
  <v-switch
    v-model="statusProp"
    hide-details
    @change="getStatus"
    :disabled="disable"
  />
</template>

<script>
import { watch, ref } from "vue";
import { VSwitch } from "vuetify/components";

export default {
  name: "Switch",
  components: {
    VSwitch,
  },
  props: {
    status: {
      type: Number,
      default: 0,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const statusProp = ref(props.status === 1);

    watch(
      () => props.status,
      (newValue) => {
        statusProp.value = newValue === 1;
      }
    );

    const getStatus = () => {
      context.emit("get-status", statusProp.value ? 1 : 0);
    };

    return { statusProp, getStatus };
  },
};
</script>

<style scoped></style>
