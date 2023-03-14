const serverUrl = import.meta.env.VITE_APP_SERVER_URL;
const bucketUrl = import.meta.env.VITE_BUCKET_URL;

if (!serverUrl) {
    throw new Error('VITE_APP_SERVER_URL must be set');
}

if (!bucketUrl) {
    throw new Error('BUCKET_URL must be set');
}

export const config = {
    serverUrl,
    bucketUrl,
};
