import {Product, CartProduct} from "@/lib/products";

export function addToCart(product: Product) {

    const cartData = localStorage.getItem("cartItem");

    const cart: CartProduct[] = cartData ? JSON.parse(cartData) : [];

    const existingItem = cart.find((item) => item.slug === product.slug);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += existingItem.price;
    } else {

        cart.push({...product, quantity:1});
    }


    localStorage.setItem("cartItem", JSON.stringify(cart));



    console.log(cart);

}