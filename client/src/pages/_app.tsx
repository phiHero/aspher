import '../styles/_globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType;
    Title?: string;
    Description?: string;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      <Head>
        <title>{Component?.Title}</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta name='keywords' content='Watch, Films, Movies, Free' />
        {Component?.Description && (
          <meta name='description' content={Component.Description} />
        )}
      </Head>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
