<template>
  <p v-if="message" class="text-danger text-center mt-3">{{ message }}</p>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    message: {
      type: String,
      required: false,
      default: ""
    }
  }
};
</script>

<style scoped>
.text-danger {
  font-size: 14px;
  font-weight: bold;
}
</style>