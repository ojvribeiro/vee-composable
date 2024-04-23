import { useForm, useResetForm, useIsFormTouched } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export function useFormValidation(options: Record<string, any> = {}) {
  const form = ref<Record<string, any>>({});
  const schemaMeta = ref<Record<string, any>>({});

  let yupObject = `yup`

  Object.values(options).forEach((value: string | Record<string, any>) => {
    // objects are expected to be yup objects with value as the params, strings are expected to be the validation type
    // eg: ["string", { min: 6 }, "required"]
    if (typeof value === "object") {
      value = Object.entries(value).map(([key, val]) => {
        yupObject = yupObject.concat(`.${key}(${val})`);
      })
      
    } else {
      yupObject = yupObject.concat(`.${value}()`);
    }
  });

  // Creates a yup object
  const schemaObject = new Function(`return ${yupObject}`)();
  schemaMeta.value = schemaObject;

  

  // Creates a typed schema for vee-validate
  const schema = computed(() =>
    toTypedSchema(
      yup.object({
        ...schemaMeta.value,
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
