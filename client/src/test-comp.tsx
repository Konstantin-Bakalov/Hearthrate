import { useQuery } from 'react-query';
import { config } from './config';

export function TestComp() {
    const query = useQuery(['get'], async () => {
        const result = await fetch(config.serverUrl);
        return await result.json();
    });

    return (
        <div className="text-3xl font-bold bg-cyan-100 border-4 border-red-500">
            {JSON.stringify(query.data)}
        </div>
    );
}
