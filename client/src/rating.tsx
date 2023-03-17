interface RatingProps {
    votedFor: number;
    votedAgainst: number;
}

const calculateRating = (votedFor: number, votedAgainst: number) => {
    if (votedFor + votedAgainst === 0) {
        return 0;
    }

    return (votedFor / (votedFor + votedAgainst)) * 100;
};

const formatRating = (rating: number) => {
    if (Number.isInteger(rating)) {
        return rating;
    }

    return rating.toFixed(2);
};

export function Rating({ votedFor, votedAgainst }: RatingProps) {
    const rating = calculateRating(votedFor, votedAgainst);

    return (
        <div>
            <div>
                {votedFor} {votedAgainst}
            </div>
            <div>{formatRating(rating)} %</div>
        </div>
    );
}
