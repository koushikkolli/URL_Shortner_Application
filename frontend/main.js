let url = "https://url-shrink-application.herokuapp.com"

function onLoad(){
    let resetURL = new URL(window.location.href)
    let hashId = resetURL.searchParams.get("id");
    fetch(url + `/hash/${hashId}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.message === "Success"){
                window.location.replace(data.longURL);
            }
            else{
                let indexPage = document.getElementById("indexPageId")
                indexPage.setAttribute("class", "login-page")
            }
            
        })
        .catch((err)=>{
            let indexPage = document.getElementById("indexPageId")
            indexPage.setAttribute("class", "login-page")
        })
}

onLoad()


function deleteAlert(elementId){
    setTimeout(function(){
        let node = document.getElementById(elementId)
        node.remove()
    }, 6000)
}