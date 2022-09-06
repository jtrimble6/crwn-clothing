// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils';
import SignUpForm from '../../sign-up-form/sign-up-form.component';

const SignIn = () => {
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const response = await getRedirectResult(auth);
	// 		if (response) {
	// 			const userDocRef = await createUserDocumentFromAuth(response.user);
	// 		}
	// 	}
	// 	fetchData();
	// }, []);

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<SignUpForm />
			{/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
		</div>
	);
};

export default SignIn;