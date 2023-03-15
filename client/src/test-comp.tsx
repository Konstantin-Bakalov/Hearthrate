import { useQuery } from 'react-query';
import { config } from './config';

export function TestComp() {
    const { data, isLoading } = useQuery('get-two-random-cards', async () => {
        const result = await fetch(`${config.serverUrl}/cards`);

        return await result.json();
    });

    return (
        <div>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <div className="text-3xl flex font-bold bg-cyan-100 border-4 border-red-500">
                    <img src={data.first_card.image} />
                    <img src={data.second_card.image} />
                </div>
            )}
        </div>
    );
}
