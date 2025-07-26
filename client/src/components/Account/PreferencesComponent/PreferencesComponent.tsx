import React, { useState } from 'react';
import { 
  Settings,
  Bell,
  Mail
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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
  const [showPreferences, setShowPreferences] = useState(true);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleToggleNotifications = (value: boolean) => {
    setLocalPreferences(prev => ({
      ...prev,
      notifications: value
    }));
    
    if (onToggleNotifications) {
      onToggleNotifications(value);
    }
  };

  const handleToggleEmailUpdates = (value: boolean) => {
    setLocalPreferences(prev => ({
      ...prev,
      emailUpdates: value
    }));
    
    if (onToggleEmailUpdates) {
      onToggleEmailUpdates(value);
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
        <div className="px-4 pt-4 pb-4 space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors min-h-[72px]">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Bell className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">Notificações</div>
                <div className="text-xs text-slate-400">Receber notificações push</div>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <Switch
                checked={localPreferences.notifications}
                onCheckedChange={handleToggleNotifications}
                className="!w-11 !h-6 [&>span]:bg-white [&>span]:border-white"
                style={{ minWidth: '44px', minHeight: '24px', width: '44px', height: '24px' }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors min-h-[72px]">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">Email Updates</div>
                <div className="text-xs text-slate-400">Receber atualizações por email</div>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <Switch
                checked={localPreferences.emailUpdates}
                onCheckedChange={handleToggleEmailUpdates}
                className="!w-11 !h-6 [&>span]:bg-white [&>span]:border-white"
                style={{ minWidth: '44px', minHeight: '24px', width: '44px', height: '24px' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesComponent;