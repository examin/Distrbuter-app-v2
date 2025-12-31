import React, { useState } from 'react';
import { 
  Search, Filter, Download, Plus, MapPin, Eye, Camera, MessageCircle, Phone, 
  Wifi, WifiOff, X, Check, Truck, Edit2
} from 'lucide-react';
import { Button } from './Button';
import { Order, OrderStatus } from '../types';

interface OrdersProps {
  orders: Order[];
}

export const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showPodModal, setShowPodModal] = useState<string | null>(null); // Order ID

  const filteredOrders = orders.filter(o => 
    o.retailerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${isOffline ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
          >
            {isOffline ? <WifiOff size={18} /> : <Wifi size={18} />}
            {isOffline ? 'Offline Mode' : 'Online'}
          </button>
          <div className="h-6 w-px bg-gray-200"></div>
          <h2 className="font-bold text-gray-800 text-lg">Orders (Bill Banana)</h2>
        </div>
        <Button onClick={() => setShowNewOrderModal(true)} className="w-full md:w-auto">
          <Plus size={18} className="mr-2"/> Create New Order
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by Name or Bill ID..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="bg-white"><Filter size={18} className="mr-2"/> Filter</Button>
        <Button variant="outline" className="bg-white"><Download size={18} className="mr-2"/> Export CSV</Button>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 uppercase text-xs tracking-wider font-semibold">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Area</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{order.retailerName}</p>
                    <p className="text-xs text-gray-400">#{order.id}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin size={14} className="text-indigo-500" />
                      {order.retailerArea}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <p className="font-bold text-gray-900">₹{order.finalAmount}</p>
                    <p className="text-xs font-bold text-green-600">Marg: {order.profitMargin}%</p>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                      ${order.status === OrderStatus.APPROVED ? 'bg-green-50 text-green-700' : 
                      order.status === OrderStatus.PENDING ? 'bg-orange-50 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                    <div className="mt-1 text-[10px] text-gray-400 font-medium">{order.paymentStatus}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="View"><Eye size={16}/></button>
                      <button onClick={() => setShowPodModal(order.id)} className={`p-2 rounded-lg hover:bg-purple-100 ${order.podStatus === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`} title="POD">
                        <Camera size={16}/>
                      </button>
                      <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="WhatsApp"><MessageCircle size={16}/></button>
                      <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100" title="Call"><Phone size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Order Modal (Simplified) */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom-10">
          <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
            <h2 className="text-lg font-bold">New Order (Bill)</h2>
            <button onClick={() => setShowNewOrderModal(false)}><X size={24}/></button>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center text-gray-500">
            [Billing POS Interface Placeholder]
          </div>
          <div className="p-4 border-t bg-gray-50">
             <Button className="w-full py-3" onClick={() => setShowNewOrderModal(false)}>Create Bill</Button>
          </div>
        </div>
      )}

      {/* POD Modal */}
      {showPodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center">
             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={24} />
             </div>
             <h3 className="text-lg font-bold text-gray-900">Proof of Delivery</h3>
             <p className="text-sm text-gray-500 mb-6">Upload photo or signature for Order #{showPodModal}</p>
             
             <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-300">
                   <Camera size={24} className="text-gray-400 mb-2"/>
                   <span className="text-xs font-bold text-gray-600">Take Photo</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-300">
                   <Edit2 size={24} className="text-gray-400 mb-2"/>
                   <span className="text-xs font-bold text-gray-600">Signature</span>
                </button>
             </div>
             <Button className="w-full mt-6" onClick={() => setShowPodModal(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};