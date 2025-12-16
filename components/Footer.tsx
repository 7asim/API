import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-slate-800 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Build?</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Start simple. Design your resources, choose your endpoints, and stick to standards.
          The world of APIs connects everything we use today.
        </p>
        <div className="text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} API Fundamentals Interactive Guide.</p>
          <p>Based on the "API Design and Architecture" documentation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
