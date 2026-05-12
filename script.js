const products = [
  { name: "Blox Fruits - Godhuman Combo", price: "79.000đ", stock: 23 },
  { name: "Pet Simulator X - Huge Pet", price: "149.000đ", stock: 9 },
  { name: "Anime Adventures - Mythic Unit", price: "99.000đ", stock: 14 },
  { name: "Adopt Me - Legendary Pet", price: "59.000đ", stock: 31 },
];

const productList = document.getElementById("product-list");

productList.innerHTML = products
  .map(
    (product) => `
      <article class="product">
        <h4>${product.name}</h4>
        <p class="price">${product.price}</p>
        <p>Còn lại: ${product.stock} vật phẩm</p>
        <button class="btn btn-primary">Mua ngay</button>
      </article>
    `
  )
  .join("");

const countdownEl = document.getElementById("countdown");
const saleEnd = Date.now() + 6 * 60 * 60 * 1000;

setInterval(() => {
  const diff = saleEnd - Date.now();
  if (diff <= 0) {
    countdownEl.textContent = "Khuyến mãi đã kết thúc";
    return;
  }

  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  countdownEl.textContent = `Kết thúc sau: ${h}:${m}:${s}`;
}, 1000);
