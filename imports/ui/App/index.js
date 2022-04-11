/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Lib dependencies
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';

// UI local components
import MainRouter from '../routers/MainRouter';

// Style
import './index.less';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
/**
 * Main application component
 * @returns {React.ELement} Application root component
 */
function App() {
  // Set app locale after initial mounting
  useEffect(() => {
    function getLang() {
      return (
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.browserLanguage ||
        navigator.userLanguage ||
        'en-US'
      );
    }
    i18n.setLocale(getLang());
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
