import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/hearthstone.png';

export function Header() {
    const navigate = useNavigate();

    return (
        <div className="w-full fixed p-2 bg-slate-500">
            <div className="flex gap-7 ml-7">
                <Link to={'/'} className="flex gap-2  cursor-pointer">
                    <img className="w-12" src={logo} />
                    <h1 className="text-3xl self-center">Hearthrate</h1>
                </Link>

                <Link to={'results'} className="text-3xl self-center">
                    Results
                </Link>
            </div>
        </div>
    );
}
