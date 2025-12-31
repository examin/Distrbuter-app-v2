import React, { useState } from 'react';
import { 
  Search, Filter, Download, Plus, MapPin, Eye, Camera, MessageCircle, Phone, 
  Wifi, WifiOff, X, Check, Truck, Edit2, User, Trash2, ShoppingBag, CreditCard
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

      {/* New Order Modal (Detailed POS) */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 border-b bg-indigo-700 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag size={24}/> New Order (Bill)
                </h2>
                <p className="text-indigo-200 text-xs">Create invoice for retailers</p>
              </div>
              <button onClick={() => setShowNewOrderModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={24}/></button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              
              {/* LEFT: Product Catalog */}
              <div className="w-1/2 border-r bg-gray-50 flex flex-col">
                <div className="p-4 space-y-4 border-b bg-white">
                  {/* Retailer Selector */}
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20}/>
                    <select className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-bold text-gray-700">
                      <option>Sharma Kirana Store (Sector 4)</option>
                      <option>Gupta General Store</option>
                      <option>Laxmi Super Mart</option>
                    </select>
                    <div className="absolute right-3 top-3.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                      Credit Limit: ₹50k
                    </div>
                  </div>

                  {/* Search Products */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
                    <input type="text" placeholder="Search Product (e.g. Parle)" className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>

                {/* Product List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {[
                    { name: "Parle-G Gold 100g", price: 10, stock: 500, margin: "18%" },
                    { name: "Tata Salt 1kg", price: 25, stock: 30, margin: "5%" }, // Low Stock
                    { name: "Maggi Masala 70g", price: 12, stock: 1000, margin: "12%" },
                    { name: "Red Label Tea 250g", price: 120, stock: 150, margin: "8%" },
                    { name: "Lux International", price: 35, stock: 800, margin: "15%" },
                  ].map((p, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border hover:border-indigo-400 cursor-pointer shadow-sm group transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-indigo-600">{p.name}</h4>
                          <div className="flex gap-2 mt-1">
                             <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Margin: {p.margin}</span>
                             <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${p.stock < 50 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                               Stock: {p.stock}
                             </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-lg">₹{p.price}</p>
                          <Button size="sm" className="mt-1 h-8 px-3">+ Add</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Bill Summary */}
              <div className="w-1/2 bg-white flex flex-col">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-700">Current Bill</h3>
                  <span className="text-xs font-medium text-gray-500">Invoice #DRAFT-001</span>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white sticky top-0 shadow-sm text-gray-500 font-semibold border-b">
                      <tr>
                        <th className="p-3 pl-4">Item</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3 text-right">Total</th>
                        <th className="p-3 w-8"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { name: "Parle-G Gold 100g", qty: 50, price: 10, total: 500 },
                        { name: "Maggi Masala 70g", qty: 20, price: 12, total: 240 },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-indigo-50/50">
                          <td className="p-3 pl-4 font-bold text-gray-800">{item.name}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                              <button className="text-gray-500 hover:text-indigo-600">-</button>
                              <span className="font-bold w-4 text-center">{item.qty}</span>
                              <button className="text-gray-500 hover:text-indigo-600">+</button>
                            </div>
                          </td>
                          <td className="p-3 text-right text-gray-600">₹{item.price}</td>
                          <td className="p-3 text-right font-bold text-gray-900">₹{item.total}</td>
                          <td className="p-3 text-center text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 size={16}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bill Footer */}
                <div className="p-6 bg-gray-50 border-t space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹740.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (Offer Applied)</span>
                    <span>- ₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST (Included)</span>
                    <span>₹66.60</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <div>
                      <span className="block text-xs text-gray-500 font-bold uppercase">Total Payable</span>
                      <span className="text-2xl font-extrabold text-indigo-900">₹740.00</span>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowNewOrderModal(false)}>Save Draft</Button>
                      <Button onClick={() => setShowNewOrderModal(false)}>
                        <CreditCard size={18} className="mr-2"/> Confirm Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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