import { useApp } from '../context/AppContext';
import LucidIcons from './LucidIcons';

export default function SettingsButton() {
  const { setShowSettings } = useApp();
  
  return (
    <button 
      className="settings-button"
      onClick={() => setShowSettings(true)}
      aria-label="Settings"
      title="API Key Settings"
    >
      <LucidIcons.Settings />
    </button>
  );
}
