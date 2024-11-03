export type Product = {
  availabilityStatus: string,
  category: string,
  description: string,
  dimensions: {
    width: number,
    height: number,
    depth: number
  },
  discountPercentage: number,
  id: number,
  images: string[],
  meta: Meta,
  minimumOrderQuantity: number,
  price: number,
  rating: number,
  returnPolicy: string,
  reviews: Review[],
  shippingInformation: string,
  sku: string,
  stock: number,
  tags: string[],
  thumbnail: string,
  title: string,
  warrantyInformation: string,
  weight: number,
  pcs?: number,
}

type Review = {
  comment: string,
  date: string,
  rating: string,
  reviewerEmail: string,
  reviewerName: string,
}

type Meta = {
  createdAt: string,
  updatedAt: string,
  barcode: string,
  qrCode: string,
}

export type Category = {
  name: string,
  slug: string,
  url: string,
}

export type User = {
  accessToken: string,
  email: string,
  firstName: string,
  gender: string,
  id: number,
  image: string,
  lastName: string,
  refreshToken: string,
  username: string,
}

export type Option = {
  value: string,
  title: string,
}