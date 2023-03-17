const gitHub = 'https://github.com/Konstantin-Bakalov/Hearthrate';

export function Footer() {
    return (
        <div className="mt-auto flex justify-center gap-7 ml-7 p-2">
            <h1 className="text-xl self-center">
                Copyright © 2023 Konstantin Bakalov
            </h1>
            <a className="text-xl self-center" href={gitHub} target="_blank">
                GitHub
            </a>
        </div>
    );
}
