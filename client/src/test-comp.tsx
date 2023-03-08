import { useQuery } from 'react-query';

export function TestComp() {
    const query = useQuery(['get'], async () => {
        const result = await fetch('http://127.0.0.1:5000');

        return await result.json();
    });

    console.log(query.data);

    return <div>{JSON.stringify(query.data)}</div>;
}
