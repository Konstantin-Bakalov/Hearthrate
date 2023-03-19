interface RatingProps {
    votedFor: number;
    votedAgainst: number;
}

export function Rating({ votedFor, votedAgainst }: RatingProps) {
    return (
        <div className="flex justify-center gap-5">
            <p className="text-xl">Votes for: {votedFor}</p>
            <p className="text-xl">Votes against: {votedAgainst}</p>
        </div>
    );
}
