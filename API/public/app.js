


const url = 'http://localhost:5000';




function signup() {
    var userName = document.getElementById('name').value
    var userEmail = document.getElementById('email').value.toLowerCase()
    var userPhone = document.getElementById('phone').value
    var userPassword = document.getElementById('password').value

    // console.log(userEmail)

    axios({
        method: 'post',
        url: "http://localhost:5000/signup",
        data: {
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userPassword: userPassword
        },
        withCredentials: true

    })
        .then(function (response) {
            console.log(response);
            if (response.data.status === 200) {
                alert(response.data.message)
                location.href = "./login.html"
            } else {
                alert(response.data.message)
            }
        })
        .catch(function (error) {
            alert(error.response.data.message)
        });

    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("password").value = ""

    return false;
}


function login() {
    var loginEmail = document.getElementById('loginEmail').value
    var loginPassword = document.getElementById('loginPassword').value

    axios({
        method: 'post',
        url: url + '/login',
        data: {
            email: loginEmail,
            password: loginPassword
        },
        withCredentials: true
    })

        .then(function (response) {
            alert(response.data.message)
            window.location = "/home.html"
        })
        .catch(function (error) {

            alert(error.response.data.message)
        });



    return false;


}

function forgetPassword() {
    // alert("lafdksals")
    var forgetEmail = document.getElementById('forgetEmail').value
    localStorage.setItem("forgetEmail", forgetEmail)
    console.log(forgetEmail)
    axios({
        method: 'post',
        url: url + '/forget-password',
        data: ({
            forgetEmail:forgetEmail
        }),
        credentials: 'include'


    }).then((response) => {
        console.log(response)
        if (response.data.status == 200) {
            alert(response.data.message)
            window.location.href = "./passwordVarification.html"
        } else {
            alert(response.data.message)
        }
    }, (err) => {
        console.log(err);
        alert(err)
    });

    return false;
}
function forgetPasswordStep2() {

    // alert("lafdksals")
    var otpCode = document.getElementById('varificationCode').value
    var newPassword = document.getElementById('NewPassword').value
    var emailVarification = localStorage.getItem("forgetEmail")
    console.log(otpCode)
    console.log(newPassword)
    console.log(emailVarification)
    axios({
        method: 'post',
        url:  url +'/forget-password-step-2',
        data: ({
            emailVarification: emailVarification,
            newPassword: newPassword,
            otpCode: otpCode
        }),
        credentials: 'include'


    }).then((response) => {
        console.log(response.data.message)
        if (response.data.status == 200) {
            console.log(response.data.message)
            if (response.data.status == 200) {
                alert(response.data.message)
                window.location.href = "./login.html"
            } else {
                alert(response.data.message)
            }

        } else {
            alert(response.data.message)
        }
    }, (err) => {
        console.log(err);
        alert(err)
    });


    return false;
}



function userData() {

    axios({

        method: 'get',
        url:  url +'/profile',
        credentials: 'include'

    }).then((response) => {

        document.getElementById('userName').innerText = response.data.profile.name
        document.getElementById('userEmail').innerText = response.data.profile.email
        document.getElementById('userPhone').innerText = response.data.profile.phone
    }, (err) => {
        console.log(err);
        alert(err)
    });

}


function logout() {

    axios({
        method: 'post',
        url:  url + '/logout',

    }).then((response) => {
        console.log(response)
        // alert(response.data.message)
        window.location.href = "/login.html"

    }, (err) => {
        console.log(err);
        alert(err)
    });



    return false;
} 