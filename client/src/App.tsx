import { TolgeeProvider } from '@tolgee/react';
import AppRoutes from 'AppRoutes';
import useWindowWidth from 'common/hooks/useWindowWidth';
import Notification from 'components/Notification';
import LoadUserLoadingScreen from 'components/routes/LoadUserLoadingScreen';

function App() {
  useWindowWidth();
  return (
    <>
      <TolgeeProvider
        apiUrl={process.env.REACT_APP_TOLGEE_API_URL}
        apiKey={process.env.REACT_APP_TOLGEE_API_KEY}
        fallbackLanguage='en'
        loadingFallback={<LoadUserLoadingScreen />}
      >
        <AppRoutes />
        <Notification />
      </TolgeeProvider>
    </>
  );
}

export default App;
