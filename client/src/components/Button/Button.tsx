import React from 'react';
import classnames from 'classnames';

type ButtonColorType = 'primary' | 'secondary' | 'danger' | 'outline-primary' | 'outline-secondary';

type ButtonPropTypes = {
  onClick?: () => void;
  color?: ButtonColorType;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: unknown;
};

const defaultStyles =
  'py-2 px-4 font-bold text-center rounded-2xl hover:opacity-75 transition-all duration-300 whitespace-nowrap';
const primaryStyles = 'bg-primary';
const secondaryStyles = 'bg-secondary';
const danger = 'bg-red-500';
const outlinePrimary = 'border border-primary';
const outlineSecondary = 'border border-secondary';

const Button: React.FC<ButtonPropTypes> = ({
  children,
  onClick,
  color = 'primary',
  className,
  disabled = false,
  type,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        defaultStyles,
        getColorClassName(color),
        { 'opacity-80 text-gray-500 cursor-not-allowed hover:!bg-none': disabled },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;

function getColorClassName(color: ButtonColorType) {
  switch (color) {
    case 'primary':
      return primaryStyles;
    case 'secondary':
      return secondaryStyles;
    case 'danger':
      return danger;
    case 'outline-secondary':
      return outlineSecondary;
    case 'outline-primary':
      return outlinePrimary;
    default:
      return primaryStyles;
  }
}
