import { AppProvider } from './context/AppContext';
import Workspace from './components/Workspace';
import SettingsButton from './components/SettingsButton';
import SettingsPanel from './components/SettingsPanel';
import './styles/nike-aesthetic.css';
import './styles/settings-panel.css';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="nike-container">
        <Workspace />
        <SettingsButton />
        <SettingsPanel />
        <div className="nike-noise"></div>
      </div>
    </AppProvider>
  );
}

export default App;
