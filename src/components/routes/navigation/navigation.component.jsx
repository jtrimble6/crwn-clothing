import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import CartIcon from '../../cart-icon/cart-icon.component.jsx';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component.jsx';

import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import { UserContext } from '../../../contexts/user.context';
import { CartContext } from '../../../contexts/cart.context';

import { signOutUser } from '../../../utils/firebase/firebase.utils';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<div>
						<CrwnLogo />
					</div>
				</LogoContainer>
				<NavLinks>
					<NavLink className="nav-link" to="/shop">
						SHOP
					</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
