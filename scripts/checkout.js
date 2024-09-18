import { cart, removeFromCart } from "./cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliverOption.js";

let cartSummary = "";

cart.forEach((item) => {
  const productId = item.productId;

  let matchingProductitem;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProductitem = product;
    }
  });

  const  deliverOptionId = item.deliveryOptionId;

  let deliveryOption ;

  deliveryOptions.forEach((option) => {

    if(option.id === deliverOptionId){

      deliveryOption = option;
    }


    console.log(deliveryOption)
  




  });
  const today = dayjs();



  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');



  const dateString = deliveryDate.format('dddd , MMMM D');


  cartSummary += `
      <div class="cart-item-container js-cart-item-container-${matchingProductitem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProductitem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProductitem.name}
                </div>
                <div class="product-price">
                 &#8377 ${matchingProductitem.priceCents}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">2</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProductitem.id}>
                    Delete
                  </span>
                </div>
              </div>

               <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliverOptionHtml(matchingProductitem,item)}
               

             
              </div>
            </div>
          </div>
    
    
    
    `;
});

function deliverOptionHtml(matchingProductitem, item) {   


  
  let html= '';
  deliveryOptions.forEach((option) => {

    const today = dayjs();

    const deliveryDate = today.add(option.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd , MMMM D');


    const priceString = option.priceCents === 0 ? 'FREE' :`${option.priceCents}`;
    
    const isChecked = option.id === item.deliveryOptionId;

    console.log(isChecked.valueOf)

    

    html += 
    `

    <div class="delivery-option">
                 <input type="radio"
                 ${isChecked ? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProductitem.id}">
                  <div>
                    <div class="delivery-option-date">
                     ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}
                    </div>
                  </div>
                </div>

    
    
    `;
  });

  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummary;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      ` .js-cart-item-container-${productId}`
    );

    container.remove();
  });
});
