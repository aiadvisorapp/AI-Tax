import React, { useState } from 'react';
import { UserPersonalizationData } from '../types';
import PersonalizationForm from './PersonalizationForm';

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ role: 'user'|'assistant', text: string | React.ReactNode }[]>([
    { role: 'assistant', text: 
      <>
        中英文多语言通用版.... Hello! I am your Smart Tax And Retirement Financial Planning Advisor.
        <br/>
        <a href="https://100-tax-myths.pages.dev/100_Tax_Myths.pdf" target="_blank" className="text-blue-600 underline">Avoid Top 100 misleading tax questions...</a>
        <br/>
        <a href="https://oraclevalue.ai/" target="_blank" className="text-blue-600 underline">Learn more about value investing principles...</a>
      </>
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleNewChat = () => {
    setShowForm(true);
    setMessages([
      { role: 'assistant', text: 
        <>
          中英文多语言通用版.... Hello! I am your Smart Tax And Retirement Financial Planning Advisor.
          <br/>
          <a href="https://100-tax-myths.pages.dev/100_Tax_Myths.pdf" target="_blank" className="text-blue-600 underline">Avoid Top 100 misleading tax questions...</a>
          <br/>
          <a href="https://oraclevalue.ai/" target="_blank" className="text-blue-600 underline">Learn more about value investing principles...</a>
        </>
      }
    ]);
  };

  const handleFormComplete = async (data: UserPersonalizationData) => {
    let userMessage = `My financial profile: Age: ${data.age}, Filing Status: ${data.filingStatus}, Annual Income: ${data.annualIncome} (${data.annualIncomeType}), Residence: ${data.residenceCity}, Financial Goal: ${data.financialGoal}, Risk Tolerance: ${data.riskTolerance}, Net Worth: ${data.netWorth}, Investment Experience: ${data.investmentExperience}, Preferences: ${data.investmentPreferences}, Interest in T-bills/Money Market: ${data.interestedInTbills ? 'Yes' : 'No'}, Tax Return Year: ${data.taxReturnYear}, Any Children: ${data.anyChildren}, Children Ages: ${data.childrenAges}.`;

    if (data.annualIncomeType === 'Net 1099') {
      userMessage += " IMPORTANT: Since I have Net 1099 income, please specifically list and explain potential deductible expenses for me, such as business car usage, business insurance, Financial Fees, Business Travel, Continuing Education, Home Office, and other potential expenses, to ensure I don't miss any deductions.";
    }

    if (data.annualIncomeType === 'W2' || data.annualIncomeType === 'Net 1099') {
      userMessage += ` IMPORTANT: Please always list the relevant Federal and State standard deduction amounts for my filing status (${data.filingStatus}) in the tax year ${data.taxReturnYear}. Additionally, please provide guidance on potential above-the-line deductions suitable for my situation.`;
    }


    if (data.anyChildren > 0) {
      userMessage += ` IMPORTANT: Based on the ${data.anyChildren} child(ren) with ages ${data.childrenAges}, please explain the federal and state child tax credits I may be eligible for in the tax year ${data.taxReturnYear}.`;
    }

    userMessage += " IMPORTANT: When answering questions about retirement goals, please prioritize recommending tax-free Roth IRA, Roth SEP IRA, and Solo Roth 401k accounts. Additionally, always explain the mega backdoor Roth strategy as an option.";
    
    setShowForm(false);
    
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history: newMessages }),
        });
        const result = await response.json();
        setMessages([...newMessages, { role: 'assistant', text: result.response }]);
    } catch (error) {
        setMessages([...newMessages, { role: 'assistant', text: "Sorry, I encountered an error." }]);
    } finally {
        setLoading(false);
    }
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history: newMessages }),
        });
        const result = await response.json();
        setMessages([...newMessages, { role: 'assistant', text: result.response }]);
    } catch (error) {
        setMessages([...newMessages, { role: 'assistant', text: "Sorry, I encountered an error." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      {showForm ? (
        <PersonalizationForm onComplete={handleFormComplete} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Financial Advisor</h2>
            <button onClick={handleNewChat} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full transition">New Chat</button>
          </div>
          <div className="h-[500px] overflow-y-auto mb-4 p-4 space-y-4">
            {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                      {m.text}
                    </div>
                </div>
            ))}
            {loading && <div className="text-gray-500 italic text-sm">Advisor is thinking...</div>}
          </div>
          <div className="flex gap-2">
            <input className="flex-grow p-3 border rounded-full focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Ask your financial planning question....." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} disabled={loading} />
            <button onClick={send} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition" disabled={loading}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}
