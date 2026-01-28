
import React, { useState } from 'react';
import { AppTab } from './types';
import Calculator from './components/Calculator';
import CurrencyConverter from './components/CurrencyConverter';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CALCULATOR);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.CALCULATOR:
        return <Calculator />;
      case AppTab.CONVERTER:
        return <CurrencyConverter />;
      default:
        return <Calculator />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <main className="max-w-6xl mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        {renderContent()}
      </main>
    </Layout>
  );
};

export default App;
