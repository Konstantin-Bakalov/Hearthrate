import { useState } from 'react';
import { useQuery } from 'react-query';
import { Card } from './card';
import { useAsync } from './hooks/use-async';
import axios from './main';
import { Rating } from './rating';

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
    const [page, setPage] = useState(0);
    // const [cards, setCards] = useState<CardData[]>([]);

    // const { loading: scrollLoading } = useAsync(async () => {
    //     const response = await axios.get(`results?page=${page}`);
    //     setCards((prev) => [...prev, ...response.data]);
    // }, [page]);

    const { data } = useQuery<CardData[]>(['get-page'], () => getPage(1));

    const nextPage = () => setPage((prev) => prev + 1);

    return (
        <div className="flex flex-col bg-slate-500">
            <div>Results</div>
            {data?.map((card, index) => (
                <div className="self-center" key={index}>
                    <Card
                        cardImage={card.cardImage}
                        nextPage={nextPage}
                        isLast={index == data?.length - 1}
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
