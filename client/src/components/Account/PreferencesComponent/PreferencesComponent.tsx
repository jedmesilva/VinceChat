import React, { useState } from 'react';
import { 
  Settings,
  Bell,
  Mail
} from 'lucide-react';

interface Preferences {
  notifications: boolean;
  emailUpdates: boolean;
}

interface PreferencesComponentProps {
  preferences: Preferences;
  onToggleNotifications?: (value: boolean) => void;
  onToggleEmailUpdates?: (value: boolean) => void;
  showCollapsed?: boolean;
}

const PreferencesComponent: React.FC<PreferencesComponentProps> = ({ 
  preferences,
  onToggleNotifications,
  onToggleEmailUpdates,
  showCollapsed = false 
}) => {
  const [showPreferences, setShowPreferences] = useState(!showCollapsed);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleToggleNotifications = () => {
    const newValue = !localPreferences.notifications;
    setLocalPreferences(prev => ({
      ...prev,
      notifications: newValue
    }));
    
    if (onToggleNotifications) {
      onToggleNotifications(newValue);
    }
  };

  const handleToggleEmailUpdates = () => {
    const newValue = !localPreferences.emailUpdates;
    setLocalPreferences(prev => ({
      ...prev,
      emailUpdates: newValue
    }));
    
    if (onToggleEmailUpdates) {
      onToggleEmailUpdates(newValue);
    }
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6">
      {showCollapsed ? (
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setShowPreferences(!showPreferences)}
        >
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-violet-400" />
            <h3 className="text-lg font-semibold text-white">Preferências</h3>
          </div>
          <div className={`w-5 h-5 text-slate-400 transform transition-transform ${showPreferences ? 'rotate-90' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-4 border-b border-slate-600/30">
          <Settings className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Preferências</h3>
        </div>
      )}
      
      {showPreferences && (
        <div className="px-4 pb-4 space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm font-medium text-white">Notificações</div>
                <div className="text-xs text-slate-400">Receber notificações push</div>
              </div>
            </div>
            <button
              onClick={handleToggleNotifications}
              className={`w-12 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50 ${
                localPreferences.notifications ? 'bg-violet-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                localPreferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm font-medium text-white">Email Updates</div>
                <div className="text-xs text-slate-400">Receber atualizações por email</div>
              </div>
            </div>
            <button
              onClick={handleToggleEmailUpdates}
              className={`w-12 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50 ${
                localPreferences.emailUpdates ? 'bg-violet-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                localPreferences.emailUpdates ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesComponent;