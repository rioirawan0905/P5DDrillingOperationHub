/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import type { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import StaffDirectory from './views/StaffDirectory';
import RotationSchedule from './views/RotationSchedule';
import TravelTracker from './views/TravelTracker';
import Login from './views/Login';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');

  if (currentView === 'login') {
    return <Login onLogin={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen flex text-on-surface font-sans">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <Header />
        
        <main className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'directory' && <StaffDirectory />}
            {currentView === 'schedule' && <RotationSchedule />}
            {currentView === 'tracker' && <TravelTracker />}
          </div>
        </main>
      </div>
    </div>
  );
}
