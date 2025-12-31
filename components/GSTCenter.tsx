import React, { useState } from 'react';
import { Send, FileText, CheckCircle, AlertOctagon } from 'lucide-react';
import { Button } from './Button';
import { askGstQuestion } from '../services/geminiService';

export const GSTCenter = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', text: string}[]>([
     { role: 'bot', text: 'Namaste! I am your GST Mitra. Ask me anything about tax rates or filing.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
     if(!query.trim()) return;
     const userMsg = query;
     setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
     setQuery('');
     setLoading(true);
     
     const answer = await askGstQuestion(userMsg);
     setChatHistory(prev => [...prev, { role: 'bot', text: answer }]);
     setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
       {/* Left: Data (2/3) */}
       <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
          <h2 className="text-2xl font-bold text-gray-900">GST Compliance Center</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Net GST Payable</p>
                <h3 className="text-2xl font-bold text-red-600">₹12,450</h3>
                <p className="text-xs text-gray-500 mt-1">Due by 20th Oct</p>
             </div>
             <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Input Tax Credit</p>
                <h3 className="text-2xl font-bold text-green-600">₹4,200</h3>
                <p className="text-xs text-gray-500 mt-1">Available balance</p>
             </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
             <div className="p-4 border-b font-bold bg-gray-50 flex justify-between">
                <span>Sales Register (GSTR-1)</span>
                <button className="text-indigo-600 text-sm font-medium">Download</button>
             </div>
             <table className="w-full text-sm text-left">
                <thead className="text-gray-500 font-medium border-b">
                   <tr>
                      <th className="p-3">Invoice</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Taxable</th>
                      <th className="p-3 text-right">GST (18%)</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   <tr>
                      <td className="p-3">INV-001</td>
                      <td className="p-3">24 Oct</td>
                      <td className="p-3 text-right">₹1,000</td>
                      <td className="p-3 text-right">₹180</td>
                   </tr>
                   <tr>
                      <td className="p-3">INV-002</td>
                      <td className="p-3">24 Oct</td>
                      <td className="p-3 text-right">₹500</td>
                      <td className="p-3 text-right">₹90</td>
                   </tr>
                </tbody>
             </table>
          </div>
       </div>

       {/* Right: AI Chatbot (1/3) */}
       <div className="bg-white rounded-xl border border-gray-200 shadow-lg flex flex-col overflow-hidden h-full">
          <div className="p-4 bg-indigo-600 text-white flex items-center gap-2 shadow-md">
             <div className="p-1.5 bg-white/20 rounded-full"><CheckCircle size={16}/></div>
             <span className="font-bold">GST Mitra AI</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
             {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             ))}
             {loading && <div className="text-xs text-gray-400 italic ml-2">Typing...</div>}
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
             <input 
                type="text" 
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Poocho (e.g. HSN for Rice?)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
             />
             <button onClick={handleSend} disabled={loading} className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                <Send size={18} />
             </button>
          </div>
       </div>
    </div>
  );
};
