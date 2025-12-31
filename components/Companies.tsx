import React, { useState } from 'react';
import { Phone, Briefcase, ChevronRight, X, Package, TrendingUp, Tag } from 'lucide-react';
import { Company, Product } from '../types';

interface CompaniesProps {
  companies: Company[];
  products: Product[];
}

export const Companies: React.FC<CompaniesProps> = ({ companies, products }) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Companies / Suppliers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
          <div key={company.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
            {/* Header */}
            <div className="p-5 border-b border-gray-50 flex justify-between items-start bg-gradient-to-r from-gray-50 to-white">
               <div>
                  <h3 className="font-bold text-lg text-gray-900">{company.name}</h3>
                  <div className="flex items-center gap-1 text-green-600 mt-1">
                     <TrendingUp size={14} />
                     <span className="text-xs font-bold">Avg Margin: {company.avgMargin}%</span>
                  </div>
               </div>
               <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <Briefcase size={20} />
               </div>
            </div>
            
            {/* Body */}
            <div className="p-5 space-y-4">
               <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Sales Rep</p>
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="font-bold text-gray-800 text-sm">{company.repName}</p>
                        <p className="text-xs text-gray-500">{company.repPhone}</p>
                     </div>
                     <a href={`tel:${company.repPhone}`} className="p-2 bg-white rounded-full text-indigo-600 shadow-sm hover:bg-indigo-50 border border-gray-200">
                        <Phone size={14} />
                     </a>
                  </div>
               </div>
               
               <button onClick={() => setSelectedCompany(company)} className="w-full flex items-center justify-between text-sm font-medium text-gray-600 hover:text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>View {company.productCount} Products</span>
                  <ChevronRight size={16} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-5 border-b flex justify-between items-center">
                 <h2 className="text-xl font-bold">{selectedCompany.name} Details</h2>
                 <button onClick={() => setSelectedCompany(null)}><X size={24} className="text-gray-400 hover:text-gray-600"/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Info Column */}
                    <div className="space-y-6">
                        <div className="bg-indigo-50 p-4 rounded-xl">
                           <h4 className="font-bold text-indigo-900 mb-2">Representative</h4>
                           <p className="text-sm font-bold">{selectedCompany.repName}</p>
                           <p className="text-sm text-gray-600">{selectedCompany.repPhone}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                           <h4 className="font-bold text-orange-900 mb-2">Last Order</h4>
                           <p className="text-sm text-gray-700">Date: {selectedCompany.lastOrderDate}</p>
                           <p className="text-xs text-orange-700 mt-1 font-bold">Re-order Recommended</p>
                        </div>
                    </div>

                    {/* Right Product Table */}
                    <div className="md:col-span-2">
                       <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <Package size={20} className="text-gray-400"/> Product Inventory
                       </h3>
                       <div className="bg-white border rounded-lg overflow-hidden">
                          <table className="w-full text-sm text-left">
                             <thead className="bg-gray-50 text-gray-500 font-semibold border-b">
                                <tr>
                                   <th className="p-3">Product Name</th>
                                   <th className="p-3">Cost (+GST)</th>
                                   <th className="p-3 text-right">Stock</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y">
                                {products.filter(p => p.companyId === selectedCompany.id).map(p => (
                                   <tr key={p.id}>
                                      <td className="p-3">
                                         <p className="font-medium text-gray-900">{p.name}</p>
                                         {p.offer && (
                                            <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold mt-1">
                                               <Tag size={10} /> {p.offer}
                                            </div>
                                         )}
                                      </td>
                                      <td className="p-3">
                                         <p className="font-bold text-gray-800">₹{p.landingCost}</p>
                                         <p className="text-xs text-gray-500">GST: {p.gstRate}%</p>
                                      </td>
                                      <td className={`p-3 text-right font-bold ${p.stock < p.minLevel ? 'text-red-600' : 'text-gray-800'}`}>{p.stock}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};