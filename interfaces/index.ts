import type { ComputedRef } from "vue";

export type Products = IProductCountedVO[];

export interface IProducts {
  setup: (value: any) => void,
  retrieve: (limit: number, immediate: boolean) => any,
  readonly list: ComputedRef<Products>,
  readonly total: ComputedRef<number>,
}

export interface ICard {
  readonly restore: (products: Products) => void,
  readonly add: (product: IProductVO) => void,
  readonly remove: (product: IProductVO) => void,
  readonly amount: ComputedRef<number>,
}

export interface IProductCountedVO extends IProductVO {
  amount?: number
}

export interface IProductVO {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: IDimensionsVO
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: IReviewVO[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: IMetaVO
  images: string[]
  thumbnail: string
}

export interface IDimensionsVO {
  width: number
  height: number
  depth: number
}

export interface IReviewVO {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface IMetaVO {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

