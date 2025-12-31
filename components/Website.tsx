import React from 'react';
import { 
  WifiOff, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone, 
  Users, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Menu,
  X,
  Play,
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  Bell
} from 'lucide-react';
import { Button } from './Button';

interface WebsiteProps {
  onLoginClick: () => void;
}

export const Website: React.FC<WebsiteProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                VM
              </div>
              <span className="font-bold text-xl text-indigo-900">Vyapaar Mitra</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-indigo-600 font-medium">Benefits</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 font-medium">Pricing</a>
              <Button onClick={onLoginClick} variant="outline" size="sm">Log In</Button>
              <Button onClick={onLoginClick} size="sm">Get Started</Button>
            </div>

            <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b p-4 space-y-4 shadow-lg">
            <a href="#features" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <Button onClick={onLoginClick} className="w-full">Distributor Login</Button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Made for Bharat 🇮🇳
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Ab Business Chalega Nahi, <span className="text-indigo-600">Daudega!</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                India's #1 Offline-First App for Distributors. Manage Orders, Inventory, Staff, and GST Billing—even without internet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={onLoginClick} size="lg" className="shadow-xl shadow-indigo-200">
                  Start Free Trial <ArrowRight className="ml-2" size={20} />
                </Button>
                <button className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  <Play size={20} className="fill-gray-700" /> Watch Demo
                </button>
              </div>
              <p className="text-sm text-gray-500">
                <CheckCircle size={14} className="inline text-green-500 mr-1"/> No credit card required 
                <span className="mx-2">•</span> 
                <CheckCircle size={14} className="inline text-green-500 mr-1"/> Setup in 2 minutes
              </p>
            </div>
            
            {/* Abstract Mobile Mockup with Real Dashboard Content */}
            <div className="lg:w-1/2 relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden ring-4 ring-gray-100">
                 {/* Phone Buttons */}
                 <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                 <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                 <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                 <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                 
                 {/* Screen Content - Dashboard Recreation */}
                 <div className="rounded-[2rem] overflow-hidden w-full h-full bg-gray-50 relative flex flex-col font-sans select-none pointer-events-none">
                    
                    {/* Header */}
                    <div className="bg-[#1e1b4b] text-white p-4 pt-8 rounded-b-3xl shadow-lg z-10">
                       <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center"><Menu size={14}/></div>
                             <span className="font-bold text-sm">Vyapaar Mitra</span>
                          </div>
                          <div className="flex gap-2">
                             <Bell size={16} />
                             <div className="w-5 h-5 bg-blue-500 rounded-full text-[8px] flex items-center justify-center font-bold">RK</div>
                          </div>
                       </div>
                       <div className="flex justify-between items-end mb-2">
                          <div>
                             <p className="text-[10px] text-indigo-200">Total Sales Today</p>
                             <h2 className="text-xl font-bold">₹12,500</h2>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] text-green-300">Your Earning</p>
                             <h2 className="text-xl font-bold">₹42,500</h2>
                          </div>
                       </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-3 space-y-3 overflow-hidden">
                       
                       {/* Stats Grid */}
                       <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                             <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-2">
                                <ShoppingCart size={14}/>
                             </div>
                             <p className="text-[8px] text-gray-400 font-bold uppercase">Orders</p>
                             <p className="text-sm font-bold text-gray-800">12 New</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                             <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-2">
                                <Wallet size={14}/>
                             </div>
                             <p className="text-[8px] text-gray-400 font-bold uppercase">Udhaar</p>
                             <p className="text-sm font-bold text-gray-800">₹1.5L</p>
                          </div>
                       </div>

                       {/* Graph Visualization (New SVG Graph) */}
                       <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                             <p className="text-[10px] font-bold text-gray-800">Weekly Sales</p>
                             <div className="text-[8px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">+12%</div>
                          </div>
                          {/* SVG Area Chart */}
                          <div className="relative h-16 w-full">
                             <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                {/* Gradient Def */}
                                <defs>
                                   <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                                   </linearGradient>
                                </defs>
                                {/* Area */}
                                <path 
                                   d="M0 35 L 0 25 Q 10 15, 20 20 T 40 10 T 60 25 T 80 5 T 100 20 L 100 35 Z" 
                                   fill="url(#chartGradient)" 
                                />
                                {/* Line */}
                                <path 
                                   d="M0 25 Q 10 15, 20 20 T 40 10 T 60 25 T 80 5 T 100 20" 
                                   fill="none" 
                                   stroke="#4f46e5" 
                                   strokeWidth="2" 
                                   strokeLinecap="round"
                                />
                                {/* Points */}
                                <circle cx="20" cy="20" r="1.5" fill="white" stroke="#4f46e5" strokeWidth="1" />
                                <circle cx="40" cy="10" r="1.5" fill="white" stroke="#4f46e5" strokeWidth="1" />
                                <circle cx="80" cy="5" r="1.5" fill="white" stroke="#4f46e5" strokeWidth="1" />
                             </svg>
                          </div>
                          <div className="flex justify-between text-[8px] text-gray-400 mt-1">
                             <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                          </div>
                       </div>

                       {/* Recent Orders List */}
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase ml-1">Recent Transactions</p>
                          {[
                            { name: "Aggarwal Gen. Store", amount: "₹4,200", initial: "A", bg: "bg-pink-100", text: "text-pink-600", status: "Paid" },
                            { name: "Ram Mandir Store", amount: "₹1,850", initial: "R", bg: "bg-blue-100", text: "text-blue-600", status: "Paid" },
                            { name: "Hotel Krishna Palace", amount: "₹12,400", initial: "H", bg: "bg-green-100", text: "text-green-600", status: "Pending" }
                          ].map((t, i) => (
                             <div key={i} className="bg-white p-2 rounded-lg border border-gray-100 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-2">
                                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${t.bg} ${t.text}`}>
                                      {t.initial}
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-bold text-gray-800">{t.name}</p>
                                      <p className="text-[8px] text-gray-400">Just now</p>
                                   </div>
                                </div>
                                <div className="text-right">
                                   <p className="text-[10px] font-bold text-gray-800">{t.amount}</p>
                                   <span className={`text-[8px] px-1 rounded ${t.status === 'Paid' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>{t.status}</span>
                                </div>
                             </div>
                          ))}
                       </div>

                    </div>

                    {/* Floating FAB */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white">
                       <div className="text-xl">+</div>
                    </div>

                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm">Powerful Features</h2>
             <h3 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Everything a Distributor Needs</h3>
             <p className="mt-4 text-xl text-gray-500">From order taking to GST filing, we have digitized your entire vyapaar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: WifiOff, color: "text-red-600", bg: "bg-red-50", title: "Internet Nahi? Koi Baat Nahi", desc: "Create bills and take orders completely offline. Data syncs automatically when internet returns." },
               { icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", title: "Profit Margin Tracking", desc: "See your exact landing cost and profit margin on every single product sold. Stop selling at a loss." },
               { icon: Users, color: "text-blue-600", bg: "bg-blue-50", title: "Staff Tracking", desc: "Know exactly where your sales and delivery staff are. Track visits, orders, and daily performance." },
               { icon: FileText, color: "text-purple-600", bg: "bg-purple-50", title: "Smart GST Billing", desc: "Automated GSTR-1 & 3B reports. Our AI answers your GST questions instantly in Hinglish." },
               { icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50", title: "Secure Inventory", desc: "Track stock across multiple godowns. Get alerts before items expire or go out of stock." },
               { icon: Smartphone, color: "text-orange-600", bg: "bg-orange-50", title: "Payment Reminders", desc: "Send automated WhatsApp reminders to retailers for pending payments (Udhaar)." },
             ].map((feature, i) => (
               <div key={i} className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                  <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                     <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- Trust / Stats --- */}
      <section className="py-16 bg-indigo-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-indigo-800">
               <div>
                  <div className="text-4xl font-extrabold mb-2">2000+</div>
                  <div className="text-indigo-200">Distributors</div>
               </div>
               <div>
                  <div className="text-4xl font-extrabold mb-2">₹50Cr+</div>
                  <div className="text-indigo-200">Orders Processed</div>
               </div>
               <div>
                  <div className="text-4xl font-extrabold mb-2">15k+</div>
                  <div className="text-indigo-200">Retailers Managed</div>
               </div>
               <div>
                  <div className="text-4xl font-extrabold mb-2">4.8/5</div>
                  <div className="text-indigo-200">App Rating</div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-center mb-12">Desh ke Vyapari Kya Kehte Hain</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { name: "Rajesh Kumar", loc: "Wholesaler, Surat", text: "Pehle manual billing mein bohot galti hoti thi. Vyapaar Mitra se ab stock aur hisaab sab perfect rehta hai." },
                 { name: "Amit Singh", loc: "FMCG Distributor, Lucknow", text: "Offline feature sabse best hai. Mere ladke gaon mein bhi order le paate hain bina internet ke." },
                 { name: "Vikram Sethi", loc: "General Store Supplier, Delhi", text: "GST reports ek click mein mil jaate hain. CA ka kharcha aadha ho gaya." }
              ].map((t, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex gap-1 mb-4">
                       {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
                    </div>
                    <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">{t.name.charAt(0)}</div>
                       <div>
                          <p className="font-bold text-sm">{t.name}</p>
                          <p className="text-xs text-gray-500">{t.loc}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-400 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">VM</div>
                 <span className="font-bold text-xl text-white">Vyapaar Mitra</span>
               </div>
               <p className="max-w-xs">Empowering Indian distributors with technology that understands their business.</p>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Product</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Success Stories</a></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Contact</h4>
               <ul className="space-y-2 text-sm">
                  <li>support@vyapaarmitra.in</li>
                  <li>+91 98765 43210</li>
                  <li>Bangalore, India</li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
            &copy; 2024 Vyapaar Mitra Technologies Pvt Ltd. All rights reserved. Made with ❤️ in India.
         </div>
      </footer>
    </div>
  );
};