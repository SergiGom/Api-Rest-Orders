// Modelo de productos
import ordersData from "../data/Orders.json";

const products: any[] = [];

// Extraer productos únicos de las órdenes
ordersData.forEach(order => {
  order.items.forEach(item => {
    const existingProduct = products.find(p => p.id === item.product.id);
    if (!existingProduct) {
      products.push(item.product);
    }
  });
});

const getAllProducts = () => products;

const getProductById = (id: number) => products.find(product => product.id === id);

export { getAllProducts, getProductById };