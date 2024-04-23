<template>
  <div class="flex grow flex-col space-y-1">
    <label
      v-if="props.label"
      :for="transformedId"
      :class="resolvedLabelClasses"
    >
      {{ props.label }}
    </label>

    <div :class="resolvedClasses">
      <label
        v-if="$slots.prefix"
        :for="transformedId"
        class="grid place-items-center self-stretch"
      >
        <slot name="prefix" />
      </label>

      <input
        v-bind="$attrs"
        ref="inputRef"
        :id="props.label ? transformedId : undefined"
        :class="resolvedInputClasses"
        :readonly="props.readonly ?? false"
        :value="$attrs.value || modelValue || ''"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />

      <div
        v-if="props.readonly"
        class="grid cursor-help place-items-center self-stretch px-3 py-0"
        title="This field is read-only"
      >
        <Icon name="status/lock-alt" class="text-2xl opacity-30" />
      </div>

      <div
        v-if="$slots.suffix"
        class="grid place-items-center self-stretch pr-3"
      >
        <slot name="suffix" />
      </div>
    </div>

    <div class="text-red-400 text-xs" v-if="props.error">
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
    labelClass?: string | string[]
    inputClass?: string | string[]
    readonly?: boolean
    class?: string | string[]
    modelValue?: string | number | null
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

  const attrs: InputHTMLAttributes = useAttrs()

  const inputRef = ref<HTMLInputElement | null>(null)

  const props = defineProps<Props>()

  // Makes the id attribute of the input element based on the label prop if it exists
  const transformedId = computed<string | undefined>(() => {
    if (attrs.id) return attrs.id

    return props.label ? `input-${slugify(props.label)}` : undefined
  })

  const resolvedClasses = computed(() => {
    const defaultClasses = `
      group/form-input
      flex items-center
      h-12 w-full
      rounded-lg overflow-hidden
      border ring-offset-1
      bg-white
      font-roboto text-secondary-silver1 !p-0
    `

    return twMerge(
      defaultClasses,
      !props.readonly && 'transition focus-within:ring-2',
      props.error && 'border-red-400',
      props.class as string
    )
  })

  const resolvedLabelClasses = computed(() => {
    const defaultClasses = `
      font-hanken font-bold text-rebrand-300
    `

    return twMerge(defaultClasses, props.labelClass as string)
  })

  const resolvedInputClasses = computed(() => {
    const defaultClasses = `
      h-full w-full border border-transparent bg-transparent p-4 outline-none
    `

    return twMerge(
      defaultClasses,
      props.inputClass as string,
      props.readonly ? 'cursor-not-allowed' : 'cursor-text'
    )
  })
</script>
