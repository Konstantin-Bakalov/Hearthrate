import { useQuery } from 'react-query';
import { config } from './config';

interface Card {
    id: number;
    image: string;
}

interface Response {
    first_card: Card;
    second_card: Card;
}

export function TestComp() {
    const { data } = useQuery<Response>('get-two-random-cards', async () => {
        return await (await fetch(`${config.serverUrl}/cards`)).json();
    });

    return (
        <div>
            {data && (
                <div className="text-3xl flex font-bold bg-cyan-100 border-4 border-red-500">
                    <img src={data.first_card.image} />
                    <img src={data.second_card.image} />
                </div>
            )}
        </div>
    );
}
