document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function () {
        return {
            init() {
                //call API to load automatically get all Pizza's
                //set his.pizzas
                axios
                    .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
                    .then((result) => {
                        //console.log(result.data)
                        this.pizzas = result.data.pizzas
                    })
                    .then(() => {
                        return this.createCart();

                    })
                    .then((result) => {
                        this.cartId = result.data.cart_code;

                    });


            },
            createCart() {
                ///api/pizza-cart/create
                return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username' + this.username)
            },

            showCart() {
                const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;
                axios
                    .get(url)
                    .then((result) => {
                        this.cart = result.data;
                    });
            },
            pizzaImage(pizza) {
                return `/img/${pizza.size}.png`
            },

            message: 'Eating Pizza',
            username: 'TanakaCalebTakarinda',
            cartId: '',
            pizzas: [],
            cart: { total: 0 },
            sshowCart: false,
            paymentAmount: 0,
            payNow:true,
            paymentMessage:'',

            add(pizza) {
                //need a cart Id so that i can add pizza to cart
                const params = {
                    cart_code: this.cartId,
                    pizza_id: pizza.id
                }
                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
                    .then(() => {
                        this.message = "Pizza added to the cart"
                        this.showCart();
                    })
            },
            remove(pizza){
                const params = {
                    cart_code: this.cartId,
                    pizza_id: pizza.id
                }
                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
                    .then(() => {
                        this.message = "Pizza removed to the cart"
                        this.showCart();
                    })
            },
            checkOutPizza(){
                const checkOutUrl = 'https://pizza-cart-api.herokuapp.com/api/pizza-cart/pay'
                const params = {
                    cart_code: this.cart_code
                }
                axios.post(checkOutUrl,params)
                .then(()=>{
                    if (!this.paymentAmount){
                        this.paymentMessage = 'Oops, amount added!'
                    }
                    if (this.paymentAmount >= this.cart.total ){
                        this.paymentMessage = 'Payment made!'
        
                        setTimeout(() => {
                            this.payNow = false;
                            
                        },3000);}
                        
                        else{
                            this.paymentMessage = 'Payment failed'
                        }
                }
                )
            }
            

        }
    })
})