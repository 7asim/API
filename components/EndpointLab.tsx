import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Plus, X } from 'lucide-react';

const EndpointLab: React.FC = () => {
  const [showId, setShowId] = useState(true);
  const [showQuery, setShowQuery] = useState(true);
  const [resource, setResource] = useState<'users' | 'products' | 'orders'>('products');

  return (
    <div className="bg-dark-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl mt-8">
      <div className="bg-dark-900 border-b border-slate-700 p-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <MousePointer2 className="w-5 h-5 text-brand-400" />
          URL Anatomy Builder
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Build a valid REST API endpoint by combining resources, path parameters, and query strings.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Resource (Collection)</label>
            <div className="flex bg-dark-900 rounded p-1 border border-slate-700">
              {['users', 'products', 'orders'].map((r) => (
                <button
                  key={r}
                  onClick={() => setResource(r as any)}
                  className={`flex-1 py-1 text-sm rounded capitalize transition-colors ${
                    resource === r ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Path Parameter (ID)</label>
            <button
              onClick={() => setShowId(!showId)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded border text-sm transition-all ${
                showId
                  ? 'bg-blue-900/20 border-blue-500/50 text-blue-300'
                  : 'bg-dark-900 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span>Specific Item ID</span>
              {showId ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
            <p className="text-xs text-slate-500 mt-2">
              Used to identify a <span className="text-blue-400">specific resource</span> inside the collection.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Query Parameter (Filter)</label>
            <button
              onClick={() => setShowQuery(!showQuery)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded border text-sm transition-all ${
                showQuery
                  ? 'bg-purple-900/20 border-purple-500/50 text-purple-300'
                  : 'bg-dark-900 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span>Sort / Filter</span>
              {showQuery ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
            <p className="text-xs text-slate-500 mt-2">
              Used to <span className="text-purple-400">modify</span> the results (sort, filter, search) without changing the resource itself.
            </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="bg-black/40 p-6 rounded-xl border border-slate-800 relative">
            <div className="text-xs text-slate-500 absolute top-3 left-4 font-mono">GET Request</div>
            
            <div className="mt-6 flex flex-wrap items-center gap-1 font-mono text-lg md:text-xl break-all">
              <span className="text-slate-500">https://api.shop.com/v1/</span>
              
              <motion.span 
                key={resource}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 font-bold px-1 rounded bg-green-900/20 border border-green-500/30"
              >
                {resource}
              </motion.span>

              <AnimatePresence mode="popLayout">
                {showId && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0, width: 0 }}
                    animate={{ scale: 1, opacity: 1, width: 'auto' }}
                    exit={{ scale: 0.8, opacity: 0, width: 0 }}
                    className="flex items-center overflow-hidden"
                  >
                    <span className="text-slate-600">/</span>
                    <span className="text-blue-400 font-bold px-1 mx-0.5 rounded bg-blue-900/20 border border-blue-500/30">
                      12345
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>

              <AnimatePresence mode="popLayout">
                {showQuery && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0, width: 0 }}
                    animate={{ scale: 1, opacity: 1, width: 'auto' }}
                    exit={{ scale: 0.8, opacity: 0, width: 0 }}
                    className="flex items-center overflow-hidden"
                  >
                    <span className="text-slate-600">?</span>
                    <span className="text-purple-400 font-bold px-1 mx-0.5 rounded bg-purple-900/20 border border-purple-500/30">
                      sort=desc
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Explanation Lines */}
            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="h-2 w-full bg-green-500/20 rounded-t mx-auto mb-1"></div>
                <span className="text-green-400 font-semibold">Collection</span>
              </div>
              <div className={`transition-opacity duration-300 ${showId ? 'opacity-100' : 'opacity-20'}`}>
                <div className="h-2 w-full bg-blue-500/20 rounded-t mx-auto mb-1"></div>
                <span className="text-blue-400 font-semibold">Identifier</span>
              </div>
              <div className={`transition-opacity duration-300 ${showQuery ? 'opacity-100' : 'opacity-20'}`}>
                <div className="h-2 w-full bg-purple-500/20 rounded-t mx-auto mb-1"></div>
                <span className="text-purple-400 font-semibold">Modifier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointLab;
