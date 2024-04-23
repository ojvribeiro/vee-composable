import { useForm, useResetForm, useIsFormTouched } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export function useFormValidation(options: Record<string, any> = {}) {
  const form = ref<Record<string, any>>({});  
  
  // Creates a typed schema for vee-validate
  const schema = computed(() =>
    toTypedSchema(
      yup.object({
        ...options,
      })
    )
  );
  
  const { values, errors, handleSubmit, setFieldValue, handleReset } = useForm({
    validationSchema: schema,
  });
  
  
  watchEffect(() => {
    Object.keys(form.value).forEach((key: string) => {
      setFieldValue(key, form.value[key]);
    });
  });
  
  // Resets the form
  handleReset();

  return {
    form,
    values,
    errors,
    handleSubmit,
  };
}
