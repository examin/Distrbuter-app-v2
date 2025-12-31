export enum Role {
  ADMIN = 'Distributor Owner',
  SALES = 'Salesperson',
  DELIVERY = 'Delivery Staff',
  GODOWN = 'Godown Manager'
}

export enum OrderStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending Approval',
  APPROVED = 'Approved',
  DISPATCHED = 'Dispatched',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export enum TransactionType {
  CREDIT = 'CREDIT', // Payment received (Reduces balance)
  DEBIT = 'DEBIT'    // Goods sold (Increases balance)
}

export enum PaymentMode {
  CASH = 'Cash',
  UPI = 'UPI',
  CHEQUE = 'Cheque'
}

export interface Transaction {
  id: string;
  retailerId: string;
  date: string;
  amount: number;
  type: TransactionType;
  description: string;
  mode?: PaymentMode;
  referenceId?: string;
}

export interface Retailer {
  id: string;
  shopName: string;
  ownerName: string;
  phone: string;
  address: string;
  lat?: number;
  lng?: number;
  outstandingBalance: number;
  daysOverdue: number; // New: For Payments screen
  isSynced: boolean;
}

export interface Godown {
  id: string;
  name: string;
  location: string;
  managerName: string; // New
  capacityFill: number; // Percentage 0-100
}

export interface Batch {
  id: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  godownId: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number; // Selling Price (to Retailer)
  mrp: number; // Printed MRP
  landingCost: number; // Distributor's Net Cost
  gstRate: number; // GST % (0, 5, 12, 18, 28)
  offer?: string; // e.g. "Buy 10 Get 1"
  stock: number;
  minLevel: number; // For low stock alert
  category: string;
  companyId: string; // Link to supplier
  batches: Batch[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  retailerId: string;
  retailerName: string; 
  retailerArea: string; // New
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  profitMargin: number; // New: % Profit
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid'; // New
  podStatus: 'Pending' | 'Uploaded' | 'Verified'; // New
  createdBy: string;
  synced: boolean;
}

export interface Company {
  id: string;
  name: string;
  repName: string;
  repPhone: string;
  avgMargin: number; // %
  productCount: number;
  lastOrderDate: string;
}

export interface Staff {
  id: string;
  name: string;
  role: Role;
  phone: string;
  active: boolean;
  metrics: {
    label: string;
    value: string | number;
  };
}

export interface SalesStat {
  date: string;
  amount: number;
}