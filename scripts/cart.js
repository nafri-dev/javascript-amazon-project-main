 export const cart = [];


 
export function addToCart(productId){
    let matchingProduct;
  
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingProduct = item;
      }
    });
  
    let quantityCart = document.querySelector(`.js-select-cart-${productId}`);
  
    const quantity =Number( "quantityCart.value");
  
  
  
    if (matchingProduct) {
      matchingProduct = quantity
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    }
  }
  