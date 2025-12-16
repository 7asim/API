import React from 'react';
import { motion } from 'framer-motion';

const JsonExplainer: React.FC = () => {
  const jsonLines = [
    { text: '{', indent: 0, color: 'text-slate-400' },
    { text: '"data": {', indent: 2, color: 'text-purple-400', note: "Root Object" },
    { text: '"id": 101,', indent: 4, color: 'text-blue-400', note: "Number" },
    { text: '"active": true,', indent: 4, color: 'text-blue-400', note: "Boolean" },
    { text: '"name": "API Guide",', indent: 4, color: 'text-green-400', note: "String (Key-Value Pair)" },
    { text: '"tags": [', indent: 4, color: 'text-yellow-400', note: "Array (List)" },
    { text: '"tech",', indent: 6, color: 'text-green-400' },
    { text: '"web"', indent: 6, color: 'text-green-400' },
    { text: '],', indent: 4, color: 'text-yellow-400' },
    { text: '"meta": null', indent: 4, color: 'text-red-400', note: "Null Value" },
    { text: '}', indent: 2, color: 'text-purple-400' },
    { text: '}', indent: 0, color: 'text-slate-400' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Why JSON?</h3>
        <p className="text-slate-400 mb-6">
          JSON (JavaScript Object Notation) is the language APIs speak. It is lightweight, text-based, and easy for both humans to read and machines to parse.
        </p>
        <ul className="space-y-3">
          {[
            "Key-Value Pairs: Like a dictionary.",
            "Universal: Supported by almost all programming languages.",
            "Strict Structure: Uses quotes for strings, curly braces for objects.",
            "Lightweight: Minimal formatting overhead compared to XML."
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-dark-900 p-6 rounded-xl border border-slate-700 font-mono text-sm md:text-base relative group shadow-lg">
        <div className="absolute top-0 right-0 p-2 bg-slate-800 rounded-bl-lg text-xs text-slate-400 border-b border-l border-slate-700">
          payload.json
        </div>
        {jsonLines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group/line flex items-center relative hover:bg-slate-800/50 -mx-6 px-6 py-0.5 cursor-default"
          >
            <span style={{ paddingLeft: `${line.indent * 0.75}rem` }} className={line.color}>
              {line.text}
            </span>
            {line.note && (
              <span className="hidden md:block absolute right-4 text-xs text-slate-500 opacity-0 group-hover/line:opacity-100 transition-opacity">
                // {line.note}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JsonExplainer;
