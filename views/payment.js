/*````````````````````PAYPAL```````````````````````````*/
const payableAmt = localStorage.getItem("PAYABLE-AMOUNT");
const productsArray = JSON.parse(localStorage.getItem("CART-ITEMS"));

// Return product ids arrays from products array. Time complexity: O(n)
const getProductIds = (products) => {
  const ids = [];

  products.forEach((product) => {
    ids.push(product.productId);
  });

  return ids;
};

// Save order details in DB
const orderDetailsDB = async (details, products) => {
  const productIds = getProductIds(products);
  const data = {
    details,
    productIds,
  };

  await fetch("/api/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: payableAmt,
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        try {
          // Save purchased order details in DB
          orderDetailsDB(details, productsArray);

          // Clear cart
          localStorage.removeItem("CART-ITEMS");
          localStorage.removeItem("PAYABLE-AMOUNT");

          // Redirect to home page
          window.location.href = "/";
        } catch (error) {
          console.log("Payment -> OnApprove -> Capture - ", error);
        }
      });
    },
  })
  .render("#paypal-button");

/*````````````````````PAYABLE AMOUNT```````````````````````````*/

document.querySelector(".payment-heading span").textContent = `$${payableAmt}`;
