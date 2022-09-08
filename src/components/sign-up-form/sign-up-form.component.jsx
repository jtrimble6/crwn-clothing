import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const SignUpForm = () => {
	const [ formFields, setFormFields ] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	console.log(formFields);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// check that passwords match
		if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Email already in use');
			} else {
				console.log('user creation encountered an error', err);
			}
		}

		// create user document
		let user = {
			displayName: displayName,
			email: email,
			password: password
		};
		console.log(user);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					required
					text="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
				/>

				<FormInput label="Email" required type="email" name="email" value={email} onChange={handleChange} />

				<FormInput
					label="Password"
					required
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
				/>

				<FormInput
					label="Confirm Password"
					required
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
				/>
				<Button buttonType="default" type="submit">
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
