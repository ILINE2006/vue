let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        inStock: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green'
            },
            {
                variantId: 2235,
                variantColor: 'blue'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
            console.log("Добавили товар, сейчас в корзине: " + this.cart)
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
                console.log("Убрали товар, сейчас в корзине: " + this.cart)
            } else {
                console.log("Корзина уже пустая!")
            }
        }
    }
})