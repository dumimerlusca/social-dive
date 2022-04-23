import classNames from "classnames";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputWithIconProps {
	wrapperClassName?: string;
	className?: string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	inputProps: InputHTMLAttributes<HTMLInputElement>;
}

const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
	({ className, inputProps, endIcon, startIcon, wrapperClassName }, ref) => {
		return (
			<div
				className={classNames(
					"flex items-center gap-5 bg-primary px-5 py-3 rounded-3xl text-xl",
					wrapperClassName
				)}
			>
				{startIcon}
				<input
					ref={ref}
					className={classNames(
						"w-full h-full outline-none bg-transparent",
						className
					)}
					{...inputProps}
				/>
				{endIcon && <div className='ml-auto'>{endIcon}</div>}
			</div>
		);
	}
);

export default InputWithIcon;
