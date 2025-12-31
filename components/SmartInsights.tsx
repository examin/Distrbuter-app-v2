import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { Button } from './Button';
import { getBusinessInsights } from '../services/geminiService';

interface SmartInsightsProps {
  products: Product[];
}

export const SmartInsights: React.FC<SmartInsightsProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handlePredict = async (product: Product) => {
    setSelectedProduct(product);
    setLoading(true);
    setPrediction(null);
    
    // Simulating API delay for effect
    setTimeout(() => {
       // Mock prediction - in real app, this comes from Gemini via geminiService
       setPrediction({
          recommendedQty: Math.floor(product.stock * 1.5),
          confidence: 85,
          reasoning: "Diwali season is approaching in 2 weeks. Historical data shows 40% spike in biscuit sales. Current stock is below safety buffer.",
          stockOutRisk: "High",
          holdingCost: "₹450/week"
       });
       setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-[80vh] flex flex-col lg:flex-row gap-6">
       {/* Left: Master List */}
       <div className="lg:w-1/3 bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">Select Product for Forecast</div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {products.map(p => (
                <div 
                   key={p.id} 
                   onClick={() => handlePredict(p)}
                   className={`p-3 rounded-lg cursor-pointer border transition-all ${selectedProduct?.id === p.id ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
                >
                   <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">{p.name}</span>
                      <Brain size={16} className={`${selectedProduct?.id === p.id ? 'text-indigo-600' : 'text-gray-300'}`}/>
                   </div>
                   <p className="text-xs text-gray-500 mt-1">Current Stock: {p.stock}</p>
                </div>
             ))}
          </div>
       </div>

       {/* Right: Detail View */}
       <div className="lg:w-2/3 flex flex-col">
          {selectedProduct ? (
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-indigo-100 rounded-full text-indigo-600"><Sparkles size={24}/></div>
                   <div>
                      <h2 className="text-xl font-bold text-gray-900">AI Demand Forecast</h2>
                      <p className="text-sm text-gray-500">Analyzing trends for {selectedProduct.name}</p>
                   </div>
                </div>

                {loading ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-gray-400 animate-pulse">
                      <Loader2 size={48} className="animate-spin text-indigo-600 mb-4"/>
                      <p>Crunching sales numbers...</p>
                      <p className="text-xs">Checking local events...</p>
                   </div>
                ) : prediction && (
                   <div className="flex-1 space-y-8 animate-in fade-in zoom-in duration-300">
                      
                      {/* Big Recommendation */}
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg">
                         <p className="text-indigo-100 font-medium uppercase tracking-widest text-xs mb-2">Recommended Order Quantity</p>
                         <div className="text-5xl font-extrabold mb-1">{prediction.recommendedQty} Units</div>
                         <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                            {prediction.confidence}% Confidence Score
                         </div>
                      </div>

                      {/* Reasoning Box */}
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                         <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <Brain size={18} className="text-gray-500"/> Why this prediction?
                         </h4>
                         <p className="text-gray-700 leading-relaxed text-sm">
                            "{prediction.reasoning}"
                         </p>
                      </div>

                      {/* Secondary Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                         <div className="p-4 rounded-xl border text-center bg-red-50 border-red-100">
                            <p className="text-xs text-red-500 font-bold uppercase">Stock Out Risk</p>
                            <p className="font-bold text-red-700 mt-1">{prediction.stockOutRisk}</p>
                         </div>
                         <div className="p-4 rounded-xl border text-center bg-gray-50 border-gray-200">
                            <p className="text-xs text-gray-500 font-bold uppercase">Holding Cost</p>
                            <p className="font-bold text-gray-700 mt-1">{prediction.holdingCost}</p>
                         </div>
                         <div className="p-4 rounded-xl border text-center bg-green-50 border-green-100">
                            <p className="text-xs text-green-500 font-bold uppercase">Est. Profit</p>
                            <p className="font-bold text-green-700 mt-1">High</p>
                         </div>
                      </div>

                      <div className="mt-auto">
                         <Button className="w-full py-4 text-lg shadow-xl shadow-indigo-200">
                            Send Order to Company <ArrowRight className="ml-2" size={20}/>
                         </Button>
                      </div>
                   </div>
                )}
             </div>
          ) : (
             <div className="h-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-medium">
                Select a product from the left to generate insights
             </div>
          )}
       </div>
    </div>
  );
};
