import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

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
      {error && <InputErrorMessage message={error} />}
    </div>
  );
});

export default Input;

export const InputErrorMessage = ({ message }: { message: string }) => {
  return <p className='text-red-500 mt-3 ml-5'>{message} </p>;
};
