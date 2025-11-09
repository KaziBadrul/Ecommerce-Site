import AdminAddProduct from "./AdminAddProduct";
import AdminData from "./AdminData";
import AdminViewProduct from "./AdminViewProduct";

interface AdminDashboardProps {
  selected: string;
}

export default function AdminDashboard({ selected }: AdminDashboardProps) {
  switch (selected) {
    case "dashboard":
      return <AdminData />;
    case "viewProduct":
      return <AdminViewProduct />;
    case "addProduct":
      return <AdminAddProduct />;
    case "settings":
      return <p>⚙️ Settings Page</p>;
    default:
      return <p>Welcome!</p>;
  }
}
