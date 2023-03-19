import { useEffect, useRef } from 'react';
import { useObserver } from '../hooks/use-observer';

interface CardProps {
    cardImage: string;
    isLast: boolean;
    nextPage: () => void;
}

const options = {
    root: null,
    rootMargin: '100px',
    threshhold: 0.5,
};

export function Card({ cardImage, isLast, nextPage }: CardProps) {
    const ref = useRef(null);
    const entry = useObserver(ref, options);

    useEffect(() => {
        if (!entry) return;

        if (isLast && entry.isIntersecting) {
            nextPage();
        }
    }, [entry]);

    return (
        <div ref={ref}>
            <img src={cardImage} />
        </div>
    );
}
