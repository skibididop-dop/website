const accounts = [
  {
    id: 1,
    username: "RobloxGamer001",
    level: 45,
    robux: 5000,
    items: "50+ Items Rare",
    price: 250000,
    image: "🎮",
    category: "cheap",
    description: "Tài khoản level 45, có 5000 Robux, sở hữu nhiều items hiếm từ các game nổi tiếng."
  },
  {
    id: 2,
    username: "ProPlayer_VN",
    level: 67,
    robux: 12000,
    items: "100+ Items Legendary",
    price: 450000,
    image: "⭐",
    category: "mid",
    description: "Tài khoản pro, level 67, có 12000 Robux và nhiều vật phẩm huyền thoại."
  },
  {
    id: 3,
    username: "BloxKing_VIP",
    level: 89,
    robux: 25000,
    items: "200+ Items Ultra Rare",
    price: 950000,
    image: "👑",
    category: "premium",
    description: "Tài khoản VIP cao cấp, level 89, 25000 Robux, bộ sưu tập item cực hiếm."
  },
  {
    id: 4,
    username: "Newbie_Lucky",
    level: 18,
    robux: 2000,
    items: "10+ Items",
    price: 150000,
    image: "🌟",
    category: "cheap",
    description: "Tài khoản mới, được cấp sẵn 2000 Robux, hoàn hảo cho tân thủ."
  },
  {
    id: 5,
    username: "GameMaster_Pro",
    level: 78,
    robux: 15000,
    items: "120+ Items Premium",
    price: 650000,
    image: "🏆",
    category: "mid",
    description: "Tài khoản chuyên nghiệp, level 78, 15000 Robux, nhiều items quý giá."
  },
  {
    id: 6,
    username: "RobloxMillionaire",
    level: 125,
    robux: 50000,
    items: "500+ Items Exclusive",
    price: 1500000,
    image: "💎",
    category: "premium",
    description: "Tài khoản triệu phú, level 125, 50000 Robux, bộ sưu tập hoàn hảo."
  },
];

let cart = [];
let selectedFilter = "all";

function filterAccounts(category) {
  if (category === "all") {
    return accounts;
  }
  return accounts.filter(a => a.category === category);
}

function renderAccounts() {
  const list = document.getElementById("accounts-list");
  const filtered = filterAccounts(selectedFilter);
  
  list.innerHTML = filtered.map(acc => `
    <article class="account-card" onclick="showDetail(${acc.id})">
      <div class="account-icon">${acc.image}</div>
      <h4>${acc.username}</h4>
      <div class="account-info">
        <p>📊 Level: <strong>${acc.level}</strong></p>
        <p>💰 Robux: <strong>${acc.robux.toLocaleString()}</strong></p>
        <p>🎁 Items: <strong>${acc.items}</strong></p>
      </div>
      <p class="price">💵 ${acc.price.toLocaleString()}đ</p>
      <button class="btn btn-primary" onclick="addToCart(event, ${acc.id})">Thêm Vào Giỏ</button>
    </article>
  `).join("");
}

function addToCart(event, id) {
  event.stopPropagation();
  const account = accounts.find(a => a.id === id);
  cart.push(account);
  updateCart();
  showNotification(`Đã thêm ${account.username} vào giỏ hàng!`);
}

function removeFromCart(id) {
  cart = cart.filter((_, i) => i !== id);
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  
  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart">Giỏ hàng trống</p>';
    document.getElementById("checkout-btn").disabled = true;
    return;
  }
  
  document.getElementById("checkout-btn").disabled = false;
  const total = cart.reduce((sum, acc) => sum + acc.price, 0);
  document.getElementById("total-price").textContent = total.toLocaleString() + "đ";
  
  container.innerHTML = cart.map((acc, i) => `
    <div class="cart-item">
      <div class="item-info">
        <p><strong>${acc.username}</strong></p>
        <p>Level ${acc.level} - ${acc.robux} Robux</p>
      </div>
      <p class="item-price">${acc.price.toLocaleString()}đ</p>
      <button class="remove-btn" onclick="removeFromCart(${i})">Xóa</button>
    </div>
  `).join("");
}

function showDetail(id) {
  const account = accounts.find(a => a.id === id);
  const detailDiv = document.getElementById("account-detail");
  
  detailDiv.innerHTML = `
    <div class="detail-header">
      <h2>${account.image} ${account.username}</h2>
    </div>
    <div class="detail-info">
      <p><strong>📊 Level:</strong> ${account.level}</p>
      <p><strong>💰 Robux:</strong> ${account.robux.toLocaleString()}</p>
      <p><strong>🎁 Items:</strong> ${account.items}</p>
      <p><strong>📝 Mô Tả:</strong> ${account.description}</p>
      <p class="detail-price"><strong>💵 Giá:</strong> ${account.price.toLocaleString()}đ</p>
    </div>
    <button class="btn btn-primary" onclick="addToCart(event, ${account.id}); closeDetail()">Thêm Vào Giỏ</button>
  `;
  
  document.getElementById("detail-modal").style.display = "flex";
}

function closeDetail() {
  document.getElementById("detail-modal").style.display = "none";
}

function checkout() {
  if (cart.length === 0) return;
  
  const total = cart.reduce((sum, acc) => sum + acc.price, 0);
  const accounts_text = cart.map(a => a.username).join(", ");
  
  alert(
    `🎉 Thanh Toán\n\n` +
    `Tài khoản: ${accounts_text}\n` +
    `Tổng tiền: ${total.toLocaleString()}đ\n\n` +
    `Vui lòng chuyển khoản hoặc scan QR code.\n` +
    `Bạn sẽ nhận email trong 5 phút.`
  );
  
  cart = [];
  updateCart();
  document.getElementById("cart-modal").style.display = "none";
}

function showNotification(message) {
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  document.body.appendChild(notif);
  
  setTimeout(() => notif.remove(), 2000);
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedFilter = btn.dataset.filter;
    renderAccounts();
  });
});

// Cart modal
document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "flex";
});

document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".modal").style.display = "none";
  });
});

document.getElementById("checkout-btn").addEventListener("click", checkout);

window.addEventListener("click", (e) => {
  if (e.target.id === "cart-modal") {
    document.getElementById("cart-modal").style.display = "none";
  }
  if (e.target.id === "detail-modal") {
    closeDetail();
  }
});

// Countdown
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

// Initial render
renderAccounts();
renderCartItems();
