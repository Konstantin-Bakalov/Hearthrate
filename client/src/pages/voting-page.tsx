import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Alert } from '../components/alert';
import { LoadingIndicator } from '../components/loading-indicator';
import axios from '../main';

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
            <h1 className="mt-44 md:mt-24 text-4xl text-center">
                Which card is cooler?
            </h1>
            {isLoading && <LoadingIndicator />}
            {Boolean(error) && <Alert />}
            {data && (
                <div className="h-full mt-16 md:mt-0 flex flex-col md:flex-row justify-center items-center gap-10">
                    <button
                        className="hover:-translate-y-16 ease-in-out duration-1000"
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
                        className="hover:-translate-y-16 ease-in-out duration-1000"
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
