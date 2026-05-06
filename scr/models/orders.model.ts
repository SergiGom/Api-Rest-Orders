//  Inicio modelo orders
import ordersData from "../data/Orders.json";

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
  status?: string;
}

type OrderItemPayload = {
  productId: number;
  quantity: number;
};

const orders: Order[] = ordersData as Order[];

const getAllOrders = () => orders;

const getOrderById = (id: number) => orders.find(order => order.id === id);

const getOrderIndex = (id: number) => orders.findIndex(order => order.id === id);

const getNextOrderId = () => orders.reduce((maxId, order) => Math.max(maxId, order.id), 0) + 1;

const getNextItemId = () => {
  return orders
    .flatMap(order => order.items)
    .reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
};

const findCustomerById = (customerId: number) => {
  return orders.find(order => order.customer.id === customerId)?.customer;
};

const findProductById = (productId: number) => {
  return orders
    .flatMap(order => order.items.map(item => item.product))
    .find(product => product.id === productId);
};

const getNextOrderNumber = () => `ORD-${1000 + getNextOrderId()}`;

const recalculateTotalAmount = (order: Order): number => {
  order.totalAmount = order.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  return order.totalAmount;
};

const createOrder = (customerId: number, itemsPayload: OrderItemPayload[]): Order => {
  const customer = findCustomerById(customerId);
  if (!customer) {
    throw new Error('Customer not found');
  }

  if (!Array.isArray(itemsPayload) || itemsPayload.length === 0) {
    throw new Error('Order items are required');
  }

  let nextItemId = getNextItemId();
  const items: OrderItem[] = itemsPayload.map(itemPayload => {
    const product = findProductById(itemPayload.productId);
    if (!product) {
      throw new Error(`Product not found: ${itemPayload.productId}`);
    }
    if (itemPayload.quantity <= 0) {
      throw new Error('Item quantity must be greater than zero');
    }

    return {
      id: nextItemId++,
      product,
      unitPrice: product.unitPrice,
      quantity: itemPayload.quantity,
    };
  });

  const newOrder: Order = {
    id: getNextOrderId(),
    orderNumber: getNextOrderNumber(),
    orderDate: new Date().toISOString(),
    totalAmount: 0,
    customer,
    items,
    status: 'created',
  };

  recalculateTotalAmount(newOrder);
  orders.push(newOrder);
  return newOrder;
};

const replaceOrder = (orderId: number, newOrder: Order): Order | undefined => {
  const index = getOrderIndex(orderId);
  if (index === -1) {
    return undefined;
  }

  newOrder.id = orderId;
  recalculateTotalAmount(newOrder);
  orders[index] = newOrder;
  return orders[index];
};

const updateOrder = (
  orderId: number,
  update: { orderDate?: string; customerId?: number; status?: string }
): Order | undefined => {
  const order = getOrderById(orderId);
  if (!order) {
    return undefined;
  }

  if (update.orderDate !== undefined) {
    order.orderDate = update.orderDate;
  }

  if (update.customerId !== undefined) {
    const customer = findCustomerById(update.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    order.customer = customer;
  }

  if (update.status !== undefined) {
    order.status = update.status;
  }

  recalculateTotalAmount(order);
  return order;
};

const deleteOrder = (orderId: number) => {
  const index = getOrderIndex(orderId);
  if (index === -1) {
    return false;
  }
  orders.splice(index, 1);
  return true;
};

const getOrderItems = (orderId: number) => {
  const order = getOrderById(orderId);
  return order?.items;
};

const getOrderItem = (orderId: number, itemId: number) => {
  const order = getOrderById(orderId);
  return order?.items.find(item => item.id === itemId);
};

const addOrderItem = (orderId: number, productId: number, quantity: number): OrderItem => {
  const order = getOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  const product = findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (quantity <= 0) {
    throw new Error('Quantity must be greater than zero');
  }

  const newItem: OrderItem = {
    id: getNextItemId(),
    product,
    unitPrice: product.unitPrice,
    quantity,
  };

  order.items.push(newItem);
  recalculateTotalAmount(order);
  return newItem;
};

const updateOrderItem = (
  orderId: number,
  itemId: number,
  update: { quantity?: number; unitPrice?: number }
): OrderItem | undefined => {
  const order = getOrderById(orderId);
  if (!order) {
    return undefined;
  }

  const item = order.items.find(item => item.id === itemId);
  if (!item) {
    return undefined;
  }

  if (update.quantity !== undefined) {
    if (update.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    item.quantity = update.quantity;
  }

  if (update.unitPrice !== undefined) {
    if (update.unitPrice <= 0) {
      throw new Error('Unit price must be greater than zero');
    }
    item.unitPrice = update.unitPrice;
  }

  recalculateTotalAmount(order);
  return item;
};

const deleteOrderItem = (orderId: number, itemId: number) => {
  const order = getOrderById(orderId);
  if (!order) {
    return false;
  }

  const index = order.items.findIndex(item => item.id === itemId);
  if (index === -1) {
    return false;
  }

  order.items.splice(index, 1);
  recalculateTotalAmount(order);
  return true;
};

export {
  getAllOrders,
  getOrderById,
  createOrder,
  replaceOrder,
  updateOrder,
  deleteOrder,
  getOrderItems,
  getOrderItem,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
