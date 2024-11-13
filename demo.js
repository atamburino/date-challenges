const props = {
    crust: "thin",
    cheese: null,
    sauce: "red",
    toppings: ["peppers", "mushrooms"],
    quantity: 2
}

class Pizza {
   constructor(pizzaProps) {
    console.log(pizzaProps)
    this.toppings = pizzaProps.toppings;
    this.crust = pizzaProps.crust;
    this.cheese = pizzaProps.cheese;
    this.sauce = pizzaProps.sauce;
    this.quantity = pizzaProps.quantity;
   }


   doubleQuantity() {
    return this.quantity * 2;
   }
}

let pizza1 = new Pizza(props)
console.log("Pizza #1", pizza1);


// ------ Mini Pizza Stuff -------

class MiniPizza extends Pizza {
    constructor(props) {
        super(props)
        console.log("props", props.quantity)
    }
}

let miniPizza = new MiniPizza({quantity: 5})
console.log("Mini Pizza", miniPizza)

