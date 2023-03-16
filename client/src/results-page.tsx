import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Card } from './card';
import { useAsync } from './hooks/use-async';
import axios from './main';

interface CardData {
    cardImage: string;
    votedFor: number;
    votedAgainst: number;
}

const getPage = async (page: number) => {
    const response = await axios.get(`results?page=${page}`);
    return await response.data;
};

export function ResultsPage() {
    const [page, setPage] = useState(0);
    const [cards, setCards] = useState<CardData[]>([]);

    const { loading: scrollLoading } = useAsync(async () => {
        const response = await axios.get(`results?page=${page}`);
        setCards((prev) => [...prev, ...response.data]);
    }, [page]);

    const nextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="flex flex-col bg-slate-500">
            <div>Results</div>
            {cards?.map((card, index) => (
                <div className="self-center" key={index}>
                    <Card
                        cardImage={card.cardImage}
                        nextPage={nextPage}
                        isLast={index == cards.length - 1}
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
