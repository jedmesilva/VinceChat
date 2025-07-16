import React from 'react';
import { Settings, Bell, Mail } from 'lucide-react';

interface PreferencesData {
  notifications: boolean;
  emailUpdates: boolean;
}

interface PreferencesProps {
  preferences: PreferencesData;
  onToggleNotifications: () => void;
  onToggleEmailUpdates: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ 
  preferences, 
  onToggleNotifications, 
  onToggleEmailUpdates 
}) => {
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Preferências</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm font-medium text-white">Notificações</div>
                <div className="text-xs text-slate-400">Receber notificações push</div>
              </div>
            </div>
            <button
              onClick={onToggleNotifications}
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                preferences.notifications ? 'bg-violet-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm font-medium text-white">Email Updates</div>
                <div className="text-xs text-slate-400">Receber atualizações por email</div>
              </div>
            </div>
            <button
              onClick={onToggleEmailUpdates}
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                preferences.emailUpdates ? 'bg-violet-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                preferences.emailUpdates ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;