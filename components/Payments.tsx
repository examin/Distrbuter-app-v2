import React, { useState } from 'react';
import { IndianRupee, AlertCircle, CheckCircle, Smartphone, Banknote, X } from 'lucide-react';
import { Retailer, PaymentMode } from '../types';
import { Button } from './Button';

interface PaymentsProps {
  retailers: Retailer[];
  onCollect: (amount: number, mode: PaymentMode, retailerId: string) => void;
}

export const Payments: React.FC<PaymentsProps> = ({ retailers, onCollect }) => {
  const [showCollectModal, setShowCollectModal] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<PaymentMode>(PaymentMode.UPI);

  const totalPending = retailers.reduce((acc, r) => acc + r.outstandingBalance, 0);
  const overdueRetailers = retailers.sort((a,b) => b.daysOverdue - a.daysOverdue);

  return (
    <div className="space-y-6">
       {/* Metrics */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Total Pending</p>
                <h3 className="text-2xl font-extrabold text-gray-900">₹{(totalPending/100000).toFixed(2)}L</h3>
             </div>
             <div className="p-3 bg-red-50 text-red-600 rounded-lg"><AlertCircle size={24}/></div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1">Today's Collection</p>
                <h3 className="text-2xl font-extrabold text-gray-900">₹12.5k</h3>
             </div>
             <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={24}/></div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Digital (UPI)</p>
                <h3 className="text-2xl font-extrabold text-gray-900">65%</h3>
             </div>
             <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Smartphone size={24}/></div>
          </div>
       </div>

       {/* Debtors Table */}
       <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100 font-bold text-gray-800">Udhaar List (Receivables)</div>
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                <tr>
                   <th className="p-4">Customer Name</th>
                   <th className="p-4">Pending Amount</th>
                   <th className="p-4">Days Overdue</th>
                   <th className="p-4 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {overdueRetailers.map(r => (
                   <tr key={r.id}>
                      <td className="p-4 font-bold text-gray-900">{r.shopName}</td>
                      <td className="p-4 font-bold text-red-600">₹{r.outstandingBalance}</td>
                      <td className="p-4">
                         <span className={`px-2 py-1 rounded-md text-xs font-bold ${r.daysOverdue > 15 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                            {r.daysOverdue} Days
                         </span>
                      </td>
                      <td className="p-4 text-right">
                         <Button size="sm" variant="secondary" onClick={() => setShowCollectModal(r.id)}>Settle Now</Button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       {/* Collect Modal */}
       {showCollectModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-2xl">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Kitna Paisa Mila?</h3>
                  <button onClick={() => setShowCollectModal(null)}><X size={20} className="text-gray-500"/></button>
               </div>
               
               <input 
                  type="number" 
                  autoFocus
                  placeholder="₹ Amount" 
                  className="w-full text-3xl font-bold p-3 border-b-2 border-green-500 focus:outline-none text-center mb-6"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
               />
               
               <div className="grid grid-cols-2 gap-3 mb-6">
                  <button onClick={() => setMode(PaymentMode.CASH)} className={`p-3 rounded-lg border font-bold flex flex-col items-center gap-2 ${mode === PaymentMode.CASH ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200'}`}>
                     <Banknote size={20} /> Cash
                  </button>
                  <button onClick={() => setMode(PaymentMode.UPI)} className={`p-3 rounded-lg border font-bold flex flex-col items-center gap-2 ${mode === PaymentMode.UPI ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200'}`}>
                     <Smartphone size={20} /> UPI
                  </button>
               </div>

               <Button className="w-full" disabled={!amount} onClick={() => {
                  if(showCollectModal) onCollect(Number(amount), mode, showCollectModal);
                  setShowCollectModal(null);
                  setAmount('');
               }}>
                  Confirm Receipt
               </Button>
            </div>
         </div>
       )}
    </div>
  );
};
