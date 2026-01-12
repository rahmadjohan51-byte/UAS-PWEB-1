
// johnlux shared script for additional pages
function setLoggedIn(email){
  localStorage.setItem('johnlux_user', email);
  localStorage.setItem('johnlux_logged', '1');
}
function isLoggedIn(){
  return localStorage.getItem('johnlux_logged') === '1';
}
function logout(){
  localStorage.removeItem('johnlux_logged');
  localStorage.removeItem('johnlux_user');
  alert('Anda telah logout.');
  window.location.href = '/mnt/data/johnlux_site/index.html';
}

// attach events for buy buttons: require login
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.buy-now').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const productKey = this.dataset.product;
      if(!isLoggedIn()){
        // redirect to login page (login.html)
        if(confirm('Anda harus login sebelum melakukan pemesanan. Pergi ke halaman login?')){
          window.location.href = 'login.html';
        }
        return;
      }
      // if logged in, go to product-detail page with query param
      window.location.href = 'produk-detail.html?product=' + encodeURIComponent(productKey);
    });
  });

  // register form (if present)
  const regForm = document.getElementById('regForm');
  if(regForm){
    regForm.addEventListener('submit', function(e){
      e.preventDefault();
      const email = regForm.querySelector('input[name="email"]').value;
      const name = regForm.querySelector('input[name="name"]').value;
      setLoggedIn(email);
      alert('Pendaftaran berhasil. Anda otomatis login sebagai ' + email);
      window.location.href = 'index.html';
    });
  }

  // login form (if present)
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      const email = loginForm.querySelector('input[name="email"]').value;
      setLoggedIn(email);
      alert('Login berhasil. Selamat datang, ' + email);
      window.location.href = 'index.html';
    });
  }

  // product-detail page rendering
  if(window.location.pathname.endsWith('produk-detail.html')){
    const params = new URLSearchParams(window.location.search);
    const p = params.get('product') || 'royale';
    // product data mirror (minimal)
    const products = {
      royale:{name:'Johnlux Royale',price:'Rp 15.000.000',img:'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&h=600&fit=crop',desc:'Desain modern minimalis dengan tali stainless steel silver.'},
      elegance:{name:'Johnlux Elegance',price:'Rp 18.000.000',img:'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=600&fit=crop',desc:'Jam tangan mewah dengan desain klasik dan tali kulit premium.'},
      prestige:{name:'Johnlux Prestige',price:'Rp 25.000.000',img:'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop',desc:'Koleksi eksklusif limited edition.'}
    };
    const prod = products[p] || products.royale;
    const wrapper = document.getElementById('productDetailWrapper');
    if(wrapper){
      wrapper.innerHTML = `
        <div class="card">
          <h2>${prod.name}</h2>
          <img src="${prod.img}" alt="${prod.name}">
          <p class="small">${prod.desc}</p>
          <p class="notice"><strong>Harga:</strong> ${prod.price}</p>
          <button class="btn btn-primary" onclick="startOrder('${encodeURIComponent(prod.name)}')">Mulai Pesan</button>
        </div>
      `;
    }
  }
});

function startOrder(productName){
  if(!isLoggedIn()){
    if(confirm('Anda harus login. Ke halaman login sekarang?')) window.location.href='login.html';
    return;
  }
  // simple simulated order flow
  alert('Memproses pesanan untuk ' + decodeURIComponent(productName) + '. Terima kasih!');
  window.location.href='index.html';
}
