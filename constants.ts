import { Product, Retailer, Order, OrderStatus, Transaction, TransactionType, PaymentMode, Godown, Company, Staff, Role } from './types';

export const MOCK_GODOWNS: Godown[] = [
  { id: 'g1', name: 'Main City Godown', location: 'Industrial Area', managerName: 'Ramesh Bhai', capacityFill: 85 },
  { id: 'g2', name: 'Highway Hub', location: 'Market Road', managerName: 'Suresh Kumar', capacityFill: 42 }
];

export const MOCK_COMPANIES: Company[] = [
  { id: 'c5', name: 'Vanesa Care Pvt Ltd', repName: 'Anil Malhotra', repPhone: '9876500005', avgMargin: 22, productCount: 50, lastOrderDate: '2023-10-25' },
  { id: 'c1', name: 'Hindustan Unilever', repName: 'Rahul Verma', repPhone: '9876500001', avgMargin: 12, productCount: 45, lastOrderDate: '2023-10-20' },
  { id: 'c2', name: 'ITC Limited', repName: 'Amit Singh', repPhone: '9876500002', avgMargin: 15, productCount: 30, lastOrderDate: '2023-10-22' },
];

export const MOCK_PRODUCTS: Product[] = [
  // --- Pour Drive / Home (Air Care) ---
  { 
    id: 'ph-01', name: 'Pour Drive Nector Home Black Dusk 10g', sku: 'PD-BD-10', 
    price: 65, mrp: 85, landingCost: 45.00, gstRate: 18, offer: "Buy 10 Get 1",
    stock: 200, minLevel: 50, category: 'Air Care', companyId: 'c5',
    batches: [{ id: 'b1', batchNumber: 'B001', expiryDate: '2025-12-31', quantity: 200, godownId: 'g1' }]
  },
  { 
    id: 'ph-02', name: 'Pour Home Room Freshener Jasmine 220ml', sku: 'PH-RF-JAS', 
    price: 125, mrp: 160, landingCost: 95.00, gstRate: 18,
    stock: 150, minLevel: 30, category: 'Air Care', companyId: 'c5',
    batches: [{ id: 'b2', batchNumber: 'B002', expiryDate: '2025-10-30', quantity: 150, godownId: 'g1' }]
  },
  { 
    id: 'ph-03', name: 'Pour Home Blocks Flora Fusion Rose Lime 50g', sku: 'PH-BLK-RL', 
    price: 55, mrp: 70, landingCost: 38.00, gstRate: 18,
    stock: 300, minLevel: 60, category: 'Air Care', companyId: 'c5',
    batches: [{ id: 'b3', batchNumber: 'B003', expiryDate: '2025-06-30', quantity: 300, godownId: 'g1' }]
  },
  { 
    id: 'ph-04', name: 'Pour Home Nector Morning Breeze 10g', sku: 'PH-NEC-MB', 
    price: 65, mrp: 85, landingCost: 45.00, gstRate: 18,
    stock: 40, minLevel: 50, category: 'Air Care', companyId: 'c5', // Low Stock
    batches: [{ id: 'b4', batchNumber: 'B004', expiryDate: '2025-08-15', quantity: 40, godownId: 'g2' }]
  },
  { 
    id: 'ph-05', name: 'Pour Home Room Freshener French Fusion 220ml', sku: 'PH-RF-FRE', 
    price: 125, mrp: 160, landingCost: 95.00, gstRate: 18, offer: "Flat 5% Off",
    stock: 120, minLevel: 30, category: 'Air Care', companyId: 'c5',
    batches: [{ id: 'b5', batchNumber: 'B005', expiryDate: '2025-09-30', quantity: 120, godownId: 'g1' }]
  },
  { 
    id: 'ph-06', name: 'Pour Home Neo Air Citron Twist 7.5g', sku: 'PH-NEO-CT', 
    price: 45, mrp: 60, landingCost: 32.00, gstRate: 18,
    stock: 500, minLevel: 100, category: 'Air Care', companyId: 'c5',
    batches: [{ id: 'b6', batchNumber: 'B006', expiryDate: '2025-11-30', quantity: 500, godownId: 'g2' }]
  },

  // --- Vanesa (Personal Care) ---
  { 
    id: 'va-01', name: 'Vanesa Body Wash 100ml', sku: 'VA-BW-100', 
    price: 90, mrp: 120, landingCost: 65.00, gstRate: 18,
    stock: 80, minLevel: 20, category: 'Personal Care', companyId: 'c5',
    batches: [{ id: 'b7', batchNumber: 'B007', expiryDate: '2025-05-30', quantity: 80, godownId: 'g1' }]
  },
  { 
    id: 'va-02', name: 'Vanesa Perfume Grace 60ml', sku: 'VA-PER-GR', 
    price: 180, mrp: 249, landingCost: 135.00, gstRate: 18, offer: "Buy 6 Get 1 Tester",
    stock: 60, minLevel: 15, category: 'Perfume', companyId: 'c5',
    batches: [{ id: 'b8', batchNumber: 'B008', expiryDate: '2026-01-30', quantity: 60, godownId: 'g1' }]
  },
  { 
    id: 'va-03', name: 'Vanesa Deo Babe 150ml', sku: 'VA-DEO-BB', 
    price: 150, mrp: 199, landingCost: 110.00, gstRate: 18,
    stock: 200, minLevel: 50, category: 'Deodorant', companyId: 'c5',
    batches: [{ id: 'b9', batchNumber: 'B009', expiryDate: '2025-12-31', quantity: 200, godownId: 'g1' }]
  },
  { 
    id: 'va-04', name: 'Vanesa Deo Nano Queen 30ml', sku: 'VA-NANO-QN', 
    price: 60, mrp: 85, landingCost: 40.00, gstRate: 18,
    stock: 400, minLevel: 100, category: 'Deodorant', companyId: 'c5',
    batches: [{ id: 'b10', batchNumber: 'B010', expiryDate: '2025-08-30', quantity: 400, godownId: 'g2' }]
  },
  { 
    id: 'va-05', name: 'Vanesa Pocket Perfume Diva 18ml', sku: 'VA-PKT-DIV', 
    price: 45, mrp: 60, landingCost: 30.00, gstRate: 18,
    stock: 600, minLevel: 100, category: 'Perfume', companyId: 'c5',
    batches: [{ id: 'b11', batchNumber: 'B011', expiryDate: '2025-11-15', quantity: 600, godownId: 'g2' }]
  },
  { 
    id: 'va-06', name: 'Vanesa Perfume Desire 100ml', sku: 'VA-PER-DES', 
    price: 350, mrp: 499, landingCost: 260.00, gstRate: 18,
    stock: 25, minLevel: 10, category: 'Perfume', companyId: 'c5',
    batches: [{ id: 'b12', batchNumber: 'B012', expiryDate: '2026-03-30', quantity: 25, godownId: 'g1' }]
  },
  
  // --- Other Basics (Retained for variety) ---
  { 
    id: 'p1', name: 'Parle-G Gold 100g', sku: 'PG100', 
    price: 10, mrp: 12, landingCost: 8.50, gstRate: 18, 
    stock: 500, minLevel: 100, category: 'Biscuits', companyId: 'c3',
    batches: [{ id: 'b13', batchNumber: 'B013', expiryDate: '2024-12-31', quantity: 500, godownId: 'g1' }]
  }
];

export const MOCK_RETAILERS: Retailer[] = [
  { id: 'r1', shopName: 'Sharma Kirana Store', ownerName: 'Rajesh Sharma', phone: '9876543210', address: 'Main Market, Sector 4', outstandingBalance: 5000, daysOverdue: 20, isSynced: true },
  { id: 'r2', shopName: 'Gupta General Store', ownerName: 'Suresh Gupta', phone: '9988776655', address: 'Near Railway Station', outstandingBalance: 1200, daysOverdue: 5, isSynced: true },
  { id: 'r3', shopName: 'Laxmi Super Mart', ownerName: 'Laxmi Devi', phone: '9123456789', address: 'Highway Road, Plot 12', outstandingBalance: 0, daysOverdue: 0, isSynced: true },
];

export const MOCK_STAFF: Staff[] = [
  { id: 's1', name: 'Vikram Singh', role: Role.SALES, phone: '9000011111', active: true, metrics: { label: 'Orders Taken', value: 12 } },
  { id: 's2', name: 'Chotu Bhai', role: Role.DELIVERY, phone: '9000022222', active: true, metrics: { label: 'Deliveries Today', value: 8 } },
  { id: 's3', name: 'Ramesh Manager', role: Role.GODOWN, phone: '9000033333', active: true, metrics: { label: 'Items Scanned', value: 450 } },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o101',
    retailerId: 'r1',
    retailerName: 'Sharma Kirana Store',
    retailerArea: 'Sector 4',
    date: '2023-10-24',
    status: OrderStatus.APPROVED,
    items: [
      { productId: 'ph-01', productName: 'Pour Drive Nector Home Black Dusk 10g', quantity: 20, unitPrice: 65, total: 1300 },
      { productId: 'va-01', productName: 'Vanesa Body Wash 100ml', quantity: 10, unitPrice: 90, total: 900 },
    ],
    totalAmount: 2200,
    discount: 0,
    finalAmount: 2200,
    profitMargin: 25,
    paymentStatus: 'Unpaid',
    podStatus: 'Pending',
    createdBy: 'Vikram Singh',
    synced: true,
  },
  {
    id: 'o102',
    retailerId: 'r2',
    retailerName: 'Gupta General Store',
    retailerArea: 'Station Road',
    date: '2023-10-25',
    status: OrderStatus.PENDING,
    items: [
      { productId: 'ph-02', productName: 'Pour Home Room Freshener Jasmine 220ml', quantity: 5, unitPrice: 125, total: 625 },
    ],
    totalAmount: 625,
    discount: 25,
    finalAmount: 600,
    profitMargin: 20,
    paymentStatus: 'Paid',
    podStatus: 'Verified',
    createdBy: 'Vikram Singh',
    synced: false,
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', retailerId: 'r1', date: '2023-10-20', amount: 5000, type: TransactionType.DEBIT, description: 'Order #o100 Opening Balance' },
  { id: 't2', retailerId: 'r2', date: '2023-10-22', amount: 2000, type: TransactionType.DEBIT, description: 'Order #o99' },
  { id: 't3', retailerId: 'r2', date: '2023-10-23', amount: 800, type: TransactionType.CREDIT, description: 'Cash Payment', mode: PaymentMode.CASH },
];

export const APP_LABELS = {
    appName: "Vyapaar Mitra",
    dashboard: "Dashboard",
    newOrder: "Naya Bill (Order)",
    retailers: "Dukaandar List",
    inventory: "Godown Stock",
    payments: "Hisaab Kitaab",
    aiAssistant: "Vyapaar AI",
    save: "Save",
    cancel: "Radd Karein",
    submit: "Confirm Order",
    collectPayment: "Payment Le",
    viewLedger: "Khata Dekhein",
    loginSubtitle: "Distributor Management App"
};