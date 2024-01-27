<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: String
  },
  setup(props) {
    return { props }
  }
}
</script>

<template>
  <q-input
    filled
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    label="Ism"
    lazy-rules
    :rules="[(val) => (val && val.length > 0) || `${label} bo'sh bo'lishi mumkin emas! `]"
  />
</template>

<style lang="scss" scoped></style>
