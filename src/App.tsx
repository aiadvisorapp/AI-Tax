/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ChatInterface from './components/ChatInterface';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-center mb-4">
        <div className="text-3xl font-black text-blue-900 tracking-tighter">
          AI<span className="text-yellow-600"> Tax</span>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">AI Tax & Retirement Planner</h1>
      <ChatInterface />
      <footer className="mt-8 pt-4 border-t text-sm font-bold text-center">
        Disclaimer: This analysis is for informational and educational purposes only. It is not personalized financial, tax, or legal advice. Tax laws are complex and change frequently. You must consult with a qualified CPA, tax attorney, or financial advisor regarding your specific situation before making any decisions.
      </footer>
    </div>
  );
}
