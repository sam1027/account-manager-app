import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className='container'>
            <Link to={`income`}><h2>수입</h2></Link>
            <Link to={`expenditure`}><h2>지출</h2></Link>
        </header>
    );
}

export default Header;