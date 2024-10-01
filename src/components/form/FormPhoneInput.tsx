'use client';

import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { useFormContext, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface IFormPhoneInput {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const FormPhoneInput = ({
  name,
  label,
  required = false,
  className,
}: IFormPhoneInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div>
      <label className="mb-1 block font-semibold">
        {label ? label : null}
        {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? 'This field is required' : false }}
        render={({ field }) => (
          <PhoneInput
            country={'ae'} // default country code
            value={field.value}
            onChange={field.onChange}
            inputProps={{
              required,
              className: `w-full ps-10 py-2 ${className}`,
            }}
            buttonStyle={{ border: 'none', backgroundColor: 'transparent' }}
          />
        )}
      />
      <small className="text-red-500">{errorMessage}</small>
    </div>
  );
};

export default FormPhoneInput;
