interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export function addToCart(product: Product) {
  const cartData = localStorage.getItem("cartItem");

  const cart: CartProduct[] = cartData ? JSON.parse(cartData) : [];

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cartItem", JSON.stringify(cart));


}
