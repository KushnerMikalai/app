<script setup lang="ts">
const emit = defineEmits([
  'update:modelValue',
  'blur'
])

interface Props {
  value?: number | string
  type?: string
}

withDefaults(defineProps<Props>(), {
  value: '',
})


const input = (e: Event) => {
  const target = e.target as HTMLInputElement

  emit('update:modelValue', target.value)
};

const blur = (e: any) => emit('blur', e)

</script>

<template>
  <input
    class="pf-c-form-control"
    :value="value"
    :type="type"
    @input="input"
    @blur="blur"
  />
</template>

<style lang="scss"></style>
