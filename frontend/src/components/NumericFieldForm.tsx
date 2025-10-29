import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  createNumericFieldFormSchema,
  handleNumericInput,
} from "@/lib/utils.ts";
import { useMemo } from "react";

type ConsumptionMinFormProps = {
  id: string;
  label: string;
  placeholder: string;
  setOwnValue: (ownValue: number | null) => void;
  otherValue: number | null;
  maxAllowed: number;
  fieldName: string;
  schemaMod: "min" | "max";
  setDsParam: (v: string) => void;
};

export default function NumericFieldForm({
  id,
  label,
  placeholder,
  setOwnValue,
  otherValue,
  maxAllowed,
  fieldName,
  schemaMod,
  setDsParam,
}: ConsumptionMinFormProps) {


  const schema = useMemo(
    () =>
      createNumericFieldFormSchema(
        fieldName,
        maxAllowed,
        otherValue,
        schemaMod,
      ),
    [fieldName, maxAllowed, otherValue, schemaMod],
  );

  const form = useForm({
    defaultValues: {
      [fieldName]: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      setOwnValue(
        value[fieldName] === "" ? null : parseFloat(value[fieldName]),
      );
      setDsParam(value[fieldName]);
    },
  });

  return (
    <div>
      <form
        id={id}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name={fieldName}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="decimal"
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur();
                      if (field.state.meta.isDirty) {
                        form.handleSubmit();
                      }
                    }}
                    onChange={(e) => handleNumericInput(e, field.handleChange)}
                    aria-invalid={isInvalid}
                    placeholder={placeholder}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
