'use client';

import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface FormTextareaProps {
  name: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  rows?: number;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormTextarea = ({
  name,
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  placeholder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validation,
  rows = 4,
  label,
  required,
  disabled,
  className,
}: FormTextareaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className={`mb-4 flex flex-col`}>
      {label && (
        <label className="mb-2 font-semibold text-gray-200">
          {label} {required && <span className="">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const fieldValue = value !== undefined ? value : field.value || '';
          return (
            <textarea
              placeholder={placeholder}
              {...field}
              value={fieldValue}
              rows={rows}
              required={required}
              disabled={disabled}
              className={` ${className}`}
            />
          );
        }}
      />
      <small className="text-red-500">{errorMessage}</small>
    </div>
  );
};

export default FormTextarea;
