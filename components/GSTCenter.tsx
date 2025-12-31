import React from 'react';

export const GSTCenter = () => {
  return (
    <div className="space-y-6 overflow-y-auto">
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
  );
};
