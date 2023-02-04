import AppRoutes from 'AppRoutes';
import { useLoginApi } from 'common/hooks/useLogin';
import useWindowWidth from 'common/hooks/useWindowWidth';
import Notification from 'components/Notification';
import { useEffect } from 'react';

function App() {
  useWindowWidth();
  const { execute } = useLoginApi();
  useEffect(() => {
    // THIS IS JUST TO ACTIVATE THE API FASTER IF IT IS INACTIVE
    execute({ email: '', password: '' });
  }, [execute]);
  return (
    <>
      <AppRoutes />
      <Notification />
    </>
  );
}

export default App;
