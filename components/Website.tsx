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
  Bell,
  HelpCircle,
  Database,
  BarChart3,
  Globe,
  Star,
  Zap
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
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                VM
              </div>
              <span className="font-bold text-xl text-indigo-900">Vyapaar Mitra</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
              <a href="#comparison" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Why Us</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">FAQ</a>
              <Button onClick={onLoginClick} variant="outline" size="sm">Log In</Button>
              <Button onClick={onLoginClick} size="sm">Get Started</Button>
            </div>

            <button className="md:hidden text-gray-600 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b p-4 space-y-4 shadow-lg animate-in slide-in-from-top-5">
            <a href="#features" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <Button onClick={onLoginClick} className="w-full">Distributor Login</Button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Top Rated Billing Software 2024
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                India's Best <span className="text-indigo-600">GST Billing Software</span> for Distributors
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Stop using manual registers. Switch to Vyapaar Mitra—the offline-first Inventory Management & Invoicing App designed for Indian Business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={onLoginClick} size="lg" className="shadow-xl shadow-indigo-200">
                  Download App Free <ArrowRight className="ml-2" size={20} />
                </Button>
                <button className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  <Play size={20} className="fill-gray-700" /> Watch Demo
                </button>
              </div>
              <p className="text-sm text-gray-500">
                <CheckCircle size={14} className="inline text-green-500 mr-1"/> Lifetime Free Plan Available
                <span className="mx-2">•</span> 
                <CheckCircle size={14} className="inline text-green-500 mr-1"/> ISO Certified
              </p>
            </div>
            
            {/* Abstract Mobile Mockup with Real Dashboard Content */}
            <div className="lg:w-1/2 relative hidden md:block">
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden ring-4 ring-gray-100 transform hover:scale-105 transition-transform duration-500">
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
      </header>

      {/* --- Features Grid (Keywords Optimized) --- */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm">Key Features</h2>
             <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Complete Billing & Inventory Solution</h2>
             <p className="mt-4 text-xl text-gray-500">Why thousands of wholesalers choose our Billing App over manual books.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: WifiOff, color: "text-red-600", bg: "bg-red-50", title: "Offline Billing App", desc: "No Internet? No Problem. Create invoices and manage stock completely offline. Syncs automatically." },
               { icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", title: "Profit & Loss Reports", desc: "Track daily profit margins, landing costs, and expenses. Best accounting software for traders." },
               { icon: Users, color: "text-blue-600", bg: "bg-blue-50", title: "Salesman Tracking App", desc: "Live GPS tracking for sales staff. Monitor visits, order booking, and collections in real-time." },
               { icon: FileText, color: "text-purple-600", bg: "bg-purple-50", title: "GST Invoice Generator", desc: "Generate professional GST bills. Automated GSTR-1 & 3B reports compliant with Indian Tax Laws." },
               { icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50", title: "Inventory Management", desc: "Batch-wise stock tracking, expiry alerts, and multi-godown management in one dashboard." },
               { icon: Smartphone, color: "text-orange-600", bg: "bg-orange-50", title: "Payment Reminder App", desc: "Send automated WhatsApp reminders for Udhaar/Credit collection. Reduce outstanding by 40%." },
             ].map((feature, i) => (
               <div key={i} className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-gray-100">
                  <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                     <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- SEO Content Block: Comparison (Manual vs Digital) --- */}
      <section id="comparison" className="py-20 bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-6">Why switch from Manual Billing to Vyapaar Mitra Software?</h2>
                 <p className="text-gray-600 mb-6 leading-relaxed">
                    Traditional "Kaccha Bill" and manual registers are prone to errors and theft. Vyapaar Mitra is the best <strong>GST billing software for PC and Mobile</strong> that automates your entire distribution business.
                 </p>
                 <ul className="space-y-4">
                    {[
                       "Eliminate calculation errors in GST invoices.",
                       "Track inventory stock in real-time (No theft).",
                       "Access business data from anywhere (Cloud Sync).",
                       "Professional bill format builds trust with retailers."
                    ].map((item, i) => (
                       <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="text-indigo-600 flex-shrink-0 mt-1" size={20}/>
                          <span className="font-medium text-gray-800">{item}</span>
                       </li>
                    ))}
                 </ul>
                 <Button onClick={onLoginClick} className="mt-8">Start Digital Journey</Button>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                 <h3 className="font-bold text-xl mb-4 text-center">Software vs Manual</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                       <span className="text-red-700 font-medium">Manual Bill</span>
                       <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">Slow & Risky</span>
                    </div>
                    <div className="flex justify-center">
                       <ArrowRight className="rotate-90 text-gray-400"/>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                       <span className="text-green-700 font-medium">Vyapaar Mitra App</span>
                       <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">10x Faster</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                       <div className="p-2 bg-gray-50 rounded">
                          <Database size={20} className="mx-auto mb-1 text-gray-500"/>
                          Auto Backup
                       </div>
                       <div className="p-2 bg-gray-50 rounded">
                          <BarChart3 size={20} className="mx-auto mb-1 text-gray-500"/>
                          Sales Report
                       </div>
                       <div className="p-2 bg-gray-50 rounded">
                          <Globe size={20} className="mx-auto mb-1 text-gray-500"/>
                          Remote Access
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- PRICING SECTION (Added for SEO) --- */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
             <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm">Affordable Pricing</span>
             <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Billing Software Price Plans</h2>
             <p className="mt-4 text-xl text-gray-500">Choose the best plan for your business. No hidden charges.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 relative">
                 <h3 className="text-lg font-bold text-gray-900">Vyapaar Basic</h3>
                 <div className="my-4">
                    <span className="text-4xl font-extrabold text-gray-900">FREE</span>
                    <span className="text-gray-500"> / Lifetime</span>
                 </div>
                 <p className="text-sm text-gray-500 mb-6">Best for small shopkeepers & startups.</p>
                 <ul className="space-y-3 mb-8">
                    {['Unlimited Invoices', 'Inventory Tracking', 'Mobile App Access', 'Basic GST Reports'].map((f, i) => (
                       <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={16} className="text-green-500"/> {f}
                       </li>
                    ))}
                 </ul>
                 <Button variant="outline" onClick={onLoginClick} className="w-full">Download Free</Button>
              </div>

              {/* Pro Plan (Best Value) */}
              <div className="bg-white rounded-2xl p-8 border-2 border-indigo-600 shadow-xl relative transform scale-105">
                 <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                 <h3 className="text-lg font-bold text-gray-900">Distributor Pro</h3>
                 <div className="my-4">
                    <span className="text-4xl font-extrabold text-gray-900">₹499</span>
                    <span className="text-gray-500"> / Year</span>
                 </div>
                 <p className="text-sm text-gray-500 mb-6">For growing distributors & wholesalers.</p>
                 <ul className="space-y-3 mb-8">
                    {['Everything in Basic', 'Salesman Tracking (GPS)', 'Advanced Profit Reports', 'WhatsApp Reminders', 'Multi-User Access'].map((f, i) => (
                       <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={16} className="text-indigo-600"/> <strong>{f}</strong>
                       </li>
                    ))}
                 </ul>
                 <Button onClick={onLoginClick} className="w-full bg-indigo-600 hover:bg-indigo-700">Start Free Trial</Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 relative">
                 <h3 className="text-lg font-bold text-gray-900">Super Stockist</h3>
                 <div className="my-4">
                    <span className="text-4xl font-extrabold text-gray-900">₹999</span>
                    <span className="text-gray-500"> / Year</span>
                 </div>
                 <p className="text-sm text-gray-500 mb-6">For large godowns & agencies.</p>
                 <ul className="space-y-3 mb-8">
                    {['Unlimited Users', 'Dedicated Support Manager', 'API Access', 'Custom Branding', 'E-Way Bill Generation'].map((f, i) => (
                       <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={16} className="text-green-500"/> {f}
                       </li>
                    ))}
                 </ul>
                 <Button variant="outline" onClick={onLoginClick} className="w-full">Contact Sales</Button>
              </div>
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
                  <div className="text-indigo-200">Play Store Rating</div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-center mb-12">Reviews from Indian Distributors</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { name: "Rajesh Kumar", loc: "Wholesaler, Surat", text: "Best billing software for shop. Pehle manual billing mein bohot galti hoti thi. Vyapaar Mitra se ab stock aur hisaab sab perfect rehta hai." },
                 { name: "Amit Singh", loc: "FMCG Distributor, Lucknow", text: "Offline feature sabse best hai. This is the top billing app for distributors who work in low network areas." },
                 { name: "Vikram Sethi", loc: "General Store Supplier, Delhi", text: "GST reports ek click mein mil jaate hain. CA ka kharcha aadha ho gaya. Highly recommended inventory software." }
              ].map((t, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                    <div className="flex gap-1 mb-4">
                       {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 fill-yellow-400"><Star size={16} fill="currentColor"/></span>)}
                    </div>
                    <p className="text-gray-700 italic mb-6 flex-1">"{t.text}"</p>
                    <div className="flex items-center gap-3 mt-auto">
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

      {/* --- FAQ Section (Optimized for Voice Search & LLMs) --- */}
      <section id="faq" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm">Have Questions?</span>
             <h2 className="mt-2 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
             <p className="mt-4 text-gray-500">Answers to common queries about India's top billing app.</p>
           </div>
           
           <div className="space-y-4">
              {[
                { q: "Is this billing software free to download?", a: "Yes, Vyapaar Mitra offers a free trial version for all distributors. You can download the app and start creating GST invoices immediately without entering credit card details." },
                { q: "Does Vyapaar Mitra work without internet (Offline)?", a: "Absolutely. We are an 'Offline-First' billing software. You can create bills, manage inventory, and take orders without internet. Data syncs to the cloud automatically when you connect to Wi-Fi." },
                { q: "Can I manage GSTR-1 and GSTR-3B filing?", a: "Yes, our GST billing software automatically generates GSTR-1, GSTR-2B, and GSTR-3B reports in Excel/JSON format, compatible with the government GST portal." },
                { q: "Is this app suitable for mobile and PC?", a: "Yes, Vyapaar Mitra is a cross-platform solution. You can use the Android App for field sales and the Web Dashboard (PC) for admin and inventory management." },
                { q: "How secure is my business data?", a: "Your data is 100% secure with bank-grade encryption. We take daily automatic backups so you never lose your 'Hisaab Kitaab'." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                   <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-3">
                     <HelpCircle className="text-indigo-500 flex-shrink-0 mt-1" size={20}/>
                     {faq.q}
                   </h3>
                   <p className="text-gray-600 ml-8 leading-relaxed">{faq.a}</p>
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
               <p className="max-w-xs mb-4">Empowering Indian distributors with technology that understands their business.</p>
               <p className="text-xs">
                  #1 GST Billing Software • Inventory App • Distributor ERP
               </p>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Software</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#features" className="hover:text-white">Billing Features</a></li>
                  <li><a href="#features" className="hover:text-white">Inventory Management</a></li>
                  <li><a href="#pricing" className="hover:text-white">Pricing Plans</a></li>
                  <li><a href="#faq" className="hover:text-white">Download App</a></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Contact Us</h4>
               <ul className="space-y-2 text-sm">
                  <li>support@vyapaarmitra.in</li>
                  <li>+91 98765 43210</li>
                  <li>HSR Layout, Bangalore, Karnataka, India</li>
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