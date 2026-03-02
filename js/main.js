Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
      </ul>
    `
  })
  
  Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: `
      <div class="product">
        <div class="product-image">
          <img :src="image" :alt="altText"/>
        </div>
        
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
          <p>{{ sale }}</p>
          
          <p v-if="inStock">In stock</p>
          <p v-else :class="{ 'out-of-stock': !inStock }">Out of Stock</p>
          
          <product-details :details="details"></product-details>
  
          <div class="sizes">
            <h3>Available Sizes:</h3>
            <ul>
              <li v-for="size in sizes" :key="size">{{ size }}</li>
            </ul>
          </div>
    
          <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)"
          >
          </div>
    
          <button
            v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
          >
            Add to cart
          </button>
          
          <button
            v-on:click="removeFromCart"
            :disabled="cartEmpty"
          >
            Delete to cart
          </button>
          
          <br>
          <a :href="link">More products like this</a>
          
          <p>Shipping: {{ shipping }}</p>
        </div>
      </div>
    `,
    data() {
      return {
        product: "Socks",
        description: "A pair of warm, fuzzy socks",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        altText: "A pair of socks",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage: "./assets/vmSocks-green-onWhite.jpg",
            variantQuantity: 10
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            variantQuantity: 0
          }
        ],
        onSale: true,
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks    "
      }
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      removeFromCart() {
        this.$emit('remove-from-cart')
      },
      updateProduct(index) {
        this.selectedVariant = index
      }
    },
    computed: {
      title() {
        return this.brand + ' ' + this.product
      },
      image() {
        return this.variants[this.selectedVariant].variantImage
      },
      inStock() {
        return this.variants[this.selectedVariant].variantQuantity
      },
      sale() {
        if (this.onSale) {
          return this.brand + ' ' + this.product + ' are on sale!'
        } else {
          return this.brand + ' ' + this.product + ' are not on sale.'
        }
      },
      shipping() {
        if (this.premium) {
          return "Free"
        } else {
          return 2.99
        }
      },
      cartEmpty() {
        return this.$parent.cart.length === 0
      }
    }
  })
  
  let app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
      updateCart(id) {
        this.cart.push(id)
      },
      removeFromCart(id) {
        this.cart.pop(id)
      }
    }
  })