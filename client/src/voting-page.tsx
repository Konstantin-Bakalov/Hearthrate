import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Alert } from './alert';
import { LoadingIndicator } from './loading-indicator';
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

    const { data, isLoading, error } = useQuery<Response>(
        'get-two-random-cards',
        getTwoRandomCards,
    );

    const { mutate } = useMutation(postVote, {
        onSuccess: () => {
            queryClient.invalidateQueries('get-two-random-cards');
        },
    });

    return (
        <div className="bg-emerald-100 grow flex flex-col">
            <h1 className="mt-24 text-4xl self-center">
                Which card is cooler?
            </h1>
            {isLoading && <LoadingIndicator />}
            {Boolean(error) && <Alert />}
            {data && (
                <div className="h-full flex justify-center items-center gap-10">
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
                    <h1 className="text-3xl">or</h1>
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
