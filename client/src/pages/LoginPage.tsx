import LoginForm from "components/auth/LoginForm";
import Header from "components/layout/Header";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
	return (
		<div className='container'>
			<Header />
			<div className='mt-28'>
				<h1 className='text-5xl font-bold mb-6'>Login to your account</h1>
				<div className='flex items-center gap-10'>
					<p className='font-bold text-[rgba(255,255,255,0.64)]'>
						Don't have an account yet?
					</p>
					<Link className='text-secondary font-bold' to='/register'>
						Sign Up!
					</Link>
				</div>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
