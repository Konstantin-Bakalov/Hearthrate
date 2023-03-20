import { Link } from 'react-router-dom';
import logo from '../assets/hearthstone.png';

export function Header() {
    return (
        <div className="w-full z-10 fixed p-2 bg-slate-500 drop-shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2 md:gap-7 md:ml-7">
                <Link to={'/'} className="flex self-center gap-2">
                    <img className="w-12" src={logo} />
                    <h1 className="text-3xl self-center">Hearthrate</h1>
                </Link>

                <Link to={'results'} className="self-center">
                    <h1 className="text-3xl">Results</h1>
                </Link>
            </div>
        </div>
    );
}
