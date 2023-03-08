import { QueryClient, QueryClientProvider } from 'react-query';
import { TestComp } from './test-comp';

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TestComp />
        </QueryClientProvider>
    );
}
