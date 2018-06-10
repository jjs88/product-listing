  const productsContainer =  document.querySelector('.products-container');
  const cart = document.querySelector('.cart');
  const products = [
    {name: 'Hulk Action Figure', img: 'img/hulk.jpeg', price: 14.99},
    {name: 'Beetle Action Figure', img: 'img/beetle.jpeg', price: 10.99},
    {name: 'Captain Universe Action Figure', img: 'img/captain_universe.jpeg', price: 13.99},
    {name: 'Iron Man Action Figure', img: 'img/iron_man.jpeg', price: 12.99},
    {name: 'Iron Man Hulk-Buster Action Figure', img: 'img/ironman_hulkbuster.jpeg', price: 14.99},
    {name: 'Spiderman Legend Action Figure', img: 'img/spiderman_legend6in.jpeg', price: 14.99}
    // {name: 'Thor Action Figure 7in', img: 'img/thor_7in.jpeg'},
    // {name: 'Thor Action Figure', img: 'img/thor.jpeg'},
    // {name: 'Moon Knight Action Figure', img: 'img/moon_knight.jpeg'},
    // {name: 'Tombstone Action Figure', img: 'img/tombstone.jpeg'},
    // {name: 'Loki Action Figure', img: 'img/loki.jpeg'},
    // {name: 'Thor Electronic Action Figure', img: 'img/thor_electronic.jpeg'},
  ];

  loadProducts();
  
  const cartModel = {
    products: [],
    getQty: function(name) {
      const [product] = this.products.filter(product => product.name === name);
      return product.qty;
    },
    getCartQty: function() {
      return this.products.length ? this.products.length: null;
    },
    removeItem: function(name) {
      const [product] = this.getItem(name);
      product.domRef.querySelector('.product__action').style.opacity = 1; 
      this.products = this.products.filter(product => product.name !== name);
      cart.querySelector('.cart-qty').innerHTML = this.getCartQty();
      this.totalPrice();
      toggleCart();
    },
    totalPrice: function() {
      let total = 0;
      this.products.forEach(product => total += product.qty * product.price);
      cart.querySelector('.cart-total').innerHTML = total === 0 ? null: parseFloat(total).toFixed(2);
    },
    addItem(product) {
      this.products.push(product);
      cart.querySelector('.cart-qty').innerHTML = cartModel.getCartQty();
      this.totalPrice();
      toggleCart();
    },
    getItem(name) {
      return this.products.filter(product => product.name === name);
    }
  };

  function toggleCart() {
    if(!cart.classList.contains('open')) {
      cart.classList.add('open');
    } 
    if(!cartModel.getCartQty()) {
      cart.classList.remove('open');
    }
  }

  function productTemplate(product) {
    const temp = `
    <div class="product">
      <img src=${product.img} alt="#">
      <p class="product__title">${product.name}</p>
      <div class="product__action">
          <button class="button__add" data-name="${product.name}">Add</button>
          <button class="button__addQty">+</button>
          <span class="product_qty">1</span>
      </div>
      <p>${product.price}</p>
    </div>`;
    productsContainer.innerHTML += temp;
  };

  function cartItemTemp(product) {
    const temp = `
      <div class="cart-item" data-item="${product.name}">
      <div class="cont">
          <div class="cart-item-cont">
          <div>Name</div>
          <div>${product.name}</div>
          </div>
          <div class="cart-item-cont">
            <div>Qty</div>
            <div>${product.qty}</div>
          </div>
          <div class="cart-item-cont">
            <div>Price</div>
            <div>${product.price}</div>
          </div>
          <div>
            <button class="remove-product">remove</button>
          </div>
        </div>
      </div>`;
    cart.innerHTML += temp;
  };

  function loadProducts() {
    products.forEach(product => productTemplate(product));
  };

  function incrementQuantity(ele) {
    let qty = parseInt(ele.querySelector('.product_qty').innerHTML);
    qty += 1;
    ele.querySelector('.product_qty').innerHTML = qty;
  };

  function addToCart(name, qty, domRef) {
    const [cartProduct] = cartModel.products.filter(product => product.name === name);
    if(!cartProduct) {
      let [product] = products.filter(product => product.name === name);
      product.qty = qty;
      product.domRef = domRef;
      product.domRef.querySelector('.product__action').style.opacity = 0; 
      cartModel.addItem(product);
      cartItemTemp(product);
      return;
    }
  };

  function removeProduct(product) {
    cart.removeChild(product);
    const name = product.dataset.item;
    cartModel.removeItem(name);
  };

  productsContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('button__addQty')) {
      incrementQuantity(e.target.parentNode);
      return;
    }
    if(e.target.classList.contains('button__add')) {
      const qty = parseInt(e.target.parentNode.querySelector('.product_qty').innerHTML);
      addToCart(e.target.dataset.name, qty, e.target.parentNode.parentNode);
      //reset quantity
      e.target.parentNode.querySelector('.product_qty').innerHTML = 1;
      return;
    }
  });

  cart.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-product')) {
      const product = e.target.parentNode.parentNode.parentNode;
      removeProduct(product);
    }
  });










