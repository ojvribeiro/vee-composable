<template>
  <div class="flex grow flex-col space-y-1">
    <div :class="resolvedClasses">
      <input
        v-bind="$attrs"
        ref="inputRef"
        class="h-full w-full border border-transparent bg-transparent p-4 pl-2 outline-none"
        :class="[props.readonly ? 'cursor-not-allowed' : 'cursor-text']"
        :readonly="props.readonly"
        :value="$attrs.value || modelValue || ''"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />

      
    </div>

    <div class="text-xs text-functional-danger1" v-if="props.error">
      {{ props.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { InputHTMLAttributes } from 'vue'
  import { twMerge } from 'tailwind-merge'

  interface Props
    extends /* @vue-ignore */ Partial<Omit<InputHTMLAttributes, 'class'>> {
    label?: string
    readonly?: boolean
    class?: string | string[] | Record<string, boolean>
    modelValue?: string | number
    error?: string
  }

  defineOptions({
    inheritAttrs: false,
  })

  defineExpose({
    focus: () => {
      inputRef.value!.focus()
    },
    select: () => {
      inputRef.value!.select()
    },
    scrollIntoView: () => {
      inputRef.value!.scrollIntoView()
    },
  })

  defineEmits(['update:modelValue'])

  const inputRef = ref<HTMLInputElement | null>(null)

  const props = defineProps<Props>()

  const resolvedClasses = computed(() => {
    const defaultClasses = `
      group/form-input
      flex items-center
      h-12 w-full
      rounded-lg overflow-hidden
      border ring-offset-1
      bg-white
      font-roboto text-secondary-silver1
    `

    return twMerge(
      defaultClasses,
      !props.readonly && 'transition focus-within:ring-2',
      props.error && 'border-functional-danger1',
      props.class as string
    )
  })
</script>
