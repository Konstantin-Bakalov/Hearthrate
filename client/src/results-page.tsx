import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Card } from './card';
import { LoadingIndicator } from './loading-indicator';
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

    const { isLoading: scrollLoading } = useQuery(
        ['get-page', page],
        async () => {
            const response = await axios.get<CardData[]>(
                `results?page=${page}`,
            );
            setCards((prev) => [...prev, ...response.data]);
            setSearchParams(new URLSearchParams({ page: String(page) }));
        },
    );

    const nextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="flex flex-col gap-10 bg-background">
            <h1 className="self-center text-2xl">Results</h1>
            {cards.map((card, index) => (
                <div className="self-center" key={index}>
                    <Card
                        cardImage={card.cardImage}
                        nextPage={nextPage}
                        isLast={index == cards.length - 1}
                    />

                    <Rating
                        votedFor={card.votedFor}
                        votedAgainst={card.votedAgainst}
                    />
                </div>
            ))}
            {scrollLoading && <LoadingIndicator />}
        </div>
    );
}
