console.log("hi")
let parambox = document.getElementById("parameterBox")
let jsonbox = document.getElementById("requestJsonBox")
let paramradio = document.getElementById("paramsRadio")
let jsonradio = document.getElementById("jsonRadio")
jsonbox.style.display = "block";
parambox.style.display = "none";

paramradio.addEventListener("click", () => {
    jsonbox.style.display = "none";
    parambox.style.display = "block";
})

jsonradio.addEventListener("click", () => {
    jsonbox.style.display = "block";
    parambox.style.display = "none";
})

let index = 0;
let plusParams = document.getElementById("plusParams")
plusParams.addEventListener("click", () => {
    let addParams = document.getElementById("addParams")
    let html = ` <div class="row my-1">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${index + 2}</label>
    <div class="col">
    <input type="text" class="form-control paramkeybox" id="parameterKey${index + 2}" placeholder="Enter Parameter ${index + 2} Key">
    </div>
    <div class="col">
    <input type="text" class="form-control paramvaluebox" id="parameterValue${index + 2}" placeholder="Enter Parameter ${index + 2} Value"
    aria-label="Last name">
    </div>
    <div class="col">
    <button id="minusParams${index + 2}" class ="btn btn-primary deleteparam">-</button>
    </div>
    </div>
    `
    
    index++;
    addParams.innerHTML += html
    
    let deleteparam = document.getElementsByClassName("deleteparam")
    
    for (let element of deleteparam) {
        element.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove();
        })
    }
});


let submit = document.getElementById("submit")
let post = document.getElementById("post")
submit.addEventListener("click", () => {
    
    let get = document.getElementById("get")
    if (get.checked) {
        
        url = document.getElementById("url").value;
        fetch(url).then(response => response.text())
        .then(data => {
            console.log(data)
            document.getElementById("responsePrism").innerHTML = data
            Prism.highlightAll();
        })
    }
    else if (post.checked) {
        data1 = {};
        if (paramradio.checked) {
            // let paramkeybox = document.getElementsByClassName("paramkeybox");
            // for (const element of paramkeybox) {
                
            //     console.log(element)
            // }
            // console.log(paramkeybox.length)
            for (let i = 0; i < index+1; i++) {
                
                if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
                    let key = document.getElementById("parameterKey" + (i + 1)).value
                    let value = document.getElementById("parameterValue" + (i + 1)).value
                    data1[key] = value
                }
            }
            data1 = JSON.stringify(data1)
            console.log("param data is...", data1)
        } else {
            data1 = document.getElementById("requestJsonText").value
            console.log("jsonbox data is...", data1)
        }
        params = {
            method: "post",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data1
        };
        
        url = document.getElementById("url").value;
        fetch(url, params).then(response => response.text())
        .then((data) => {
            console.log(data)
            document.getElementById("responsePrism").innerHTML = data
            Prism.highlightAll();
        })
    }
});