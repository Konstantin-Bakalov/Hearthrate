import { useQuery } from 'react-query';
import { config } from './config';

export function TestComp() {
    const query = useQuery(['get'], async () => {
        const result = await fetch(config.serverUrl);
        return await result.json();
    });

    return <div>{JSON.stringify(query.data)}</div>;
}
