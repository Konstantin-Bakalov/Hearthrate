import { useQuery } from 'react-query';

export function TestComp() {
    const query = useQuery(['get'], async () => {
        const result = await fetch(import.meta.env.VITE_APP_SERVER_URL);

        return await result.json();
    });

    return <div>{JSON.stringify(query.data)}</div>;
}
