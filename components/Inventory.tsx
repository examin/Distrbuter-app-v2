import React from 'react';
import { AlertTriangle, History, Settings, Warehouse } from 'lucide-react';
import { Godown, Product } from '../types';

interface InventoryProps {
  godowns: Godown[];
  products: Product[];
}

export const Inventory: React.FC<InventoryProps> = ({ godowns, products }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-gray-900">Inventory / Godown</h2>
         <button className="text-gray-500 hover:text-indigo-600"><Settings size={20}/></button>
      </div>

      {/* Godown Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {godowns.map(g => (
          <div key={g.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
             <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Godown Name</p>
                <h3 className="font-bold text-lg text-gray-900">{g.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Manager: <span className="font-medium text-gray-700">{g.managerName}</span></p>
             </div>
             <div className="text-right">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-100 flex items-center justify-center font-bold text-xs text-indigo-700">
                   {g.capacityFill}%
                </div>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">Capacity</p>
             </div>
          </div>
        ))}
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 uppercase text-xs tracking-wider font-semibold">
                 <tr>
                    <th className="p-4">Item Name</th>
                    <th className="p-4">Pricing (Land/Sell/MRP)</th>
                    <th className="p-4 text-center">GST %</th>
                    <th className="p-4 text-right">In Hand</th>
                    <th className="p-4 text-right">Total Value (₹)</th>
                    <th className="p-4 text-center">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {products.map(p => {
                    const isLow = p.stock < p.minLevel;
                    const stockValue = p.stock * p.landingCost;
                    return (
                       <tr key={p.id} className="hover:bg-gray-50">
                          <td className="p-4">
                             <div className="flex items-center gap-2 font-bold text-gray-900">
                                {isLow && <AlertTriangle size={16} className="text-red-500" />}
                                {p.name}
                             </div>
                             <div className="text-xs text-gray-500 mt-1">SKU: {p.sku}</div>
                             {p.offer && (
                                <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">
                                   Offer: {p.offer}
                                </div>
                             )}
                          </td>
                          <td className="p-4">
                             <div className="text-xs space-y-1">
                                <div className="flex justify-between w-32">
                                   <span className="text-gray-500">Landing:</span>
                                   <span className="font-bold text-gray-900">₹{p.landingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between w-32">
                                   <span className="text-gray-500">Selling:</span>
                                   <span className="font-bold text-indigo-700">₹{p.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between w-32">
                                   <span className="text-gray-500">MRP:</span>
                                   <span className="text-gray-500 line-through">₹{p.mrp}</span>
                                </div>
                             </div>
                          </td>
                          <td className="p-4 text-center">
                             <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">{p.gstRate}%</span>
                          </td>
                          <td className={`p-4 text-right font-bold ${isLow ? 'text-red-600' : 'text-gray-900'}`}>
                             {p.stock}
                             {isLow && <p className="text-[10px] text-red-500 font-normal">Min: {p.minLevel}</p>}
                          </td>
                          <td className="p-4 text-right font-medium text-gray-700">₹{stockValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                          <td className="p-4 text-center">
                             <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title="History">
                                <History size={16} />
                             </button>
                          </td>
                       </tr>
                    );
                 })}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};