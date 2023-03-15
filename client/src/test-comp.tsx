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

export function TestComp() {
    const queryClient = useQueryClient();

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
        <div>
            {data && (
                <div className="text-3xl flex justify-center font-bold bg-cyan-100 border-4 border-red-500">
                    <button
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
