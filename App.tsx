import React, { useState } from 'react';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import { Menu, X, ChevronRight, Terminal, Lock, Server, ArrowRight } from 'lucide-react';
import Section from './components/Section';
import RestSimulator from './components/RestSimulator';
import EndpointLab from './components/EndpointLab'; // New Import
import StatusLab from './components/StatusLab';     // New Import
import JsonExplainer from './components/JsonExplainer';
import Footer from './components/Footer';
import { API_TYPES, STATUS_CODES, BEST_PRACTICES } from './constants';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'types', label: 'Types' },
    { id: 'rest', label: 'REST Lab' },
    { id: 'json', label: 'Data (JSON)' },
    { id: 'status', label: 'Status Codes' },
    { id: 'best-practices', label: 'Best Practices' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants for Staggered list
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 selection:bg-brand-500/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark-900/80 backdrop-blur-md border-b border-slate-800 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <Terminal className="text-brand-500" />
            <span>API<span className="text-slate-500">Guide</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-800 border-b border-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-700"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="intro" className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-sm font-semibold mb-6">
                Application Programming Interface
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Messenger</span> of the Web
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                An API exposes a surface for other apps to interact with your app. 
                Frontend and backend communicate via these calls, just like a waiter takes an order to the kitchen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => scrollToSection('types')}
                  className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2"
                >
                  Start Exploring <ArrowRight className="w-4 h-4"/>
                </button>
                <button 
                  onClick={() => scrollToSection('rest')}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold border border-slate-700 transition-all"
                >
                  Try Simulator
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* API Types Grid - Animated */}
        <Section id="types" title="Types of APIs" subtitle="Not all APIs are built the same. Here are the common architectures used in modern development.">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {API_TYPES.map((type, index) => (
              <motion.div
                key={type.title}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: '#64748b' }}
                className="bg-dark-800 border border-slate-700 p-6 rounded-xl transition-colors"
              >
                <div className={`p-3 rounded-lg bg-dark-900 w-fit mb-4 ${type.color}`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                <p className="text-slate-400 mb-4 h-12">{type.description}</p>
                <ul className="space-y-2">
                  {type.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <ChevronRight className="w-3 h-3 text-slate-600" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* REST Playground & Endpoint Lab */}
        <Section id="rest" title="REST Architecture Lab" subtitle="REST (Representational State Transfer) uses standard HTTP methods to interact with Resources.">
           <RestSimulator />
           
           {/* New Endpoint Lab */}
           <EndpointLab />

           <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
             <div className="bg-dark-800 p-4 rounded border border-slate-700">
               <strong className="text-white block mb-2">Resource</strong>
               The noun you interact with (e.g., User, Post).
             </div>
             <div className="bg-dark-800 p-4 rounded border border-slate-700">
               <strong className="text-white block mb-2">Endpoint</strong>
               The specific URL where the resource lives (e.g., /users/1).
             </div>
             <div className="bg-dark-800 p-4 rounded border border-slate-700">
               <strong className="text-white block mb-2">Stateless</strong>
               Each request contains all info needed. The server doesn't remember previous requests.
             </div>
           </div>
        </Section>

        {/* JSON Section */}
        <Section id="json" title="Data Format: JSON">
          <JsonExplainer />
        </Section>

        {/* Status Codes & Status Lab */}
        <Section id="status" title="Status Codes Decoder" subtitle="Servers communicate the result of a request using standardized 3-digit codes.">
          
          {/* New Status Lab */}
          <StatusLab />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {STATUS_CODES.map((group) => (
              <div key={group.range} className="bg-dark-800 rounded-xl p-6 border border-slate-700 relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 text-4xl font-bold opacity-10 ${group.color}`}>
                  {group.range}
                </div>
                <h3 className={`text-xl font-bold mb-1 ${group.color}`}>{group.name} ({group.range})</h3>
                <p className="text-slate-400 text-sm mb-4">{group.description}</p>
                <div className="space-y-3">
                  {group.examples.map((code) => (
                    <div key={code.code} className="flex items-center justify-between bg-dark-900 p-3 rounded border border-slate-700/50">
                      <span className={`font-mono font-bold ${group.color}`}>{code.code}</span>
                      <span className="text-slate-300 text-sm">{code.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Best Practices */}
        <Section id="best-practices" title="Design & Security" subtitle="Building a robust API requires attention to detail, consistency, and security.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {BEST_PRACTICES.map((practice) => (
                <div key={practice.title} className="flex gap-4">
                  <div className="mt-1 p-2 bg-brand-900/30 rounded-lg h-fit">
                    <practice.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{practice.title}</h4>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">{practice.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-brand-900/20 rounded-2xl border border-slate-700 p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-400"/> Authenticating APIs
              </h3>
              <p className="text-slate-300 mb-6">
                Never leave your resources open. Modern APIs use <strong>Tokens</strong> (like JWT or OAuth) passed in the Headers, not in the URL.
              </p>
              
              <div className="bg-dark-900 p-4 rounded-lg font-mono text-sm border border-slate-700 shadow-inner">
                <div className="text-slate-500 mb-2 border-b border-slate-700 pb-2 flex justify-between">
                   <span>Request Headers</span>
                   <span className="text-xs uppercase bg-green-900/30 text-green-400 px-2 rounded">Secure</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-4">
                    <span className="text-purple-400">Authorization:</span>
                    <span className="text-green-400">Bearer eyJhbGciOiJIUzI1...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-purple-400">Content-Type:</span>
                    <span className="text-slate-300">application/json</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Documentation Section */}
        <Section id="openapi" title="OpenAPI & Documentation" className="mb-20">
          <div className="bg-slate-800 rounded-2xl p-8 md:p-12 text-center border border-slate-700">
            <Server className="w-12 h-12 text-slate-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Don't make developers guess.</h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              OpenAPI (formerly Swagger) allows you to describe your API structure in a standard format. 
              This generates automatic documentation, client SDKs, and validation tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-dark-900 rounded-full text-slate-300 text-sm border border-slate-700">Standardized Schema</span>
              <span className="px-4 py-2 bg-dark-900 rounded-full text-slate-300 text-sm border border-slate-700">Auto-generated Docs</span>
              <span className="px-4 py-2 bg-dark-900 rounded-full text-slate-300 text-sm border border-slate-700">Interactive Testing</span>
            </div>
          </div>
        </Section>

      </main>

      <Footer />
    </div>
  );
};

export default App;