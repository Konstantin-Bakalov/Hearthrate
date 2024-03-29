import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Alert } from '../components/alert';
import { Card } from '../components/card';
import { LoadingIndicator } from '../components/loading-indicator';
import axios from '../main';
import { Rating } from '../components/rating';

interface CardData {
    cardImage: string;
    votedFor: number;
    votedAgainst: number;
}

export function ResultsPage() {
    const [page, setPage] = useState(1);
    const [cards, setCards] = useState<CardData[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const { isLoading: scrollLoading, error } = useQuery(
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
        <div className="bg-emerald-100 flex flex-col grow gap-10">
            <h1 className="mt-44 md:mt-24 self-center text-4xl">Results</h1>
            {Boolean(error) && <Alert />}
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
