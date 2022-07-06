document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function () {
        return {
            init() {
                //call API to get all Pizza's
                //set his.pizzas
                axios
                .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
                    .then((result) => {
                        //console.log(result.data)
                        this.pizzas = result.data.pizzas
                    });
            },
            createCart(){
                ///api/pizza-cart/create
                axios
                .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username'+ this.username)
                    .then((result) => {
                        //console.log(result.data)
                       // this.pizzas = result.data.pizzas
                       this.cartId = result.data.cart_code
                    });
            },
            message: 'Eating Pixxa',
            username: '',
            cartId:'',
            pizzas: [],
            add(pizza){
                //need a cart Id so that i can add pizza to cart
                
            }
        }
    })
})