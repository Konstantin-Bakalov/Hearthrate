import logo from './assets/hearthstone.png';

export function Header() {
    return (
        <div className="w-full fixed p-2 bg-slate-500">
            <div className="flex gap-7 ml-7">
                <a href={'/'} className="flex gap-2  cursor-pointer">
                    <img className="w-12" src={logo} />
                    <h1 className="text-3xl self-center">Hearthrate</h1>
                </a>

                <a href={'/results'} className="text-3xl self-center">
                    Results
                </a>
            </div>
        </div>
    );
}
