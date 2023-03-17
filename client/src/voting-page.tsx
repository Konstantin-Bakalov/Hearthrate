import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from './main';

interface Card {
    id: number;
    image: string;
}

interface Response {
    firstCard: Card;
    secondCard: Card;
}

interface Vote {
    votedForId: number;
    votedAgainstId: number;
}

const postVote = (vote: Vote) => {
    return axios.post('vote', vote);
};

const getTwoRandomCards = async () => {
    const response = await axios.get('cards');
    return response.data;
};

export function VotingPage() {
    const queryClient = useQueryClient();
    const [effect, setEffect] = useState(false);

    const { data } = useQuery<Response>(
        'get-two-random-cards',
        getTwoRandomCards,
    );

    const { mutate } = useMutation(postVote, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-two-random-cards');
        },
    });

    return (
        <div className="h-full bg-yellow-900 flex flex-col">
            <h2 className="text-4xl self-center">Which card is cooler?</h2>
            {data && (
                <div className="h-full flex justify-center items-center gap-10 font-bold">
                    <button
                        className="hover:animate-wiggle ease-in-out"
                        onClick={() =>
                            mutate({
                                votedForId: data.firstCard.id,
                                votedAgainstId: data.secondCard.id,
                            })
                        }
                    >
                        <img src={data.firstCard.image} />
                    </button>
                    <button
                        onClick={() =>
                            mutate({
                                votedForId: data.secondCard.id,
                                votedAgainstId: data.firstCard.id,
                            })
                        }
                    >
                        <img src={data.secondCard.image} />
                    </button>
                </div>
            )}
        </div>
    );
}
