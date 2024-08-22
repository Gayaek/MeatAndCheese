
$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    const branchName = urlParams.get('branch');
    $("#branch-name").val(branchName);

    $("#reservation-form").on("submit", function (event) {
        event.preventDefault();

        const customerName = $("#customer-name").val();
        const phoneNumber = $("#phone-number").val();
        const numPeople = $("#num-people").val();
        const reservationTime = $("#reservation-time").val();

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert("מספר טלפון לא תקין. יש להזין מספר טלפון בן 10 ספרות שמתחיל ב-0.");
            return;
        }

        const [hours, minutes] = reservationTime.split(':').map(Number);
        if (!((hours >= 11 && hours < 24) || (hours >= 0 && hours < 3))) {
            alert("השעה שהוזנה לא תקינה. יש להזין שעה בין 11:00 ל-03:00.");
            return;
        }

        if (minutes >= 60) {
            alert("הדקות שהוזנו לא תקינות. יש להזין מספר דקות בין 00 ל-59.");
            return;
        }

        const receipt = `
            שם לקוח: ${customerName}<br>
            שם מסעדה: ${branchName}<br>
            מספר אנשים: ${numPeople}<br>
            שעה: ${reservationTime}<br>
            טלפון: ${phoneNumber}
        `;

        $("#reservation-card").hide();
        $("#receipt-section").show();
        $("#receipt-content").html(receipt);
    });
});
