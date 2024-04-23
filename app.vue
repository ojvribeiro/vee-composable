<template>
  <div class="grid h-screen w-full place-items-center bg-slate-200">
    <section
      class="w-[400px] max-w-full rounded-2xl bg-white p-6 py-8 shadow-2xl"
    >
      <form @submit="onSubmit">
        <div class="flex flex-col gap-4">
          <FormInput
            label="Email"
            v-model="form.email"
            v-bind="form.emailProps"
            type="text"
            :error="errors.email"
          />

          <FormInput
            type="password"
            label="Password"
            v-model="form.password"
            v-bind="form.passwordProps"
            :error="errors.password"
          />

          <button
            class="rounded-md bg-blue-400 px-4 py-2 text-white transition-colors hover:bg-blue-500 active:bg-blue-600"
          >
            Submit
          </button>

          <button
            type="button"
            @click="resetForm"
            class="rounded-md bg-red-400 px-4 py-2 text-white transition-colors hover:bg-red-500 active:bg-red-600"
          >
            Reset
          </button>

          <div class="overflow-x-scroll rounded-lg bg-slate-200 p-4">
            <pre>form: {{ form }}</pre>
            <pre>values: {{ values }}</pre>
            <pre>errors: {{ errors }}</pre>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
  import * as yup from 'yup'

  const { errors, values, form, handleSubmit } = useFormValidation({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const onSubmit = handleSubmit(submitForm)

  function submitForm() {
    console.log('submit')
  }
</script>
