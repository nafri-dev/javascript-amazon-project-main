

 export let cart =JSON.parse( localStorage.getItem('cart'));
 
 
 if (!cart){

  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId : '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId : '2'
  }];
  


 }
                                                                                                                                                                                          
 
function save(){
 localStorage.setItem('cart' , JSON.stringify(cart));

}

 
export function addToCart(productId){
    let matchingProduct;
  
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingProduct = item;
      }
    });
  
    let quantityCart = document.querySelector(`.js-select-cart-${productId}`);
  
    const quantity = quantityCart.value;
  
  
  
    if (matchingProduct) {
      matchingProduct = quantity
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId : '1'
      });
    }
    save();
  }

    export function removeFromCart (productId){
   
    const newCart = [];
    
    cart.forEach((item) => {

      if(item.productId !== productId ){

        newCart.push(item);


      }

    });

    cart = newCart;

    save();


  }  