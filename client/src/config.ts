const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

if (!serverUrl) {
    throw new Error('VITE_APP_SERVER_URL must be set');
}

export const config = {
    serverUrl,
};
