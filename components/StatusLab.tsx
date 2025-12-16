import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Lock, Server, Search, WifiOff } from 'lucide-react';

type Scenario = {
  id: string;
  label: string;
  code: number;
  message: string;
  description: string;
  icon: any;
  color: string;
};

const SCENARIOS: Scenario[] = [
  { 
    id: 'success', 
    label: 'Get User Profile', 
    code: 200, 
    message: 'OK', 
    description: 'Perfect! The resource exists and was returned successfully.',
    icon: CheckCircle,
    color: 'text-green-400 border-green-500/50 bg-green-500/10'
  },
  { 
    id: 'bad_req', 
    label: 'Register (No Email)', 
    code: 400, 
    message: 'Bad Request', 
    description: 'Client Error: You sent data the server didn\'t understand or was missing fields.',
    icon: AlertCircle,
    color: 'text-orange-400 border-orange-500/50 bg-orange-500/10'
  },
  { 
    id: 'unauth', 
    label: 'Admin Dashboard', 
    code: 401, 
    message: 'Unauthorized', 
    description: 'Security: You need to log in (provide a valid token) to see this.',
    icon: Lock,
    color: 'text-red-400 border-red-500/50 bg-red-500/10'
  },
  { 
    id: 'not_found', 
    label: 'Get Order #999', 
    code: 404, 
    message: 'Not Found', 
    description: 'Client Error: The ID you requested doesn\'t exist in the database.',
    icon: Search,
    color: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10'
  },
  { 
    id: 'server_err', 
    label: 'Crash Server', 
    code: 500, 
    message: 'Internal Server Error', 
    description: 'Server Error: The developers made a mistake in the code. It\'s not your fault.',
    icon: WifiOff,
    color: 'text-rose-500 border-rose-500/50 bg-rose-500/10'
  }
];

const StatusLab: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);

  const triggerScenario = (scenario: Scenario) => {
    setLoading(true);
    setActiveScenario(null);
    setTimeout(() => {
      setLoading(false);
      setActiveScenario(scenario);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-6">Choose a Scenario</h3>
        <div className="grid grid-cols-1 gap-3">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => triggerScenario(scenario)}
              className="group flex items-center justify-between p-4 rounded-xl bg-dark-800 border border-slate-700 hover:border-brand-500 hover:bg-dark-700 transition-all text-left"
            >
              <span className="font-medium text-slate-200 group-hover:text-white">{scenario.label}</span>
              <span className={`text-xs font-mono px-2 py-1 rounded bg-dark-900 border border-slate-600 text-slate-400`}>
                GET
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-900 rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden shadow-inner">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 border-4 border-slate-700 border-t-brand-500 rounded-full animate-spin"></div>
              <span className="text-slate-500 animate-pulse">Server processing...</span>
            </motion.div>
          ) : activeScenario ? (
            <motion.div
              key="result"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="text-center w-full"
            >
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 border-4 ${activeScenario.color.replace('text-', 'border-').split(' ')[1]} ${activeScenario.color.split(' ')[0]} bg-dark-800`}>
                <activeScenario.icon className="w-10 h-10" />
              </div>
              
              <div className="text-6xl font-black text-white mb-2 tracking-tighter">
                {activeScenario.code}
              </div>
              <div className={`text-xl font-bold mb-6 ${activeScenario.color.split(' ')[0]}`}>
                {activeScenario.message}
              </div>
              
              <div className={`p-4 rounded-lg border text-sm text-left ${activeScenario.color}`}>
                <p className="font-medium flex gap-2">
                  <Server className="w-4 h-4 shrink-0 mt-0.5" />
                  {activeScenario.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-500"
            >
              <Server className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Select a scenario to simulate the server response.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatusLab;
