'use strict'
$(document).on('click', '#btnSubmit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    registerUser();
});



var errors = [{
    "message": "Email is not valid",
    "field": "email",
    "status": "Form Error"
},
{
    "message": "Field 'gender' is required",
    "field": "gender",
    "status": "Form Error"
},
{
    "message": "Field 'secondname' should contain from 3 to 60 letters",
    "field": "secondname",
    "status": "Form Error"
},
{
    "message": "Creating user error. Email already exists.",
    "status": "Error"
},
{
    "message": "Wrong route",
    "status": "Error"
}

]

var registerUser = function () {
    var formData = {},
        url = 'http://codeit.ai/codeitCandidates/serverFrontendTest/user/registration';
    $('#registrationForm').serializeArray().map(function (item) {
        if (formData[item.name]) {
            if (typeof (formData[item.name]) === 'string') {
                formData[item.name] = [formData[item.name]];
            }
            formData[item.name].push(item.value);
        } else {
            formData[item.name] = item.value;
        }
        console.log(formData);


    });

    $.ajax({
        method: 'POST',
        url: url,
        data: formData,
        cache: false,
        success: function (data, textStatus, jqXHR) {
            if (data.status != "Form Error") {
                window.location.href = "companies.html";
            } else {
                alert(data.message);
                return;
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(JSON.stringify(jqXHR));
            console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
}
