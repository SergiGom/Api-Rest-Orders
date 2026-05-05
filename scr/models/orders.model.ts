//  Inicio modelo orders
// Interfaces para las órdenes
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  phone: string;
}

interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  city: string;
  country: string;
  phone: string;
  fax: string | null;
}

interface Product {
  id: number;
  productName: string;
  unitPrice: number;
  package: string;
  isDiscontinued: boolean;
  supplier: Supplier;
}

interface OrderItem {
  id: number;
  product: Product;
  unitPrice: number;
  quantity: number;
}

interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  customer: Customer;
  items: OrderItem[];
}

// Inicio modelo orders
import orders from "../data/Orders.json";

const getAllOrders = () => {
    return orders;
};

const getOrderById = (id: number) => {
    return orders.find(order => order.id === id);
};

export { getAllOrders, getOrderById };
