import RegisterForm from "components/auth/RegisterForm";
import Header from "components/layout/Header";
import { Link } from "react-router-dom";

const RegisterPage = () => {
	return (
		<div className='container'>
			<Header />
			<div className='mt-28'>
				<h1 className='text-5xl font-bold mb-6'>Create new account</h1>
				<div className='flex items-center gap-10'>
					<p className='font-bold text-[rgba(255,255,255,0.64)]'>
						Already A Member?
					</p>
					<Link className='text-secondary font-bold' to='/login'>
						Log In
					</Link>
				</div>
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
