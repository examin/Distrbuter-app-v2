import React, { useState } from 'react';
import { 
  Phone, Briefcase, ChevronRight, X, Package, TrendingUp, Tag, 
  ShoppingCart, RefreshCw, Plus, Minus, AlertTriangle, ArrowRight, Wallet, Sparkles, Calendar, AlertCircle
} from 'lucide-react';
import { Company, Product } from '../types';
import { Button } from './Button';

interface CompaniesProps {
  companies: Company[];
  products: Product[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

export const Companies: React.FC<CompaniesProps> = ({ companies, products }) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  // Order Modal State
  const [showOrderModal, setShowOrderModal] = useState<Company | null>(null);
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSmartFilling, setIsSmartFilling] = useState(false);

  // Derived Metrics
  const cartTotal = cart.reduce((sum, item) => sum + (item.quantity * item.product.landingCost), 0);
  const budget = Number(targetAmount) || 0;
  const budgetUtilization = budget > 0 ? (cartTotal / budget) * 100 : 0;
  const remaining = budget - cartTotal;
  const isOverBudget = remaining < 0;

  // --- Logic: Smart Fill ---
  const handleSmartFill = () => {
    if (!showOrderModal || !budget) return;
    
    setIsSmartFilling(true);
    
    // Get products for this company
    const companyProducts = products.filter(p => p.companyId === showOrderModal.id);
    
    // Logic: Prioritize Low Stock -> High Margin
    const sortedProducts = [...companyProducts].sort((a, b) => {
        const aLow = a.stock < a.minLevel ? 1 : 0;
        const bLow = b.stock < b.minLevel ? 1 : 0;
        if (aLow !== bLow) return bLow - aLow; // Prioritize low stock
        
        // Calculate Margin %
        const aMargin = ((a.price - a.landingCost) / a.price);
        const bMargin = ((b.price - b.landingCost) / b.price);
        return bMargin - aMargin; // Prioritize high margin
    });

    let currentSpend = 0;
    const newCart: CartItem[] = [];

    // Allocation Loop
    for (const p of sortedProducts) {
        if (currentSpend >= budget) break;

        // Determine ideal quantity
        // If low stock, try to fill to minLevel + 20% buffer
        // Else, buy a standard batch (e.g., 10 units)
        let qtyToBuy = 0;
        if (p.stock < p.minLevel) {
            qtyToBuy = (p.minLevel - p.stock) + 20; 
        } else {
            qtyToBuy = 10; // Standard restock
        }

        const cost = qtyToBuy * p.landingCost;
        
        // Check if we have budget for full qty, else buy what we can
        if (currentSpend + cost <= budget) {
            newCart.push({ product: p, quantity: qtyToBuy });
            currentSpend += cost;
        } else {
            // Buy remaining budget worth
            const remainingBudget = budget - currentSpend;
            const possibleQty = Math.floor(remainingBudget / p.landingCost);
            if (possibleQty > 0) {
                newCart.push({ product: p, quantity: possibleQty });
                currentSpend += (possibleQty * p.landingCost);
            }
        }
    }

    setCart(newCart);
    setTimeout(() => setIsSmartFilling(false), 800); 
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
        if (item.product.id === productId) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
        }
        return item;
    }).filter(item => item.quantity > 0));
  };

  const addProductToCart = (product: Product) => {
      const exists = cart.find(i => i.product.id === product.id);
      if(exists) return;
      setCart([...cart, { product, quantity: 10 }]); // Default add 10
  };

  const openOrderModal = (company: Company) => {
    setSelectedCompany(null);
    setShowOrderModal(company);
    setTargetAmount(''); 
    setCart([]); 
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Companies / Suppliers</h2>
      </div>

      {/* --- Company Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
          <div key={company.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col h-full">
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
            <div className="p-5 space-y-4 flex-1">
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
               
               <button onClick={() => setSelectedCompany(company)} className="w-full flex items-center justify-between text-sm font-medium text-gray-600 hover:text-indigo-600">
                  <span>View Details</span>
                  <ChevronRight size={16} />
               </button>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-gray-50 bg-gray-50/50">
               <Button 
                 onClick={() => openOrderModal(company)} 
                 className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-sm"
               >
                  <ShoppingCart size={16} className="mr-2"/> Create Next Order
               </Button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Details Modal --- */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
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
                           <Button 
                              size="sm" 
                              className="w-full mt-3 bg-orange-600 hover:bg-orange-700"
                              onClick={() => openOrderModal(selectedCompany)}
                           >
                              Order Again
                           </Button>
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

      {/* --- SMART ORDER MODAL --- */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col animate-in slide-in-from-bottom-5">
              
              {/* Header */}
              <div className="p-5 border-b bg-indigo-900 text-white flex justify-between items-center rounded-t-xl">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                       <ShoppingCart size={24}/> 
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">New Order: {showOrderModal.name}</h2>
                        <div className="flex items-center gap-4 text-xs text-indigo-200 mt-1">
                           <span className="flex items-center gap-1"><Calendar size={12}/> Last Order: {showOrderModal.lastOrderDate}</span>
                           <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
                           <span className="font-bold text-white">Smart Replenishment</span>
                        </div>
                    </div>
                 </div>
                 <button onClick={() => setShowOrderModal(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24}/></button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* Left: Configuration & Insights */}
                <div className="w-full md:w-1/3 border-r bg-gray-50 p-6 flex flex-col gap-6 overflow-y-auto">
                    {/* Insights Card */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-green-600"/> Performance Insights
                        </h4>
                        
                        <div className="space-y-4">
                           <div className="flex gap-3">
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                 <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Sales (7 Days)</p>
                                 <p className="text-lg font-bold text-gray-900">₹32,450</p>
                                 <p className="text-[10px] text-green-600 font-bold">+12% vs last week</p>
                              </div>
                              <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                 <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Sales (30 Days)</p>
                                 <p className="text-lg font-bold text-gray-900">₹1.45L</p>
                              </div>
                           </div>
                           
                           <div className="p-3 bg-red-50 rounded-lg border border-red-100 flex items-center justify-between">
                              <div>
                                 <p className="text-[10px] text-red-500 uppercase font-bold">Low Stock Items</p>
                                 <p className="text-lg font-bold text-red-700">
                                    {products.filter(p => p.companyId === showOrderModal.id && p.stock < p.minLevel).length} Products
                                 </p>
                              </div>
                              <AlertCircle size={20} className="text-red-400"/>
                           </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex gap-2">
                            <Sparkles size={16} className="text-blue-600 flex-shrink-0 mt-0.5"/>
                            <p className="text-xs text-blue-800 leading-snug">
                                <strong>Smart Tip:</strong> Based on recent sales velocity, you should increase stock for <em>Snacks</em> category by 15%.
                            </p>
                        </div>
                    </div>

                    {/* Budget Input */}
                    <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-md">
                        <label className="text-sm font-bold text-gray-700 mb-2 block flex items-center gap-2">
                            <Wallet size={16}/> Target Budget (Approx)
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-3.5 text-gray-500 font-bold">₹</span>
                                <input 
                                    type="number" 
                                    placeholder="Enter Amount..."
                                    className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-xl"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button 
                            className="w-full mt-4 py-3" 
                            onClick={handleSmartFill}
                            isLoading={isSmartFilling}
                            disabled={!targetAmount}
                        >
                            <Sparkles size={16} className="mr-2"/> Auto-Generate Order
                        </Button>
                    </div>

                    {/* Manual Add Product */}
                    <div className="mt-auto">
                        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">Manually Add Item</label>
                        <select 
                            className="w-full p-2.5 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            onChange={(e) => {
                                const prod = products.find(p => p.id === e.target.value);
                                if (prod) addProductToCart(prod);
                                e.target.value = ''; // Reset
                            }}
                        >
                            <option value="">+ Search & Add Product</option>
                            {products.filter(p => p.companyId === showOrderModal.id && !cart.find(c => c.product.id === p.id)).map(p => (
                                <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right: Cart (Order List) */}
                <div className="w-full md:w-2/3 flex flex-col bg-white">
                    {/* Live Budget Tracker */}
                    <div className="p-5 border-b bg-gray-50 flex justify-between items-center shadow-sm z-10">
                        <div>
                           <span className="font-bold text-gray-700 text-lg">Your Cart ({cart.length})</span>
                           <p className="text-xs text-gray-500">Adjust quantities as needed.</p>
                        </div>
                        
                        <div className="flex items-center gap-6 bg-white px-4 py-2 rounded-xl border shadow-sm">
                            <div className="text-right border-r pr-6 border-gray-100">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Total Value</p>
                                <p className={`text-xl font-extrabold text-gray-900`}>
                                    ₹{cartTotal.toLocaleString()}
                                </p>
                            </div>
                            
                            <div className={`text-right ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                                <p className="text-[10px] font-bold uppercase flex items-center justify-end gap-1">
                                   {isOverBudget && <AlertTriangle size={10}/>}
                                   {isOverBudget ? 'Over Budget' : 'Remaining'}
                                </p>
                                <p className="font-bold text-lg">
                                   {isOverBudget ? '+' : ''}₹{Math.abs(remaining).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Cart */}
                    <div className="flex-1 overflow-y-auto p-0 bg-gray-50/30">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                   <ShoppingCart size={32} className="text-indigo-200"/>
                                </div>
                                <h3 className="text-gray-900 font-bold mb-1">Cart is Empty</h3>
                                <p className="text-sm max-w-xs">Enter a budget on the left and click "Auto-Generate" or manually add products.</p>
                            </div>
                        ) : (
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white sticky top-0 z-10 shadow-sm text-gray-500 font-semibold">
                                    <tr>
                                        <th className="p-4 border-b bg-white">Product Info</th>
                                        <th className="p-4 border-b bg-white text-right">Landing Cost</th>
                                        <th className="p-4 border-b bg-white text-center">Order Qty</th>
                                        <th className="p-4 border-b bg-white text-right">Line Total</th>
                                        <th className="p-4 border-b bg-white w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {cart.map((item) => (
                                        <tr key={item.product.id} className="hover:bg-gray-50 group">
                                            <td className="p-4">
                                                <p className="font-bold text-gray-900 text-base">{item.product.name}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    {item.product.stock < item.product.minLevel ? (
                                                        <span className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold border border-red-100">
                                                            <AlertTriangle size={10}/> Low Stock ({item.product.stock})
                                                        </span>
                                                    ) : (
                                                       <span className="text-xs text-gray-400">Stock: {item.product.stock}</span>
                                                    )}
                                                    <span className="text-xs text-gray-400">|</span>
                                                    <span className="text-xs text-gray-500">MRP: ₹{item.product.mrp}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-medium">₹{item.product.landingCost}</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button 
                                                        onClick={() => updateQuantity(item.product.id, -10)}
                                                        className="w-8 h-8 rounded-lg border bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 shadow-sm transition-all active:scale-95"
                                                    ><Minus size={14}/></button>
                                                    <div className="w-16 text-center">
                                                       <span className="font-bold text-lg text-gray-900">{item.quantity}</span>
                                                       <p className="text-[10px] text-gray-400">Units</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => updateQuantity(item.product.id, 10)}
                                                        className="w-8 h-8 rounded-lg border bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 shadow-sm transition-all active:scale-95"
                                                    ><Plus size={14}/></button>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-bold text-gray-900 text-base">
                                                ₹{(item.quantity * item.product.landingCost).toLocaleString()}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button 
                                                    onClick={() => updateQuantity(item.product.id, -10000)}
                                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                ><X size={18}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 z-10">
                        <Button variant="outline" onClick={() => setShowOrderModal(null)}>Cancel Draft</Button>
                        <Button 
                            disabled={cart.length === 0}
                            onClick={() => { alert("Purchase Order Created! Sent to Supplier."); setShowOrderModal(null); }}
                            className={`px-8 ${isOverBudget ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {isOverBudget ? 'Confirm (Over Budget)' : 'Place Order'} <ArrowRight size={18} className="ml-2"/>
                        </Button>
                    </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};