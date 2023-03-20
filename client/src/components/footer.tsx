const gitHub = 'https://github.com/Konstantin-Bakalov/Hearthrate';

export function Footer() {
    return (
        <div className="bg-slate-500 mt-auto flex justify-center gap-7 p-2 shadow-2xl">
            <h1 className="text-xl">Copyright © 2023 Konstantin Bakalov</h1>
            <a className="text-xl" href={gitHub} target="_blank">
                GitHub
            </a>
        </div>
    );
}
