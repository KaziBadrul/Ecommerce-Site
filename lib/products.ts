export interface Product {
    name: string
    image: string
    slug: string
    price: number
}

export interface CartProduct extends Product {
    quantity: number;
}


export const products: Product[] = [
    {
        name: "Classic White T-Shirt",
        image: "/white-tshirt.jpg",
        slug: "classic-white-tshirt",
        price: 238.0,
    },
    {
        name: "Black Hoodie Sweatshirt",
        image: "/black-hoodie.jpg",
        slug: "black-hoodie-sweatshirt",
        price: 1200.0,
    },
    {
        name: "Blue Denim Jeans",
        image: "/blue-denim.jpg",
        slug: "blue-denim-jeans",
        price: 1800.00,
    },
    {
        name: "Red Plaid Shirt",
        image: "/red-plaid-shirt.jpg",
        slug: "red-plaid-shirt",
        price: 950.00,
    },
    {
        name: "Grey Jogger Pants",
        image: "/grey-joggers.jpg",
        slug: "grey-jogger-pants",
        price: 1100.00,
    },
    {
        name: "Black Leather Jacket",
        image: "/leather-jacket.jpg",
        slug: "black-leather-jacket",
        price: 4500.00,
    },
    {
        name: "White Polo Shirt",
        image: "/white-polo.jpg",
        slug: "white-polo-shirt",
        price: 800.00,
    },
    {
        name: "Casual Sneakers",
        image: "/casual-sneakers.jpg",
        slug: "casual-sneakers",
        price: 2800.00,
    },
    {
        name: "Sports Cap",
        image: "/sports-cap.jpg",
        slug: "sports-cap",
        price: 400.00,
    },
    {
        name: "Blue Hoodie Sweatshirt",
        image: "/blue-hoodie.jpg",
        slug: "blue-hoodie-sweatshirt",
        price: 1200.00,
    },
    {
        name: "Woolen Jacket",
        image: "/woolen-jacket.jpg",
        slug: "woolen-jacket",
        price: 1500.00,
    },
    {
        name: "Striped T-Shirt",
        image: "/striped-tshirt.jpg",
        slug: "striped-tshirt",
        price: 500.00,
    },
    {
        name: "Denim Jacket",
        image: "/denim-jacket.jpg",
        slug: "denim-jacket",
        price: 2500.00,
    },
    {
        name: "Black Track Pants",
        image: "/black-track-pants.jpg",
        slug: "black-track-pants",
        price: 1000.00,
    },
    {
        name: "Brown Casual Loafers",
        image: "/brown-loafers.jpg",
        slug: "brown-casual-loafers",
        price: 2000.00,
    },
]
