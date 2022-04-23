import Button from "components/Button/Button";
import Input from "components/Input/Input";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import useClickOutside from "common/hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "store/store";
import { loginUserAction } from "store/auth/authActions";
import { useNavigate } from "react-router";

export type UserOnLoginType = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const { error, isLoading, isLoggedIn } = useAppSelector(state => state.auth);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<UserOnLoginType>();

	const onSubmit = (data: any) => {
		dispatch(loginUserAction(data));
	};

	useClickOutside(formRef, () => {
		clearErrors();
	});

	return (
		<form
			ref={formRef}
			className='mt-7 flex flex-col gap-5 w-full max-w-md'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<Input
					placeholder='Email...'
					className={classNames(
						errors.email &&
							"border border-red-500 focus:ring-red-500 focus:ring-2"
					)}
					{...register("email", {
						required: "Email required",
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Please enter a valid email",
						},
					})}
				/>
				<p className='text-red-500 mt-3 ml-5'>{errors.email?.message} </p>
			</div>
			<div>
				<Input
					placeholder='Password...'
					type='password'
					className={classNames(
						errors.password &&
							"border border-red-500 focus:ring-red-500 focus:ring-2"
					)}
					{...register("password", {
						required: "Password required",
						minLength: {
							value: 6,
							message: "Password can't have less than 4 characters",
						},
						maxLength: {
							value: 16,
							message: "Password can' have more than 16 characters",
						},
					})}
				/>
				<p className='text-red-500 mt-3 ml-5'>{errors.password?.message} </p>
			</div>
			{error && <p className='p-1 text-red-500'>{error}</p>}
			<Button className='w-full mt-5' color='secondary'>
				{isLoading ? "Loading..." : "Log In"}
			</Button>
		</form>
	);
};

export default LoginForm;
