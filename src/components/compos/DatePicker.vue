<template>
  <div>
    <datepicker class="form-control" v-model="selectedDate" required>
    </datepicker>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";

export default {
  name: "DatePicker",
  components: { Datepicker },
  emits: ["date-selected"],

  setup(props, context) {
    const selectedDate = ref(new Date());

    watch(selectedDate, (newDate) => {
      const formattedDate = moment(newDate).format("YYYY-MM-DD");
      context.emit("date-selected", formattedDate);
    });
    return {
      selectedDate,
    };
  },
};
</script>

<style scoped>
:deep(.vuejs3-datepicker__value) {
  border: none;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: around;
}
</style>
