# 🎞 SnapCart - Quick Commerce Grocery Delivery

SnapCart is a fully-featured quick-commerce grocery delivery platform inspired by Zepto, built using **ReactJS**, **Appwrite**, and deployed using **Vercel**. It features user authentication, cart & checkout system, admin dashboard, role-based access, dark/light mode toggle, responsive design, and more.

---

## 🧰 Tech Stack

- **Frontend:** ReactJS, TailwindCSS, ShadCN UI
- **Backend:** Appwrite (Auth, DB, Storage)
- **Deployment:** Vercel (connected to GitHub)

---

## 🌟 Features

### 🛜️ User Features

- Signup/Login (Appwrite Auth)
- Browse products with image previews
- Add to cart & Checkout
- Track Order History
- User Profile Page
- Mobile Responsive
- Dark/Light Mode Toggle

### 🧑‍💼 Admin Features

- Admin Login via role label
- Add/Edit/Delete Products
- View all Orders
- Protected Admin Routes
- Improved Dashboard UI

### 💡 UI & Experience

- Modern card-based product UI
- Dark/Light toggle via Tailwind
- Loading indicators
- Clean layout with mobile support

---

## 🛠️ Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/snapcart.git
cd snapcart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Rename `.env.example` to `.env.local` and add your credentials:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-products-collection-id
VITE_APPWRITE_ORDERS_COLLECTION_ID=your-orders-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

---

## 🚀 Deployment (Vercel + GitHub)

### 📦 Deploy to Vercel

1. Push your project to GitHub.
2. Go to [vercel.com](https://vercel.com/) > New Project.
3. Select your GitHub repo.
4. Set these Environment Variables in the Vercel dashboard.
5. Click **Deploy**.

Every time you push to `main`, Vercel will auto-deploy! ✅

---

## 📂 Admin Setup

To make a user an admin in Appwrite:

1. Go to Appwrite Console → Users → Click User → Add `admin` to `labels`.
2. Admin-only components check for `user.labels.includes('admin')`.

---

## 🎥 Walkthrough Script (React Component)

```jsx
import React from 'react';

const WalkthroughScript = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">🎬 SnapCart Walkthrough Script</h2>

    <div>
      <p><strong>0:00 – Introduction:</strong> Welcome to SnapCart — a lightning-fast grocery delivery web app inspired by Zepto, built using React and Appwrite.</p>
      <p><strong>0:15 – Tech Stack:</strong> Frontend: React + Tailwind + ShadCN UI. Backend: Appwrite for auth, database, and file storage. Deployment: Vercel.</p>
      <p><strong>0:30 – User Features:</strong> Signup/Login, product browsing, cart management, checkout system, and order tracking. Fully responsive with dark/light mode.</p>
      <p><strong>1:10 – Admin Features:</strong> Admin login with protected routes. Admins can add/edit/delete products, view all orders, and access a dashboard.</p>
      <p><strong>1:45 – UI & Dark Mode:</strong> Tailwind-based layout with smooth transitions and dark/light toggle. Includes loading indicators.</p>
      <p><strong>2:15 – Deployment:</strong> Deployed via Vercel, GitHub-integrated for auto-deployments. Environment variables securely configured.</p>
      <p><strong>2:40 – Conclusion:</strong> Thanks for watching! Fork the repo, deploy your version, or contribute. SnapCart — groceries at your fingertips.</p>
    </div>
  </div>
);

export default WalkthroughScript;
```

---

## 📁 Folder Structure (React Version)

```
snapcart/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   └── Admin.jsx
│   ├── services/
│   │   └── appwriteConfig.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── package.json
└── README.md
```

---

## 🤝 Contributing

Feel free to fork this repo, make improvements, and open a PR. All suggestions are welcome!

---

## 📄 License

MIT License. Use freely.

---

> Built with ❤️ by Yash Vikrambhai Pobari\
> SnapCart - Fast Grocery Delivery at Your Fingertips

