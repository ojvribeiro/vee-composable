import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export function useFormValidation(options: Record<string, any> = {}) {
  const form = ref<Record<string, any>>({});

  const schema = computed(() =>
    toTypedSchema(
      yup.object({
        ...options,
      })
    )
  );

  const vee = useForm({
    validationSchema: schema,
  });

  watchEffect(() => {
    Object.keys(form.value).forEach((key: string) => {
      vee.setFieldValue(key, form.value[key]);
    });
  });

  return {
    form,
    ...vee,
  };
}
