import React, { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...rest }, ref) => {
		return (
			<input
				ref={ref}
				className={classNames(
					"bg-primary rounded-3xl px-10 py-3 text-xl w-full outline-none focus:ring-1 ring-secondary",
					className
				)}
				{...rest}
			/>
		);
	}
);

export default Input;
