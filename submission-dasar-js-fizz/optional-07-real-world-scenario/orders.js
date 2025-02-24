// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
const generateUniqueId = () => `_${Math.random().toString(36).slice(2, 9)}`;

// Variabel yang menampung data orders
let orders = [];

// Fungsi untuk menambahkan order
const addOrder = (customerName, items) => {
  const order = {
    id: generateUniqueId(),
    customerName,
    items,
    totalPrice: items.reduce((acc, item) => acc + item.price, 0),
    status: "Menunggu",
  };

  orders.push(order);
};

// Fungsi untuk memperbarui status order
const updateOrderStatus = (orderId, status) => {
  const order = orders.find((order) => order.id === orderId);
  if (order) {
    order.status = status;
  }
};

// Fungsi untuk menghitung total pendapatan dari order yang berstatus Selesai
const calculateTotalRevenue = () =>
  orders
    .filter((order) => order.status === "Selesai")
    .reduce((acc, order) => acc + order.totalPrice, 0);

// Fungsi untuk menghapus order
const deleteOrder = (id) => {
  orders = orders.filter((order) => order.id !== id);
};

export {
  orders,
  addOrder,
  updateOrderStatus,
  calculateTotalRevenue,
  deleteOrder,
};
