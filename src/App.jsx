import { AppProvider } from './context/AppContext';
import Workspace from './components/Workspace';
import SettingsButton from './components/SettingsButton';
import './styles/nike-aesthetic.css';
import './styles/header.css';
import './styles/error-message.css';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="nike-container">
        <div className="app-header">
          <div className="header-right">
            <SettingsButton />
          </div>
        </div>
        <Workspace />
        <div className="nike-noise"></div>
      </div>
    </AppProvider>
  );
}

export default App;
