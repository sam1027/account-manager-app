import {Outlet} from 'react-router-dom';
import Header from './components/Header';

function Root() {
    return (
        <div>
            <Header />
            <main className='container'>
                <Outlet/>
            </main>
        </div>
    );
}

export default Root;