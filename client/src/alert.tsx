export function Alert() {
    return (
        <div
            className="self-center rounded-lg bg-red-100 py-4 px-3 text-base text-danger-700"
            role="alert"
        >
            <h1 className="text-red-700">
                An error occurred while processing the request
            </h1>
        </div>
    );
}
