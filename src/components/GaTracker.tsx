import ReactGA from 'react-ga';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GaTracker() {
  const location = useLocation();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(process.env.REACT_APP_GA_ID as string);
    }
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [init, location]);

  return <></>;
}
