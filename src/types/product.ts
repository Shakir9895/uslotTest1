import { IAddressItem } from './address';

// ----------------------------------------------------------------------

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IProductItem = {
  sanskrit_sahitya?:string;
  malayalam?:string;
  school?:string;
  anthropology?:string;
  gandhian_studies?:string;
  computer_science?:string;
  business_studies?:string;
  stream?:string;
  economics?:string;
  accountancy?: string;
  maths?: string;
  information_technology?: string;
  biology?: string;
  chemistry?: string;
  physics?: string;
  social_science?: string;
  hindi?: string;
  english?: string;
  paper_2?: string;
  paper_1?: string;
  class?: string;
  mobile_no?: string;
  dob?: string;
  reg_no?: string;

  correct_answer?: string;

  options?: any;
  question?: string;

  syllabus?: string;
  duration?: string;

  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  publish: string;
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  createdAt: Date;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
};

// ----------------------------------------------------------------------

export type ICheckoutCartItem = {
  id: string;
  name: string;
  coverUrl: string;
  available: number;
  price: number;
  colors: string[];
  size: string;
  quantity: number;
  subTotal: number;
};

export type ICheckoutDeliveryOption = {
  value: number;
  label: string;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  label: string;
  description: string;
};

export type ICheckoutCardOption = {
  value: string;
  label: string;
};

export type ICheckout = {
  total: number;
  subTotal: number;
  discount: number;
  shipping: number;
  activeStep: number;
  totalItems: number;
  cart: ICheckoutCartItem[];
  billing: IAddressItem | null;
  auth: {} | any;
};


export type Uslotapp = {
  AllPlusTwoList: any;
  AllSslcList: any,
  AllBatchesList: any;
  SingleQuiz: any,
  CategoryList: any,
  SingleCategory: any,
  CourseList: any,
  SingleCourse: any,
  ModuleList: any,
  SingleModuleList: any,
  QuizList: any
}
