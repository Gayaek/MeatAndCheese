

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const total = urlParams.get('total');
    const address = urlParams.get('address');

    $("#payment-form").on("submit", function (event) {
        event.preventDefault();

        const cardNumber = $("#card-number").val().replace(/\s+/g, '');
        const expiryDate = $("#expiry-date").val();
        const cvv = $("#cvv").val();

        if (!validateCardNumber(cardNumber)) {
            alert("מספר כרטיס אשראי לא תקין.");
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            alert("תאריך תפוגה לא תקין.");
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert("CVV לא תקין.");
            return;
        }

        const receipt = `
                    <strong>כתובת:</strong> ${decodeURIComponent(address)}<br>
                    <strong>סכום לתשלום:</strong> ₪${total}<br>
                    <strong>סטטוס תשלום:</strong> בוצע בהצלחה
                `;

        $("#receipt-section").show();
        $("#receipt-content").html(receipt);
    });

    function validateCardNumber(number) {
        let sum = 0;
        let shouldDouble = false;

        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return (sum % 10) === 0;
    }

    function validateExpiryDate(date) {
        const [month, year] = date.split('/').map(Number);
        if (month < 1 || month > 12) return false;

        const currentDate = new Date();
        const expiryDate = new Date(`20${year}`, month - 1);

        return expiryDate >= currentDate;
    }
});