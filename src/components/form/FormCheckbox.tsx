'use client';

import { ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface ICheckbox {
  name: string;
  id?: string;
  label?: string | ReactNode;
  required?: boolean;
  className?: string;
}

const FormCheckbox = ({ name, id, label, required, className }: ICheckbox) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string;

  return (
    <>
      <label className="flex items-center space-x-3">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type="checkbox"
              id={id}
              {...field}
              checked={!!field.value} // Handle the checked state correctly
              required={required}
              className={`${className}`}
            />
          )}
        />
        <span>
          {label}
          {required ? <span>*</span> : null}
        </span>
      </label>
      <small className="text-red-500">{errorMessage}</small>
    </>
  );
};

export default FormCheckbox;
