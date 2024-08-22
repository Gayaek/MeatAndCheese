$(document).ready(function () {
    const products = [
        { id: 1, name: "טוסט גבינה ונקניק", price: 15 },
        { id: 2, name: "גאיה המושחתת", price: 20 },
        { id: 3, name: "לחמני קלאסי", price: 10 },
        { id: 4, name: "הר אקשטיין", price: 25 },
        { id: 5, name: "פיצוץ בפה", price: 60 },
        { id: 6, name: "צ'יפס", price: 33 },
        { id: 7, name: "טבעות בצל", price: 39 },
        { id: 8, name: "נקניקיות עוף", price: 33 },
        { id: 9, name: "סלט כרוב", price: 40 },
        { id: 10, name: "סלט קיסר", price: 35 },
        { id: 11, name: "סלט ירקות", price: 35 },
        { id: 12, name: "מיונז שום", price: 3 },
        { id: 13, name: "קטשופ צ'ילי", price: 2 },
        { id: 14, name: "פסטו", price: 4 },
        { id: 15, name: "מיונז רגיל", price: 2 },
        { id: 16, name: "קטשופ", price: 2 },
        { id: 17, name: "חרדל", price: 3 },
        { id: 18, name: "סחוג", price: 3 },
        { id: 19, name: "צ'ילי חריף", price: 4 },
        { id: 20, name: "נסטי", price: 10 },
        { id: 21, name: "מים בטעמים", price: 10 },
        { id: 22, name: "פחית", price: 10 },
        { id: 23, name: "בירה שחורה", price: 10 },
        { id: 24, name: "סודה/מים מינרליים", price: 8 },
        { id: 25, name: "צ'ורוס", price: 20 },
        { id: 26, name: "סופלה", price: 45 },
        { id: 27, name: "מוס שוקולד", price: 26 },
        { id: 28, name: "קרם ברולה", price: 39 },
        { id: 29, name: "פנקייק", price: 18 },
    ];

    let totalPrice = 0;
    let deliveryOption = "";
    let selectedRestaurant = $("#restaurant-select").val();
    let paymentOption = "";
    let orderedProducts = [];
    let addressConfirmed = false;

    $('#pickup-btn').on('click', function () {
        deliveryOption = "pickup";
        $('#address-section').hide();
        $('#delivery-pickup-section').hide();
        $('#product-selection').show();
        updateProducts();
        $('#payment-section').hide();
        $('#receipt-section').hide();
        $('#submit-order-btn').hide();
    });

    $('#delivery-btn').on('click', function () {
        deliveryOption = "delivery";
        $('#address-section').show();
        $('#delivery-pickup-section').hide();
        $('#product-selection').hide();
        $('#payment-section').hide();
        $('#receipt-section').hide();
        $('#submit-order-btn').hide();
    });

    $('#confirm-address-btn').on('click', function () {
        const address = $('#address-input').val().trim();
        if (validateAddress(address)) {
            addressConfirmed = true;
            $('#address-input').prop('disabled', true);
            $('#confirm-address-btn').prop('disabled', true);
            $('#product-selection').show();
            updateProducts();
            $('#payment-section').hide();
            $('#receipt-section').hide();
            $('#submit-order-btn').hide();
        } else {
            alert("אנא הזן כתובת חוקית.");
        }
    });

    function updateProducts() {
        $("#products-container").empty();
        products.forEach(product => {
            $("#products-container").append(`
                <div class="form-group mb-3">
                    <label>${product.name} - ₪${product.price}</label>
                    <input type="number" min="0" class="form-control quantity-input" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" style="width: 100px; display: inline-block; margin-right: 10px;" value="0">
                </div>
            `);
        });
    }

    $(document).on('input', '.quantity-input', function () {
        totalPrice = 0;
        orderedProducts = [];

        $(".quantity-input").each(function () {
            const price = parseInt($(this).data('price'));
            const quantity = parseInt($(this).val());

            if (quantity > 0) {
                orderedProducts.push({
                    name: $(this).data('name'),
                    quantity: quantity,
                    price: price * quantity
                });
                totalPrice += price * quantity;
            }
        });

        $("#total-price").text("₪" + totalPrice);
        if (totalPrice > 0) {
            $('#submit-order-btn').show();
        } else {
            $('#submit-order-btn').hide();
        }
    });

    $('#submit-order-btn').on('click', function () {
        if (orderedProducts.length === 0) {
            alert("אנא בחר לפחות מוצר אחד להזמנה.");
            return;
        } else {
            showPaymentOptions();
            $('#submit-order-btn').hide();
            $('#product-selection').hide();
            $('#restaurant-selection').hide();
            $('#address-section').hide();

            disableInputs();
            displayReceipt();
        }
    });

    function showPaymentOptions() {
        const paymentOptionsHtml = `
            <h4>בחר אפשרות תשלום</h4>
            <div id="paymentOptions" class="d-flex">
               <button id="pay-now-btn" class="btn btn-outline-secondary me-3">תשלום באתר</button>
<button id="pay-later-btn" class="btn btn-outline-secondary ms-2">תשלום במקום</button>

            </div>
        `;
        $('#payment-section').html(paymentOptionsHtml).show();

        $('#pay-now-btn').on('click', function () {
            paymentOption = "payNow";
            showPaymentForm();
        });

        $('#pay-later-btn').on('click', function () {
            paymentOption = "payLater";
            displayReceipt();
        });
    }

    function showPaymentForm() {
        const paymentFormHtml = `
            <div id="payment-form" class="mt-3">
                <h4>פרטי תשלום</h4>
                <div class="form-group mb-2">
                    <label for="card-number">מספר כרטיס אשראי</label>
                    <input type="text" id="card-number" class="form-control" placeholder="1234 5678 9012 3456" required>
                </div>
                <div class="form-group mb-2">
                    <label for="expiry-date">תוקף כרטיס (MM/YY)</label>
                    <input type="text" id="expiry-date" class="form-control" placeholder="MM/YY" required>
                </div>
                <div class="form-group mb-2">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" class="form-control" placeholder="123" required>
                </div>
                <button id="confirm-payment-btn" class="btn btn-primary mt-2">בצע תשלום</button>
            </div>
        `;
        $('#payment-section').html(paymentFormHtml);

        $('#confirm-payment-btn').on('click', function () {
            const cardNumber = $('#card-number').val().trim();
            const expiryDate = $('#expiry-date').val().trim();
            const cvv = $('#cvv').val().trim();

            if (!validateCardDetails(cardNumber, expiryDate, cvv)) {
                alert("פרטי התשלום לא תקינים. אנא בדוק שוב.");
                return;
            }

            alert("התשלום בוצע בהצלחה!");
            displayReceipt();
        });
    }

    function validateCardDetails(cardNumber, expiryDate, cvv) {
        const cardRegex = /^\d{16}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3}$/;

        return cardRegex.test(cardNumber) && expiryRegex.test(expiryDate) && cvvRegex.test(cvv);
    }

    function displayReceipt() {
        const address = deliveryOption === "delivery" ? $('#address-input').val().trim() : "איסוף מהמסעדה";
        let productDetails = "";
        orderedProducts.forEach(product => {
            productDetails += `${product.quantity} x ${product.name}: ₪${product.price} <br>`;
        });

        const receiptHtml = `
            <strong>מסעדה:</strong> ${$('#restaurant-select').val()}<br>
            <strong>כתובת:</strong> ${address}<br>
            <strong>מוצרים שהוזמנו:</strong><br>${productDetails}
            <strong>סה"כ לתשלום:</strong> ₪${totalPrice}<br>
            <strong>סטטוס תשלום:</strong> ${paymentOption === "payNow" ? "שולם באתר" : "ישולם במקום"}
        `;
        $('#receipt-content').html(receiptHtml);
        $('#receipt-section').show();
        $('#product-selection').hide();
        $('#payment-section').hide();
        $('#submit-order-btn').hide();
        $('#restaurant-selection').hide();
        $('#address-section').hide();
    }

    function validateAddress(address) {
        return address.length > 5;
    }

    $(document).on('click', '#reset-form-btn', function () {
        location.reload();
    });
});
