import { QueryClient, QueryClientProvider } from 'react-query';
import { TestComp } from './test-comp';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: Infinity,
        },
    },
});

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TestComp />
        </QueryClientProvider>
    );
}
