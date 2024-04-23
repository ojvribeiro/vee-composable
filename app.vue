<template>
  <div class="w-full h-screen grid place-items-center bg-slate-200">
    <section class="shadow-2xl p-6 py-8 rounded-2xl bg-white">
      <form @submit="onSubmit">
        <div class="flex flex-col gap-4">
          <FormInput
            v-model="form.email"
            v-bind="form.emailProps"
            type="text"
            :error="errors.email"
          />

          <FormInput
            type="password"
            v-model="form.password"
            v-bind="form.passwordProps"
            :error="errors.password"
          />

          <button class="bg-blue-400 py-2 px-4 text-white rounded-md">
            Submit
          </button>

          <div class="bg-slate-200 rounded-lg p-4">
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
  import * as yup from "yup";

  const { errors, values, form, handleSubmit } = useFormValidation({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const onSubmit = handleSubmit(submitForm);

  function submitForm() {
    console.log("submit");
  }
</script>
