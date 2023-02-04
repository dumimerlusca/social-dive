import ErrorBoundary from 'components/ErrroBoundary';
import React from 'react';
import ReactDOM from 'react-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import App from './App';

import { TolgeeProvider } from '@tolgee/react';
import 'common/styles/tippyThemes.scss';
import LoadUserLoadingScreen from 'components/routes/LoadUserLoadingScreen';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter } from 'react-router-dom';
import { SocketContextProvider } from 'socket/socketContext';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import './index.scss';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SocketContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <SkeletonTheme
              baseColor='#1D1C21'
              highlightColor='rgba(135, 255, 239,0.2)'
              borderRadius={10}
              duration={1}
            >
              <TolgeeProvider
                apiUrl={process.env.REACT_APP_TOLGEE_API_URL}
                apiKey={process.env.REACT_APP_TOLGEE_API_KEY}
                fallbackLanguage='en'
                loadingFallback={<LoadUserLoadingScreen />}
              >
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </TolgeeProvider>
            </SkeletonTheme>
          </SocketContextProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
