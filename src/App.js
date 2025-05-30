import React from 'react';
import Layout from './components/Layout';
import TrackingForm from './components/TrackingForm';
import TrackingResult from './components/TrackingResult';
import { useTracking } from './hooks/useTracking';
function App() {
  const { loading, trackingResult, error, trackPackage, clearResults } = useTracking()
  return (
      <Layout>
        <TrackingForm onSubmit={trackPackage} loading={loading} />
        <TrackingResult
            result={trackingResult}
            error={error}
            onClear={clearResults}
        />
      </Layout>
  );
}
export default App;