let url = "https://url-shrink-application.herokuapp.com"

function onLoad(){
    fetch(url + `/get_count`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.message === "Success"){
                let pastOneDay = document.getElementById("pastOnedayId")
                pastOneDay.innerText = data.oneDayCount
                let pastThirtyDay = document.getElementById("pastThirtydayId")
                pastThirtyDay.innerText = data.thirtyDayCount
            }  
        })
        .catch((err)=>{
            
        })
}

onLoad()

document.getElementById('longformId').addEventListener('submit', function(e) {
    e.preventDefault(); //to prevent form submission
    onShortenURL();
  });


function onShortenURL(){
    let longURL = document.getElementById("longURLId").value
    fetch(url + `/shortenURL`, {
        method: "POST",
        body: JSON.stringify({
            longURL
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            let colDiv2 = document.getElementById("longformId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "urlShortenSuccessId")
            if (data.message === 'URL is shortened'){
                alertDiv.setAttribute("class", "alert alert-success")
                alertDiv.innerHTML = "<strong>Success!</strong> " + data.message
                let shortenURLDiv = document.getElementById("shortURLId")
                shortenURLDiv.setAttribute("class", "input-group")
                let shortenURLValue = document.getElementById("shortURLValueId")
                shortenURLValue.value = data.shortenedURL
            } 
            else{
                alertDiv.setAttribute("class", "alert alert-danger")
                alertDiv.innerHTML = "<strong>Failure!</strong> " + data.message
            }
             
            colDiv2.appendChild(alertDiv)
            deleteAlert("urlShortenSuccessId")

        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("loginFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "urlShortenFailureId")
            alertDiv.innerHTML = "<strong>Failure!</strong> Internal Server Error"
            colDiv2.appendChild(alertDiv)
            deleteAlert("urlShortenFailureId")
        })
        
}

function onCopy() {
    /* Get the text field */
    var copyText = document.getElementById("shortURLValueId");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Copied the URL");
  }

  
function deleteAlert(elementId){
    setTimeout(function(){
        let node = document.getElementById(elementId)
        node.remove()
    }, 6000)
}

document.getElementById('homeButtonId').addEventListener('click', function(e) {
    e.preventDefault(); //to prevent form submission
    onHome();
  });
function onHome(){
    onLoad()
    let homeForm = document.getElementById("homePageId")
    let shortURLForm = document.getElementById("shortenPageId")
    shortURLForm.setAttribute("class", "login-page d-none")
    homeForm.setAttribute("class", "login-page")
    document.getElementById("shortURLValueId").value = ""
    document.getElementById("longURLId").value = ""
    let shortenURLDiv = document.getElementById("shortURLId")
    shortenURLDiv.setAttribute("class", "input-group d-none")
}

document.getElementById('shrinkButtonId').addEventListener('click', function(e) {
    e.preventDefault(); //to prevent form submission
    onShrink();
  });
function onShrink(){
    let homeForm = document.getElementById("homePageId")
    let shortURLForm = document.getElementById("shortenPageId")
    homeForm.setAttribute("class", "login-page d-none")
    shortURLForm.setAttribute("class", "login-page")
}