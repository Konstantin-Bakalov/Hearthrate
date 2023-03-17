import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from './card';
import { useAsync } from './hooks/use-async';
import axios from './main';
import { Rating } from './rating';

interface CardData {
    cardImage: string;
    votedFor: number;
    votedAgainst: number;
}

export function ResultsPage() {
    const [page, setPage] = useState(1);
    const [cards, setCards] = useState<CardData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const { loading: scrollLoading } = useAsync(async () => {
        const response = await axios.get<CardData[]>(`results?page=${page}`);
        setCards((prev) => [...prev, ...response.data]);
        setSearchParams(new URLSearchParams({ page: String(page) }));
    }, [page]);

    const nextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="flex flex-col bg-slate-500">
            <div>Results</div>
            {cards.map((card, index) => (
                <div className="self-center" key={index}>
                    <Card
                        cardImage={card.cardImage}
                        nextPage={nextPage}
                        isLast={index == cards.length - 1}
                    />
                    <div className="flex justify-around">
                        <Rating
                            votedFor={card.votedFor}
                            votedAgainst={card.votedAgainst}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
