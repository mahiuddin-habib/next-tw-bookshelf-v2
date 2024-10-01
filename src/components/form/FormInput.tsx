'use client';

import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface IInput {
  name: string;
  type?: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormInput = ({
  name,
  type = 'text',
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  placeholder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validation,
  label,
  required,
  disabled,
  className,
}: IInput) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div>
      <label className="mb-1 block font-semibold">
        {label ? label : null}
        {required ? <span className="">*</span> : null}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const fieldValue = value !== undefined ? value : field.value || ''; // Ensure fieldValue is never undefined

          return type === 'password' ? (
            <span className="relative">
              <input
                type={isPasswordShow ? 'text' : 'password'}
                placeholder={placeholder}
                {...field}
                value={fieldValue} // Use controlled value
                required={required}
                disabled={disabled}
                className={`${className} w-full py-2 pr-8`}
              />
              <span className="absolute right-0 top-0 flex h-full items-center pr-2">
                {isPasswordShow ? (
                  <FaEye
                    className="cursor-pointer text-lg text-gray-300"
                    onClick={() => setIsPasswordShow(!isPasswordShow)}
                  />
                ) : (
                  <FaEyeSlash
                    className="cursor-pointer text-lg text-gray-300"
                    onClick={() => setIsPasswordShow(!isPasswordShow)}
                  />
                )}
              </span>
            </span>
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              {...field}
              value={fieldValue} // Use controlled value
              required={required}
              disabled={disabled}
              className={`${className} w-full py-2`}
            />
          );
        }}
      />
      <small className="text-red-500">{errorMessage}</small>
    </div>
  );
};

export default FormInput;
