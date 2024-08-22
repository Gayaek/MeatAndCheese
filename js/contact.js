

$(document).ready(function () {
    $('#contact-form').on('submit', function (event) {
        event.preventDefault();

        const phone = $('#phone').val();
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(phone)) {
            alert('מספר טלפון לא תקין. מספר הטלפון חייב להיות בדיוק 10 ספרות וללא אותיות.');
            return;
        }

        const email = $('#email').val();
        const emailRegex = /^[^\s@]+@(gmail\.com|walla\.com|hotmail\.com)$/;

        if (!emailRegex.test(email)) {
            alert('כתובת דוא״ל לא תקינה. אנא הזן כתובת תקינה עם סיומת @gmail.com, @walla.com, או @hotmail.com.');
            return;
        }

        alert('הפרטים נשלחו בהצלחה!');
        this.submit();
    });
});
