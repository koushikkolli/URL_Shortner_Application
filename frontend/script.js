
let url = "https://url-shrink-application.herokuapp.com"

 function onCreateAccount(){
     let loginForm = document.getElementById("loginFormId")
     let registerFrom = document.getElementById("registerformId")
     loginForm.setAttribute("class", "d-none")
     registerFrom.setAttribute("class", "")
     document.getElementById("loginEmailId").value = ""
     document.getElementById("loginPasswordId").value = ""
 }

 function onAlreadyRegistered(){
    let loginForm = document.getElementById("loginFormId")
    let registerFrom = document.getElementById("registerformId")
    registerFrom.setAttribute("class", "d-none")
    loginForm.setAttribute("class", "")
    document.getElementById("registerFirstNameId").value = ""
    document.getElementById("registerLastNameId").value = ""
    document.getElementById("registerEmaiId").value = ""
    document.getElementById("registerPasswordId").value = ""
}

function onSignIn(){
    let loginForm = document.getElementById("loginFormId")
    let resetFrom = document.getElementById("resetFormId")
    resetFrom.setAttribute("class", "d-none")
    loginForm.setAttribute("class", "")
    document.getElementById("resetEmailId").value = ""
}

function onResetPassword(){
    let loginForm = document.getElementById("loginFormId")
    let resetFrom = document.getElementById("resetFormId")
    loginForm.setAttribute("class", "d-none")
    resetFrom.setAttribute("class", "")
    document.getElementById("loginEmailId").value = ""
    document.getElementById("loginPasswordId").value = ""
}


document.getElementById('registerformId').addEventListener('submit', function(e) {
    e.preventDefault(); //to prevent form submission
    onUserCreate();
  });
function onUserCreate(){
    let firstName = document.getElementById("registerFirstNameId").value
    let lastName = document.getElementById("registerLastNameId").value
    let email = document.getElementById("registerEmaiId").value
    let password = document.getElementById("registerPasswordId").value
    let isActivated = "false"
    fetch(url + `/register`, {
        method: "POST",
        body: JSON.stringify({
            firstName, lastName, email, password, isActivated
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.message === 'Activation mail sent'){
                document.getElementById("registerFirstNameId").value = ""
                document.getElementById("registerLastNameId").value = ""
                document.getElementById("registerEmaiId").value = ""
                document.getElementById("registerPasswordId").value = ""
                onAlreadyRegistered()
            }
            let colDiv2 = ""
            if (data.message === 'Activation mail sent'){
                colDiv2 = document.getElementById("loginFormId")
            }
            else{
                colDiv2 = document.getElementById("registerformId")
            }
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "createUserSuccess")
            if (data.message === 'Activation mail sent'){
                alertDiv.setAttribute("class", "alert alert-success")
                alertDiv.innerHTML = "<strong>Success!</strong> " + data.message
            } 
            else{
                alertDiv.setAttribute("class", "alert alert-danger")
                alertDiv.innerHTML = "<strong>Failure!</strong> " + data.message
            }
            colDiv2.appendChild(alertDiv)
            deleteAlert("createUserSuccess")

        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("loginFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "createUserFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Error while creating the student"
            colDiv2.appendChild(alertDiv)
            deleteAlert("createUserFailure")
        })
        
}

function handleErrors(response) {
    console.log(response)
    if (!response.ok) {
        throw Error(response.message);
    }
    return response;
}

document.getElementById('loginFormId').addEventListener('submit', function(e) {
    e.preventDefault(); //to prevent form submission
    onUserLogin();
  });
function onUserLogin(){
    let email = document.getElementById("loginEmailId").value
    let password = document.getElementById("loginPasswordId").value
    fetch(url + `/login`, {
        method: "POST",
        body: JSON.stringify({
            email, password
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.message === 'Login success'){
                document.getElementById("shortenPageLinkId").click()
            }
            else{
            let colDiv2 = document.getElementById("loginFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "loginUserSuccess")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.innerHTML = "<strong>Failure!</strong> " + data.message             
            colDiv2.appendChild(alertDiv)
            deleteAlert("loginUserSuccess")
        }
        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("loginFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "loginUserFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Internal Server Error"
            colDiv2.appendChild(alertDiv)
            deleteAlert("loginUserFailure")
        })
}


document.getElementById('resetFormId').addEventListener('submit', function(e) {
    e.preventDefault(); //to prevent form submission
    onReset();
  });
function onReset(){
    let email = document.getElementById("resetEmailId").value
    fetch(url + `/reset-password`, {
        method: "PUT",
        body: JSON.stringify({
            email
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            let colDiv2 = document.getElementById("resetFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "resetPassSuccess")
            if (data.message === 'Verification mail sent'){
                alertDiv.setAttribute("class", "alert alert-success")
                alertDiv.innerHTML = "<strong>Success!</strong> " + data.message
            } 
            else{
                alertDiv.setAttribute("class", "alert alert-danger")
                alertDiv.innerHTML = "<strong>Failure!</strong> " + data.message
            }
             
            colDiv2.appendChild(alertDiv)
            deleteAlert("resetPassSuccess")
        })
        .catch((err)=>{
            console.log(err)
            let colDiv2 = document.getElementById("resetFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "resetPassFailure")
            alertDiv.innerHTML = "<strong>Failure!</strong> Internal Server Error"
            colDiv2.appendChild(alertDiv)
            deleteAlert("resetPassFailure")
        })
}


function deleteAlert(elementId){
    setTimeout(function(){
        let node = document.getElementById(elementId)
        node.remove()
    }, 6000)
}
