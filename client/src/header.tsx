import { Link } from 'react-router-dom';
import logo from './assets/hearthstone.png';

export function Header() {
    return (
        <div className="w-full fixed p-2 bg-slate-500">
            <div className="flex gap-7 ml-7">
                <Link to={'/'} className="flex gap-2">
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
