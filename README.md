# [Threadly Mart](https://threadlymart.vercel.app/) 🛍️
## [Visit the Website](https://threadlymart.vercel.app/)

A modern, responsive, and fast **e-commerce website** for apparel built with **Next.js 13**, **TypeScript**, **Tailwind CSS**, and **Supabase**. This project is designed to provide a seamless shopping experience with product browsing, search, and admin management.

---

## 🚀 Features

- **Modern UI**: Clean and responsive design with Tailwind CSS.
- **Product Catalog**: Browse and view product details.
- **Search Functionality**: Dynamic product search with live suggestions.
- **Shopping Cart**: Add and remove products, view cart total.
- **User Authentication**: Sign up, login, logout functionality.
- **Admin Dashboard**:
  - View total products, sales, and users.
  - Manage orders and inventory.
- **Server-side Integration**: Supabase used as the backend database.
- **Optimized Images**: Using `next/image` for better performance.
- **Mobile-first Design**: Fully responsive across devices.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion for animations, ShadCN
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel 

---

## 📂 Project Structure

- app/ # Next.js App Router pages
- components/ # Reusable React components (Navbar, ProductCard, OrdersTable)
- public/ # Static assets (logo, favicon, images)
- styles/ # Global styles (Tailwind config)
- lib/ # Utility functions and Supabase client
- api/ # Serverless API routes

  ---

## ⚡ Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a .env.local file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```
4. **Run the development server**

```bash
npm run dev
```


Open http://localhost:3000
 to view your website.

## 🖼️ Screenshots
<img width="1906" height="959" alt="image" src="https://github.com/user-attachments/assets/068e3cbc-3de1-4198-a472-45738b979362" />
<img width="1893" height="742" alt="image" src="https://github.com/user-attachments/assets/8109c03c-3d68-4744-b62d-3327e1a1ffde" />
<img width="1900" height="956" alt="image" src="https://github.com/user-attachments/assets/86a91051-8c90-40ef-9a2a-33955b5a47d8" />
<h3>Mobile Friendly</h3>
<img width="390" height="843" alt="image" src="https://github.com/user-attachments/assets/d8fd9837-7d09-48b4-b89e-45422673539d" />
<h3>Search Function</h3>
<img width="402" height="354" alt="image" src="https://github.com/user-attachments/assets/9e089311-d8fb-4662-abb8-8eb9ba63274b" />
<h3>Admin Panel</h3>
<img width="485" height="77" alt="image" src="https://github.com/user-attachments/assets/e1850102-ddad-4866-bc80-c10cc9e7a631" />



