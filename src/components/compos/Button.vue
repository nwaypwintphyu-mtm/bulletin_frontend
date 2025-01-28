<template>
  <div>
    <button
      class="btn  btn-secondary m-3"
      color="primary"
      @click="navigate"
    >
      {{ label }}
    </button>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  props: {
    label: {
      type: String,
    },
    route: {
      type: String,
    },
  },
  setup(props) {
    const routeTo = props.route;
    const router = useRouter();

    const navigate = () => {
      router.push(routeTo);
    };

    return {
      navigate,
    };
  },
};
</script>
