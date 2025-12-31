import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users as UsersIcon, 
  Menu, 
  Bot, 
  IndianRupee,
  CheckCircle, 
  Clock, 
  LogOut, 
  TrendingUp, 
  AlertTriangle, 
  ArrowDownLeft, 
  Wallet, 
  Smartphone, 
  Calendar, 
  Warehouse, 
  FileText, 
  Briefcase, 
  Bell, 
  Sparkles, 
  ChevronDown, 
  Search 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { APP_LABELS, MOCK_ORDERS, MOCK_PRODUCTS, MOCK_RETAILERS, MOCK_TRANSACTIONS, MOCK_GODOWNS, MOCK_COMPANIES, MOCK_STAFF } from './constants';
import { Order, Product, Retailer, Role, OrderStatus, Transaction, TransactionType, PaymentMode, Godown, Batch, Company, Staff } from './types';
import { Button } from './components/Button';

// Import New Components
import { Orders } from './components/Orders';
import { Companies } from './components/Companies';
import { Inventory } from './components/Inventory';
import { Payments } from './components/Payments';
import { Users } from './components/Users';
import { GSTCenter } from './components/GSTCenter';
import { SmartInsights } from './components/SmartInsights';
import { Website } from './components/Website';

// --- Sub-Components ---

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1000); // Simulate API
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div className="min-h-screen bg-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-indigo-700">VM</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{APP_LABELS.appName}</h1>
          <p className="text-gray-500">{APP_LABELS.loginSubtitle}</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <div className="relative mt-1">
                <Smartphone className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  required 
                  type="tel" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900 placeholder-gray-400 transition-all" 
                  placeholder="98765 43210" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                />
              </div>
            </div>
            <Button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700" isLoading={loading}>Send OTP</Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4 animate-fade-in">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">OTP sent to +91 {phone}</span>
              <button type="button" onClick={() => setStep(1)} className="text-indigo-600 text-sm font-bold ml-2">Edit</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <div className="relative mt-1">
                <div className="absolute left-3 top-3 text-gray-400 font-bold">🔒</div>
                <input 
                  required 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none tracking-widest text-lg bg-white text-gray-900 placeholder-gray-400 transition-all" 
                  placeholder="1 2 3 4" 
                  value={otp} 
                  onChange={e => setOtp(e.target.value)} 
                />
              </div>
            </div>
            <Button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700" isLoading={loading}>Verify & Login</Button>
          </form>
        )}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">Secure • Encrypted • Made in India 🇮🇳</p>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subtext, icon: Icon, type, actionLabel, onAction }: any) => {
  const styles = {
    sales: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100', border: 'border-green-100' },
    stock: { bg: 'bg-red-50', text: 'text-red-600', iconBg: 'bg-red-100', border: 'border-red-100' },
    payment: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100', border: 'border-orange-100' },
    orders: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100', border: 'border-blue-100' },
  };
  
  const s = styles[type as keyof typeof styles] || styles.sales;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.iconBg} ${s.text}`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-2 flex-wrap">
           <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
           <span className={`text-xs font-bold ${type === 'sales' ? 'text-green-600' : type === 'stock' ? 'text-red-600' : 'text-gray-500'}`}>
             {subtext}
           </span>
        </div>
        {actionLabel && (
          <button onClick={onAction} className={`mt-3 text-xs font-bold uppercase tracking-wide hover:underline flex items-center gap-1 ${s.text}`}>
            {actionLabel} <ArrowDownLeft size={12} className="rotate-180"/>
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  // State for View Management
  const [showWebsite, setShowWebsite] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [currentRole, setCurrentRole] = useState<Role>(Role.ADMIN);
  const [view, setView] = useState<'dashboard' | 'orders' | 'companies' | 'inventory' | 'retailers' | 'payments' | 'staff' | 'gst' | 'insights'>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Data State
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [retailers, setRetailers] = useState<Retailer[]>(MOCK_RETAILERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [godowns] = useState<Godown[]>(MOCK_GODOWNS);
  const [companies] = useState<Company[]>(MOCK_COMPANIES);
  const [staff] = useState<Staff[]>(MOCK_STAFF);

  // Derived Stats
  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingOrdersCount = orders.filter(o => o.status === OrderStatus.PENDING).length;
  const totalUdhaar = retailers.reduce((acc, r) => acc + r.outstandingBalance, 0);
  const lowStockItems = products.filter(p => p.stock < p.minLevel).length;

  // Calculate estimated profit for the month (mock logic + existing orders)
  const monthlyProfit = orders.reduce((acc, o) => acc + (o.finalAmount * (o.profitMargin || 20) / 100), 0) + 45800; 

  const handlePaymentCollect = (amount: number, mode: PaymentMode, retailerId: string) => {
     setRetailers(prev => prev.map(r => 
        r.id === retailerId ? { ...r, outstandingBalance: r.outstandingBalance - amount } : r
     ));
     alert(`Collected ₹${amount} via ${mode}`);
  };

  // --- Render Flow Logic ---
  
  // 1. Show Website First
  if (showWebsite && !isAuthenticated) {
    return <Website onLoginClick={() => setShowWebsite(false)} />;
  }

  // 2. Show Login Screen if Website closed but not auth
  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- Sidebar Component ---
  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1e1b4b] text-white shadow-xl transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center cursor-pointer" onClick={() => { setIsAuthenticated(false); setShowWebsite(true); }}>
            <span className="text-xl font-bold text-[#1e1b4b] tracking-tighter">VM</span>
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-lg">Vyapaar</h1>
            <h1 className="font-bold text-lg -mt-1">Mitra</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: 'Orders (Sales)', icon: ShoppingCart },
            { id: 'companies', label: 'Companies (Suppliers)', icon: Briefcase }, 
            { id: 'inventory', label: 'Godown / Stock', icon: Warehouse },
            { id: 'payments', label: 'Hisaab (Payments)', icon: IndianRupee },
            { id: 'staff', label: 'Staff & Team', icon: UsersIcon },
            { id: 'gst', label: 'GST & Billing', icon: FileText }, 
            { id: 'insights', label: 'Smart Insights', icon: Sparkles }, 
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setView(item.id as any); setSidebarOpen(false); }}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${view === item.id 
                  ? 'bg-[#4338ca] text-white' 
                  : 'text-gray-300 hover:bg-[#312e81] hover:text-white'}`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 bg-[#312e81]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Rajesh Kumar</p>
              <p className="text-xs text-blue-200 truncate uppercase tracking-wider">Admin Account</p>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="text-gray-400 hover:text-white">
               <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TopHeader = () => (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-600">
                <Menu size={24} />
            </button>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
            />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 text-xs font-bold uppercase tracking-wider">
                <CheckCircle size={14} /> Synced
            </div>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer">
                RK
            </div>
            <ChevronDown size={16} className="text-gray-400 cursor-pointer hidden md:block" />
        </div>
    </header>
  );

  // Dashboard View Logic
  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in p-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
         <div>
             <h1 className="text-3xl font-bold text-gray-900">Ram Ram, Rajesh!</h1>
             <p className="text-gray-500 mt-1">Business ki aaj ki taaza report.</p>
         </div>
         <div className="bg-white px-6 py-4 rounded-xl border border-green-100 shadow-sm flex items-center gap-4 bg-gradient-to-r from-green-50 to-white">
             <div className="p-3 bg-green-100 rounded-full text-green-700">
                <IndianRupee size={28} />
             </div>
             <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Your Earning (This Month)</p>
                <h3 className="font-extrabold text-gray-900 text-2xl">₹{monthlyProfit.toLocaleString()}</h3>
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="AAJ KI SALES" value={`₹${totalSales.toLocaleString()}`} subtext="+12%" icon={TrendingUp} type="sales" />
        <MetricCard title="KAM STOCK ITEMS" value={lowStockItems} subtext="" icon={AlertTriangle} type="stock" actionLabel="Order Karein" onAction={() => setView('inventory')} />
        <MetricCard title="PAYMENT DUE" value={`₹${(totalUdhaar/100000).toFixed(1)}L`} subtext="15 Log" icon={Wallet} type="payment" />
        <MetricCard title="TOTAL ORDERS" value={orders.length} subtext={`${pendingOrdersCount} Pending`} icon={ArrowDownLeft} type="orders" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 flex flex-col h-[400px]">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={20} /></div>
                 <span className="font-bold text-indigo-900 uppercase tracking-wider text-xs">(WEEK) 1, 2025</span>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                 <button className="px-3 py-1 bg-white text-xs font-bold rounded-md shadow-sm text-gray-800">Weekly</button>
                 <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:text-gray-700">Monthly</button>
              </div>
           </div>
           <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[{name:'Mon',val:45000},{name:'Tue',val:52000},{name:'Wed',val:38000},{name:'Thu',val:65000},{name:'Fri',val:48000},{name:'Sat',val:72000},{name:'Sun',val:30000}]} barSize={32}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} tickFormatter={(value) => `₹${value/1000}k`}/>
                 <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                 <Bar dataKey="val" fill="#6366f1" radius={[6, 6, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col h-[400px]">
           <div className="mb-4"><h3 className="font-bold text-gray-900 text-lg">Recent Transactions</h3></div>
           <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {orders.slice(0, 6).map((order) => {
                 const initial = order.retailerName.charAt(0);
                 const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600', 'bg-pink-100 text-pink-600'];
                 const colorClass = colors[order.id.charCodeAt(order.id.length-1) % colors.length];
                 return (
                   <div key={order.id} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${colorClass}`}>{initial}</div>
                         <div>
                            <p className="font-bold text-sm text-gray-900 line-clamp-1">{order.retailerName}</p>
                            <p className="text-xs text-gray-400">2h ago</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="font-bold text-sm">₹{order.finalAmount.toLocaleString()}</p>
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${order.status === OrderStatus.APPROVED ? 'bg-blue-50 text-blue-600' : order.status === OrderStatus.PENDING ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>{order.status.toUpperCase()}</span>
                      </div>
                   </div>
                 );
              })}
           </div>
           <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
               <button onClick={() => setView('orders')} className="w-full py-2.5 text-center text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-dashed border-indigo-200">Sari Transactions Dekhein</button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f9fafb] font-sans text-gray-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
         <TopHeader />
         <main className="flex-1 overflow-y-auto bg-[#f9fafb]">
            {view === 'dashboard' && renderDashboard()}
            
            <div className="p-6">
               {view === 'orders' && <Orders orders={orders} />}
               {view === 'companies' && <Companies companies={companies} products={products} />}
               {view === 'inventory' && <Inventory godowns={godowns} products={products} />}
               {view === 'payments' && <Payments retailers={retailers} onCollect={handlePaymentCollect} />}
               {view === 'staff' && <Users staffList={staff} />}
               {view === 'gst' && <GSTCenter />}
               {view === 'insights' && <SmartInsights products={products} />}
            </div>

            <div className="p-6 text-center">
               <div className="inline-flex items-center gap-2 opacity-50">
                  <span className="font-bold text-indigo-900">VM</span>
                  <span className="text-xs font-medium text-gray-500">Vyapaar Mitra • Sahi business, sahi anumaan.</span>
               </div>
            </div>
         </main>
      </div>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}

export default App;