import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Card } from './card';
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

    // const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(0);
    const nextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="flex flex-col bg-slate-500">
            <div>Results</div>
            {data?.map((card, index) => (
                <div className="self-center" key={index}>
                    <Card
                        cardImage={card.cardImage}
                        nextPage={nextPage}
                        isLast={index == data.length - 1}
                    />
                    <div className="flex justify-around">
                        <div>Voted for: {card.votedFor}</div>
                        <div>Voted against: {card.votedAgainst}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
