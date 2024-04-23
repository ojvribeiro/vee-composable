<template>
  <form @submit="onSubmit">
    <FormInput
      v-model="form.email"
      v-bind="form.emailProps"
      type="text"
      class="w-[200px]"
      :error="errors.email"
    />

    <FormInput
      type="password"
      v-model="form.password"
      v-bind="form.passwordProps"
      class="w-[200px]"
      :error="errors.password"
    />

    <button class="bg-blue-400 py-2 px-4 text-white rounded-md">Submit</button>
  </form>

  <button @click="changeEmail('other@email.com')">Change</button>

  <pre>form: {{ form }}</pre>
  <pre>values: {{ values }}</pre>
  <pre>errors: {{ errors }}</pre>
</template>

<script setup lang="ts">
  import * as yup from "yup";

  const { errors, values, form, handleSubmit } = useFormValidation({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  function changeEmail(email: string) {
    form.value.email = email;
  }

  const onSubmit = handleSubmit(submitForm);

  function submitForm() {
    console.log("submit");
  }
</script>
