import React, { useState } from 'react';
import { Phone, MessageCircle, UserPlus, Shield, X } from 'lucide-react';
import { Staff, Role } from '../types';
import { Button } from './Button';

interface UsersProps {
  staffList: Staff[];
}

export const Users: React.FC<UsersProps> = ({ staffList }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-gray-900">Team / Staff</h2>
         <Button onClick={() => setShowAddModal(true)}><UserPlus size={18} className="mr-2"/> Add Staff</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map(staff => (
           <div key={staff.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
              {/* Card Top */}
              <div className="p-5 flex justify-between items-start">
                 <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-lg text-gray-600">
                       {staff.name.charAt(0)}
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900">{staff.name}</h3>
                       <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 mt-1">
                          <Shield size={10} /> {staff.role}
                       </span>
                    </div>
                 </div>
                 <div className={`w-3 h-3 rounded-full ${staff.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              </div>

              {/* Metrics */}
              <div className="px-5 pb-5">
                 <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{staff.metrics.label}</p>
                    <p className="text-xl font-bold text-gray-800">{staff.metrics.value}</p>
                 </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 border-t border-gray-100 divide-x divide-gray-100">
                 <button className="py-3 flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    <Phone size={16} /> Call
                 </button>
                 <button className="py-3 flex items-center justify-center gap-2 text-sm font-bold text-green-600 hover:bg-green-50 transition-colors">
                    <MessageCircle size={16} /> WhatsApp
                 </button>
              </div>
           </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-2xl">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Onboard New Staff</h3>
                  <button onClick={() => setShowAddModal(false)}><X size={20}/></button>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                     <input type="text" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Rahul Kumar"/>
                  </div>
                  <div>
                     <label className="text-sm font-medium text-gray-700 block mb-1">Phone Number</label>
                     <input type="tel" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="9876543210"/>
                  </div>
                  <div>
                     <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
                     <select className="w-full border rounded-lg p-2.5 bg-white">
                        {Object.values(Role).map(r => <option key={r} value={r}>{r}</option>)}
                     </select>
                  </div>
               </div>
               
               <Button className="w-full mt-6" onClick={() => setShowAddModal(false)}>Add Staff Member</Button>
            </div>
         </div>
      )}
    </div>
  );
};
