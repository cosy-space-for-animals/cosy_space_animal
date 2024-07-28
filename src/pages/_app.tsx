import baseStyle from '@/styles/reset';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Global, ThemeProvider } from '@emotion/react';
import MainLayout from '@/components/layout/MainLayout';
import { theme } from '@/types/theme';
import { DeviceProvider } from '@/context/DeviceContext';
import RecoilContextProvider from '../lib/recoilContextProvider';
import { useRouter } from 'next/router';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const getServerSideProps = async ({ req }) => {
  const userAgent = req.headers['user-agent'];

  return {
    props: { userAgent },
  };
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  console.log(router);

  return (
    <RecoilContextProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={baseStyle} />
          <DeviceProvider userAgent={pageProps.userAgent}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </DeviceProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilContextProvider>
  );
}
