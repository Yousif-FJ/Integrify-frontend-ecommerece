import Product from "../products/Product.type";

type CartItem = {
    product: Product,
    quantity: number
}

export default CartItem;