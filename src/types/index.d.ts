export interface IProduct {
    id: number,
    product_name: string,
    price: number,
    stock: number,
    discounted_price?: number | null,
    description?: string | null,
    category?: ICategory | null,
    images?: IProductImage[] | null,
}

export interface IReview {
    id: number,
    rating: number,
    comment: string,
    user: IUser,
}

export interface ICartItem {
    id: number,
    product_id: number,
    product: IProduct,
    quantity: number,
    cart_id: number,
}

export interface IOrder {
    id: number,
    user_id: number,
    user: IUser,
    created_at: Date,
    address: string,
    total_price: number,
    status: 'pending' | 'processing' | 'delivered' | 'cancelled',
    orderDetails: IOrderDetail[],
}

export interface IOrderDetail {
    id: number,
    order_id: number,
    product_id: number,
    product: IProduct,
    quantity: number,
    price: number, // price of product at the time of order
}


export interface ICategory {
    id: number,
    category_name: string,
}

export interface IProductImage {
    id: number,
    image_url: string,
    is_main: boolean,
}

