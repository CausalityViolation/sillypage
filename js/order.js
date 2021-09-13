let orderPastry = document.querySelector("#pastry");
let orderAmount = document.querySelector("#amount");
let orderDelivery = document.querySelector("#delivery");
let orderConfirmed = document.querySelector("#confirmOrder");

let orders = [];


document.getElementById("submitOrder").onclick = function placeOrder() {

    let orderSum = parseInt(orderPastry.value) * parseInt(orderAmount.value) + parseInt(orderDelivery.value);

    let placedOrder = {
        Pastry: orderPastry.options[orderPastry.selectedIndex].text,
        Amount: orderAmount.options[orderAmount.selectedIndex].text,
        Delivery: orderDelivery.options[orderDelivery.selectedIndex].text
    };

    orders.push(placedOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    let storedOrders = JSON.parse(localStorage.getItem("orders"));

    //Kontrollerar i konsollen
    console.log(storedOrders)

    orderConfirmed.setAttribute('style', 'white-space: pre;');
    orderConfirmed.textContent = "Order Successfully Placed!" + " Your Order Total is : " + orderSum + "kr" +
        "\r\n\r\n" + "Your Order Details: " + "\r\n" + convertToString(placedOrder);


    return false;

}

function convertToString(placedOrder) {

    let stringObject = JSON.stringify(placedOrder).replaceAll(/['"{}]/g, '');
    return stringObject.replaceAll(/,/g, "\r\n").replaceAll(/:/g, ": ");
}








