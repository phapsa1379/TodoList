// var msg = new SpeechSynthesisUtterance();
// msg.text = "Hello World";
// window.speechSynthesis.speak(msg);

let toastBody=document.querySelector('.toast-body');
let toastElList = [].slice.call(document.querySelectorAll('.toast'))
let toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
})
let toast=document.getElementsByClassName('toast');

let baseUrl="https://60b77f8f17d1dc0017b8a2c4.mockapi.io/";

let sub=document.getElementById('submit');
let titleEl=document.getElementById('title');
let descriptionEl=document.getElementById('description');
let dateEl=document.getElementById('date');
let warning=document.getElementsByClassName('warning');
let numberOfDos=0;
let objInfo={
    // id: null,
    // createdAt:null,
    // updatedAt:null,
    checked:null,
    title:null,
    description:null,
    dueDate:null
}

////////////////////////////////////////////////////////////////////////////
//URL
let queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
let queries = queryString.split("=");
let idFromUrl=queries[1];
if(queryString.includes('=') && queries[1]!=="")
{
    console.log(idFromUrl);
    sub.value="Save";
    fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
        .then(res=>res.json())
        .then(res=> {
            let item = res.filter((element) => {
                return element.id === String(idFromUrl);
            });
            if(item.length)
            {
                item = item[0];
                titleEl.value=item.title;
                descriptionEl.value=item.description;
                dateEl.value=item.dueDate;


                sub.addEventListener('click',(e)=>
                {
                    e.preventDefault();
                    if(titleEl.value==="")
                    {
                        titleEl.style='border:4px solid red';
                        dateEl.style='border: 4px solid #1e3799';
                        warning[0].style.display='block';
                        warning[1].style.display='none';
                        titleEl.classList.add("shake-class");
                        setTimeout(() => {
                            titleEl.classList.remove("shake-class");
                        }, 1000);

                    }
                    else if(dateEl.value==="")
                    {
                        dateEl.style='border: 4px solid red';
                        titleEl.style='border: 4px solid #1e3799';
                        warning[1].style.display='block';
                        warning[0].style.display='none';
                        dateEl.classList.add("shake-class");
                        setTimeout(() => {
                            dateEl.classList.remove("shake-class");
                        }, 1000);
                    }
                    else {

                        toastBody.textContent=" The todo changes successfully."
                        toast[0].classList.add('toast_come');
                        titleEl.style = 'border: 4px solid #1e3799';
                        dateEl.style = 'border: 4px solid #1e3799';
                        warning[0].style.display = 'none';
                        warning[1].style.display = 'none';
                        toastList[0].show();
                        setTimeout(() => {
                            titleEl.value = "";
                            descriptionEl.value = "";
                            dateEl.value = "";
                        }, 3000)

                        // let id,createAt,updateAt,checked,titleValue,descriptionValue,dueDateValue;

                        // objInfo.id=getId()+1;
                        let time = new Date();
                        // objInfo.createdAt=objInfo.updatedAt=String(time);
                        objInfo.title = titleEl.value;
                        objInfo.description = descriptionEl.value;
                        objInfo.dueDate = dateEl.value;
                        objInfo.checked = item.checked;

                        console.log(putToServer(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${idFromUrl}`, objInfo));
                        setTimeout(()=>
                        {
                            let newUrl="http://127.0.0.1:8080/home.html";
                            window.location.href = newUrl;
                            window.location.assign(newUrl);
                            window.location.replace(newUrl);
                        },2000)

                    }
                }).catch(x=>
                {
                    let newUrl="http://127.0.0.1:8080/404.html";
                    window.location.href = newUrl;
                    window.location.assign(newUrl);
                    window.location.replace(newUrl);
                })



            }
            else
            {
                let newUrl="http://127.0.0.1:8080/404.html";
                window.location.href = newUrl;
                window.location.assign(newUrl);
                window.location.replace(newUrl);
            }


        });




}
else
{

}







async function putToServer(url,data)
{

    const response=await fetch(url,{
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}











getData();
function getId()
{
    return numberOfDos;
}

async function postToServer(url,data)
{

    const response=await fetch(url,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}



sub.addEventListener('click',(e)=>
{
   if(sub.value==="Submit")
   {
       e.preventDefault();
       if(titleEl.value==="")
       {
           titleEl.style='border:4px solid red';
           dateEl.style='border: 4px solid #1e3799';
           warning[0].style.display='block';
           warning[1].style.display='none';
           titleEl.classList.add("shake-class");
           setTimeout(() => {
               titleEl.classList.remove("shake-class");
           }, 1000);

       }
       else if(dateEl.value==="")
       {
           dateEl.style='border: 4px solid red';
           titleEl.style='border: 4px solid #1e3799';
           warning[1].style.display='block';
           warning[0].style.display='none';
           dateEl.classList.add("shake-class");
           setTimeout(() => {
               dateEl.classList.remove("shake-class");
           }, 1000);
       }
       else
       {


           toast[0].classList.add('toast_come');
           titleEl.style='border: 4px solid #1e3799';
           dateEl.style='border: 4px solid #1e3799';
           warning[0].style.display='none';
           warning[1].style.display='none';
           toastList[0].show();
           setTimeout(()=>
           {
               titleEl.value="";
               descriptionEl.value="";
               dateEl.value="";
           },3000)

           // let id,createAt,updateAt,checked,titleValue,descriptionValue,dueDateValue;

           // objInfo.id=getId()+1;
           let time= new Date();
           // objInfo.createdAt=objInfo.updatedAt=String(time);
           objInfo.title=titleEl.value;
           objInfo.description=descriptionEl.value;
           objInfo.dueDate=dateEl.value;
           objInfo.checked=false;

           console.log(postToServer('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos',objInfo));
           // console.log(postToServer('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos',['ali,reza,mohammad']));


       }
   }
});

// async function getData()
// {
//     let response=await fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos');
//     let data= await response.json();
//    console.log(data);
// }

function getData()
{
    fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
        .then(res=>res.json())
        .then(res=>{console.log(res); numberOfDos=res.length; return res;});
}


