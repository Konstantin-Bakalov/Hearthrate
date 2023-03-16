import { useQuery } from 'react-query';
import axios from './main';

interface CardData {
    cardImage: string;
    votedFor: number;
    votedAgainst: number;
}

const getPage = async (page: number) => {
    const response = await axios.get(`results?page=${page}`);
    return response.data;
};

export function ResultsPage() {
    const { data } = useQuery<CardData[]>('get-card-page', () => getPage(0));

    return (
        <div className="flex flex-col bg-slate-500">
            <div>Results</div>
            {data?.map((card, index) => (
                <div className="self-center" key={index}>
                    <img src={card.cardImage} />
                    <div>Voted for: {card.votedFor}</div>
                    <div>Voted against: {card.votedAgainst}</div>
                </div>
            ))}
        </div>
    );
}
