import { Link } from 'react-router-dom';

import Logo from '../../assets/Images/WARIZ LOGO.png';

function Navbar() {

    return (
        <nav className='navbar'>
            <Link to="/">
                <img className='logo' width={60} src={Logo} alt="The wariz wordmark logo" />
            </Link>
        </nav>
    )
}
export default Navbar;