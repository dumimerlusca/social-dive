import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...rest }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        className={classNames(
          'bg-primary rounded-3xl px-10 py-3 text-xl w-full outline-none focus:ring-1 ring-secondary',
          className,
        )}
        {...rest}
      />
      {error && <p className='text-red-500 mt-3 ml-5'>{error} </p>}
    </div>
  );
});

export default Input;
