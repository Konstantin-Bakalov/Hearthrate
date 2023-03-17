import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './footer';
import { Header } from './header';
import { ResultsPage } from './results-page';
import { VotingPage } from './voting-page';

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
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Header />
                <Routes>
                    <Route path="/" element={<VotingPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </QueryClientProvider>
        </BrowserRouter>
    );
}
