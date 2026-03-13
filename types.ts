
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export enum CouponType {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE'
}

export type PaymentMethod = 'BANK_TRANSFER' | 'REVOLUT' | 'VIVAWALLET' | 'BOC' | 'REVOLUT_BANK' | 'STRIPE';

export interface ProductExtra {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  categoryId: string;
  status: ProductStatus;
  imageUrl: string;
  createdAt: number;
  deliveryTime?: string;
  requirements?: string;
  version?: string;
  extras: ProductExtra[];
  isFeatured?: boolean;
  order?: number;
  // SEO Fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface CartItem {
  cartId: string; 
  product: Product;
  selectedExtras: ProductExtra[];
  quantity: number;
}

export interface UserCart {
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  lastUpdated: number;
  reminderSent: boolean;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: string; 
  productIds: string[];
  imageUrl: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  imageUrl?: string;
  order?: number;
  // SEO Fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  active: boolean;
  expiryDate?: number;
  userId?: string; 
  isAutomated?: boolean;
}

export type SaleStatus = 'COMPLETE' | 'IN_PROGRESS' | 'PENDING' | 'FAILED';

export interface Sale {
  id: string;
  userId: string;
  userEmail: string;
  buyerName: string;
  productId: string;
  productName: string;
  amount: number; 
  discountAmount?: number;
  finalAmount: number;
  timestamp: number;
  invoiceId: string;
  status: SaleStatus;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  selectedExtras?: ProductExtra[];
  isManual?: boolean;
}

export interface Invoice {
  id: string;
  saleId: string;
  date: number;
  customerName: string;
  customerEmail: string;
  itemName: string;
  amount: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  selectedExtras: ProductExtra[];
}

export interface Inquiry {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productName: string;
  message: string;
  timestamp: number;
  status: 'NEW' | 'REPLIED' | 'ARCHIVED';
}

export interface AppNotification {
  id: string;
  type: 'BIRTHDAY_REWARD' | 'SYSTEM' | 'SALE' | 'CART_REMINDER';
  message: string;
  timestamp: number;
  userId?: string;
  userEmail?: string;
}

export interface PlatformSettings {
  name: string;
  supportEmail: string;
  bankDetails?: string;
  bocDetails?: string;
  revolutTag?: string;
  revolutBankDetails?: string;
  vivaWalletMerchantId?: string;
  webhookUrl?: string;
  stripePublishableKey?: string;
  stripeSecretKey?: string;
  stripeBackendUrl?: string;
  brevoApiKey?: string;
  brevoSenderEmail?: string;
  welcomeEmailContent?: string;
  birthdayEmailContent?: string;
  orderEmailContent?: string;
  abandonedCartEmailContent?: string;
  featuredLimit?: number;
  apiKeys?: ApiKey[];
  lastGlobalBirthdayCheck?: string; 
  lastAbandonedCartCheck?: string; 
}

export interface ApiKey {
  id: string;
  key: string;
  label: string;
  createdAt: number;
  lastUsed?: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt?: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  lastBirthdayCouponYear?: number;
}
