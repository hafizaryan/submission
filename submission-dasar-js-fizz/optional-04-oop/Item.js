/**
 * TODO
 * Selesaikan kode pembuatan class Item dengan ketentuan:
 * - Memiliki properti `id` (number), `name` (string), `quantity` (number), dan `price` (number).
 * - Memiliki method `updateDetails()` untuk mengubah nilai `name`, `quantity`, dan `price`.
 * - Memiliki method `displayDetails()` yang mengembalikan informasi detail dari Item dengan format:
 *   ```
 *     ID: ${id}, Name: ${name}, Quantity: ${quantity}, Price: ${price}
 *   ```
 */

function Item(id, name, quantity, price) {
  this.id = id;
  this.name = name;
  this.quantity = quantity;
  this.price = price;
}

Item.prototype.updateDetails = function (name, quantity, price) {
  this.name = name;
  this.quantity = quantity;
  this.price = price;
};

Item.prototype.displayDetails = function () {
  return `ID: ${this.id}, Name: ${this.name}, Quantity: ${this.quantity}, Price: ${this.price}`;
};

// Jangan hapus kode di bawah ini!
export default Item;
