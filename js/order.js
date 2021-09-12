let orderPastry = document.querySelector("#pastry");
let orderAmount = document.querySelector("#amount");
let orderDelivery = document.querySelector("#delivery");
let orderConfirmed = document.querySelector("#confirmOrder");


document.getElementById("submitOrder").onclick = function placeOrder() {

    let orderSum = parseInt(orderPastry.value) * parseInt(orderAmount.value) + parseInt(orderDelivery.value);

    orderConfirmed.setAttribute('style', 'white-space: pre;');
    orderConfirmed.textContent = "Order Successfully Placed!" + " Your Order Total is : " + orderSum + "kr" +
        "\r\n\r\n" + "Your Order Details: " + "\r\n"

    return false;

}

