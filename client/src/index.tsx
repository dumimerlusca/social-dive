import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import ErrorBoundary from 'components/ErrroBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SkeletonTheme } from 'react-loading-skeleton';

import './index.scss';
import 'tippy.js/dist/tippy.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { SocketContextProvider } from 'socket/socketContext';
import { NewsfeedContextProvider } from 'modules/posts/context/newsfeedContext';

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
              <App />
            </SkeletonTheme>
          </SocketContextProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
