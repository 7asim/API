import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HTTP_METHODS } from '../constants';
import { Play, RotateCcw } from 'lucide-react';

const RestSimulator: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState(HTTP_METHODS[0]);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateRequest = () => {
    setIsLoading(true);
    setResponse(null);

    setTimeout(() => {
      setIsLoading(false);
      switch (selectedMethod.name) {
        case 'GET':
          setResponse(JSON.stringify({ id: 123, username: "jdoe", email: "jdoe@example.com" }, null, 2));
          break;
        case 'POST':
          setResponse(JSON.stringify({ id: 124, status: "created", message: "User created successfully" }, null, 2));
          break;
        case 'PUT':
          setResponse(JSON.stringify({ id: 123, status: "updated", previous: { username: "john" }, current: { username: "jdoe" } }, null, 2));
          break;
        case 'DELETE':
          setResponse(null); // Simulate 204 No Content
          break;
        default:
          setResponse(JSON.stringify({ message: "Action complete" }, null, 2));
      }
    }, 800);
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
      <div className="bg-dark-900 border-b border-slate-700 p-4 flex items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          {HTTP_METHODS.map((method) => (
            <button
              key={method.name}
              onClick={() => {
                setSelectedMethod(method);
                setResponse(null);
              }}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                selectedMethod.name === method.name
                  ? `${method.color} text-white shadow-lg scale-105`
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {method.name}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px] bg-dark-900 border border-slate-600 rounded px-3 py-1.5 text-slate-300 font-mono text-sm flex items-center">
            <span className={`mr-2 font-bold ${selectedMethod.color.replace('bg-', 'text-')}`}>{selectedMethod.name}</span>
            <span className="truncate">https://api.example.com{selectedMethod.example}</span>
        </div>
        <button
          onClick={simulateRequest}
          disabled={isLoading}
          className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-1.5 rounded-md flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? <RotateCcw className="animate-spin w-4 h-4" /> : <Play className="w-4 h-4" />}
          Send
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 border-r border-slate-700">
          <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-4">Request Context</h3>
          <div className="space-y-4">
             <div>
                <span className="text-slate-500 text-sm block mb-1">Method Meaning</span>
                <p className="text-slate-200">{selectedMethod.description}</p>
             </div>
             <div>
                <span className="text-slate-500 text-sm block mb-1">Idempotent?</span>
                <p className="text-slate-200">{selectedMethod.idempotent ? "Yes (Safe to retry)" : "No (Caution on retry)"}</p>
             </div>
             {selectedMethod.name !== 'GET' && selectedMethod.name !== 'DELETE' && (
               <div>
                  <span className="text-slate-500 text-sm block mb-1">Payload (Body)</span>
                  <div className="bg-dark-900 p-3 rounded text-xs font-mono text-slate-300">
                    {`{
  "username": "jdoe",
  "email": "jdoe@example.com"
}`}
                  </div>
               </div>
             )}
          </div>
        </div>

        <div className="p-6 bg-dark-900/50">
          <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-4">Response</h3>
          <div className="h-64 overflow-y-auto font-mono text-sm relative">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-500 text-xs">Connecting to server...</span>
                  </div>
                </motion.div>
              ) : response ? (
                <motion.pre
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400"
                >
                  {response}
                </motion.pre>
              ) : selectedMethod.name === 'DELETE' && !isLoading && response === null ? (
                 <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-slate-400 italic">
                    204 No Content
                 </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-600 italic flex items-center justify-center h-full"
                >
                  Ready to send request...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestSimulator;
