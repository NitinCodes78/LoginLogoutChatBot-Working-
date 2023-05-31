/*````````````````````PAYPAL```````````````````````````*/
const payableAmt = localStorage.getItem("PAYABLE-AMOUNT");

    paypal.Buttons({
        createOrder: function(data, actions){
            return actions.order.create({
                purchase_units:[{
                    amount:{
                        value: payableAmt
                    },
                },
            ],
            })
        },
        onApprove: function(data, actions){
            return actions.order.capture().then(function(details){
            alert("Transaction completed by "+ details.payer.name.given_name);
            /* onSuccess(); */
        })
    },
    })
    .render('#paypal-button')


/*````````````````````PAYABLE AMOUNT```````````````````````````*/

document.querySelector('.payment-heading span').textContent = `$${payableAmt}`;






