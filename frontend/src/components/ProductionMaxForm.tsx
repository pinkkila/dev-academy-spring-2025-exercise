import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useDSParams } from "@/lib/hooks.ts";
import { handleNumericInput } from "@/lib/utils.ts";

type ProductionMacFormProps = {
  schema: z.ZodObject<{ maxTotalProduction: z.ZodString }>;
  setMaxValue: (maxValue: number | null) => void;
}

export default function ProductionMaxForm({ schema, setMaxValue }: ProductionMacFormProps) {
  const { setMaxProduction } = useDSParams()

  const form = useForm({
    defaultValues: {
      maxTotalProduction: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      setMaxValue(value.maxTotalProduction === "" ? null : parseFloat(value.maxTotalProduction));
      setMaxProduction(value.maxTotalProduction);
    },
  });

  return (
    <div>
      <form
        id="productoin-filter-form-max"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="maxTotalProduction"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Maximum Total Production:</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="decimal"
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur()
                      if (field.state.meta.isDirty) {
                        form.handleSubmit();
                      }
                    }}
                    onChange={(e) => handleNumericInput(e, field.handleChange)}
                    aria-invalid={isInvalid}
                    placeholder="Maximum"
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
