import { Product, Retailer, Order, OrderStatus, Transaction, TransactionType, PaymentMode, Godown, Company, Staff, Role } from './types';

export const MOCK_GODOWNS: Godown[] = [
  { id: 'g1', name: 'Main City Godown', location: 'Industrial Area', managerName: 'Ramesh Bhai', capacityFill: 85 },
  { id: 'g2', name: 'Highway Hub', location: 'Market Road', managerName: 'Suresh Kumar', capacityFill: 42 }
];

export const MOCK_COMPANIES: Company[] = [
  { id: 'c1', name: 'Hindustan Unilever', repName: 'Rahul Verma', repPhone: '9876500001', avgMargin: 12, productCount: 45, lastOrderDate: '2023-10-20' },
  { id: 'c2', name: 'ITC Limited', repName: 'Amit Singh', repPhone: '9876500002', avgMargin: 15, productCount: 30, lastOrderDate: '2023-10-22' },
  { id: 'c3', name: 'Parle Products', repName: 'Vikas Gupta', repPhone: '9876500003', avgMargin: 10, productCount: 12, lastOrderDate: '2023-10-18' },
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'p1', name: 'Parle-G Gold 100g', sku: 'PG100', 
    price: 10, mrp: 12, landingCost: 8.50, gstRate: 18, offer: "Buy 1 carton Get 2pkts Free",
    stock: 500, minLevel: 100, category: 'Biscuits', companyId: 'c3',
    batches: [
      { id: 'b1', batchNumber: 'BATCH-001', expiryDate: '2024-12-31', quantity: 300, godownId: 'g1' },
      { id: 'b2', batchNumber: 'BATCH-002', expiryDate: '2025-06-30', quantity: 200, godownId: 'g2' }
    ]
  },
  { 
    id: 'p2', name: 'Tata Salt 1kg', sku: 'TS1KG', 
    price: 25, mrp: 28, landingCost: 21.00, gstRate: 0,
    stock: 30, minLevel: 50, category: 'Grocery', companyId: 'c2', // Low Stock
    batches: [
      { id: 'b3', batchNumber: 'TS-JAN', expiryDate: '2025-01-15', quantity: 30, godownId: 'g1' }
    ]
  },
  { 
    id: 'p3', name: 'Maggi Masala 70g', sku: 'MM70', 
    price: 12, mrp: 14, landingCost: 9.80, gstRate: 12, offer: "Flat 2% Off on Bulk",
    stock: 1000, minLevel: 200, category: 'Snacks', companyId: 'c2',
    batches: [
      { id: 'b4', batchNumber: 'MM-OCT', expiryDate: '2023-10-30', quantity: 500, godownId: 'g1' },
      { id: 'b5', batchNumber: 'MM-NOV', expiryDate: '2024-11-30', quantity: 500, godownId: 'g1' }
    ]
  },
  { 
    id: 'p4', name: 'Red Label Tea 250g', sku: 'RL250', 
    price: 120, mrp: 145, landingCost: 98.50, gstRate: 5,
    stock: 150, minLevel: 50, category: 'Beverages', companyId: 'c1',
    batches: [
      { id: 'b6', batchNumber: 'RL-2023', expiryDate: '2024-08-15', quantity: 100, godownId: 'g2' },
      { id: 'b7', batchNumber: 'RL-2024', expiryDate: '2025-08-15', quantity: 50, godownId: 'g1' }
    ]
  },
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
      { productId: 'p1', productName: 'Parle-G Gold 100g', quantity: 50, unitPrice: 10, total: 500 },
      { productId: 'p3', productName: 'Maggi Masala 70g', quantity: 20, unitPrice: 12, total: 240 },
    ],
    totalAmount: 740,
    discount: 0,
    finalAmount: 740,
    profitMargin: 18,
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
      { productId: 'p2', productName: 'Tata Salt 1kg', quantity: 10, unitPrice: 25, total: 250 },
    ],
    totalAmount: 250,
    discount: 10,
    finalAmount: 240,
    profitMargin: 12,
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