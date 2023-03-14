import { useState } from 'react';
import { config } from './config';

export function TestComp() {
    const [cardId, setCardId] = useState(0);
    return (
        <div className="text-3xl font-bold bg-cyan-100 border-4 border-red-500">
            <button
                onClick={() =>
                    setCardId((prev) => {
                        if (prev < 381) {
                            return prev + 1;
                        }

                        return prev;
                    })
                }
            >
                +
            </button>
            <button
                onClick={() =>
                    setCardId((prev) => {
                        if (prev > 0) {
                            return prev - 1;
                        }

                        return prev;
                    })
                }
            >
                -
            </button>
            <div className="flex">
                <button className="active:animate-ping">
                    <img src={`${config.bucketUrl}/${cardId}.png`} />
                </button>
                <img
                    src={`https://hearthrate-bucket.s3.eu-central-1.amazonaws.com/${cardId}.png`}
                />
            </div>
        </div>
    );
}
