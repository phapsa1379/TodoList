


let dos = document.getElementsByClassName("dos-part")[0];
let deleteBtn=document.querySelector('.delete-btn');
let modalText=document.querySelector('.modal-text');
let pagination=document.querySelector('.pagination');
let numberOfDos=0;
getData();
function getId()
{
    return numberOfDos;
}

function getData()
{
    fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
        .then(res=>res.json())
        .then(res=>{console.log(res); numberOfDos=res.length;return res;})
        .then(res=>
        {

            let list= res;
            list.reverse();
            numberOfDos= list.length;
            let content="";
            let numberOfPage=Math.ceil(numberOfDos/10);
            let pageEl="";
            let queryString = decodeURIComponent(window.location.search);
            queryString = queryString.substring(1);
            let queries = queryString.split("=");
            let page=queries[1];
            let start,end;
            if(queryString.includes('=') && page!=="")
            {
                start=(page-1)*10+1;
                end=(page<numberOfPage || numberOfDos%10===0)?page*10:numberOfDos%10+(page-1)*10;
                console.log(numberOfDos);

            }
            else
            {
                page=1;
                start=1;
                end=page<numberOfPage?page*10:numberOfDos%10+(page-1)*10;
            }

               let firstPage=document.querySelector('.first-page');

            for(let i=2;i<=numberOfPage;i++)
            {
                if(page==i)
                {
                    pageEl+=`<li class="page-item active" >
                    <a class="page-${i} page-link" href="#">${i}</a>
                </li>`
                }
                else
                {
                    pageEl+=`<li class="page-item" >
                    <a class="page-${i} page-link" href="#">${i}</a>
                </li>`
                }

            }
            if(page!=1)
            {
                pageEl=` <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">&laquo;</a>
                </li>
                <li class="page-item first-page" aria-current="page"><a class="page-1 page-link" href="#">1</a></li>`+pageEl+`<li class="page-item">
                    <a class="page-link" href="#">&raquo;</a>
                </li>`;
            }
           else
            {
                pageEl=` <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">&laquo;</a>
                </li>
                <li class="page-item active first-page" aria-current="page"><a class="page-1 page-link" href="#">1</a></li>`+pageEl+`<li class="page-item">
                    <a class="page-link" href="#">&raquo;</a>
                </li>`;
            }

            pagination.innerHTML=pageEl;


            if(page<=numberOfPage)
            {


                if(numberOfDos)
                {
                    for(let j=start-1;j<=end-1;j++)
                    {
                        if(!list[j].checked)
                        {
                            content += `<div class="sub-do sub-do-${list[j].id} col-sm-12 my-xs-5 my-sm-5 my-md-3">
                         <input class="do-check check-${list[j].id}" type="checkbox" name="check" />
                        <div class="do-input doinput-${list[j].id}">${list[j].title}</div>
                        <div class="do-icons">
                         <i class="fas fa-pencil-alt edit-${list[j].id}"></i>
                         <i class="fas fa-trash-alt trash-${list[j].id}"></i>
                         </div>
                         </div>`;
                        }
                        else
                        {
                            content += `<div class="sub-do sub-do-${list[j].id} col-sm-12 my-xs-5 my-sm-5 my-md-3">
                          <input class="do-check check-${list[j].id}" type="checkbox" name="check" checked />
                         <div class="do-input doinput-${list[j].id}"><del>${list[j].title}</del></div>
                         <div class="do-icons">
                          <i class="fas fa-pencil-alt edit-${list[j].id}"></i>
                          <i class="fas fa-trash-alt trash-${list[j].id}"></i>
                        </div>
                        </div>`;
                        }
                    }
                    // list.forEach((element, index) => {
                    //     if(!element.checked)
                    //     {
                    //         content += `<div class="sub-do sub-do-${element.id} col-sm-12 my-xs-5 my-sm-5 my-md-3">
                    //          <input class="do-check check-${element.id}" type="checkbox" name="check" />
                    //         <div class="do-input doinput-${element.id}">${element.title}</div>
                    //         <div class="do-icons">
                    //          <i class="fas fa-pencil-alt edit-${element.id}"></i>
                    //          <i class="fas fa-trash-alt trash-${element.id}"></i>
                    //          </div>
                    //          </div>`;
                    //     }
                    //     else
                    //     {
                    //         content += `<div class="sub-do sub-do-${element.id} col-sm-12 my-xs-5 my-sm-5 my-md-3">
                    //           <input class="do-check check-${element.id}" type="checkbox" name="check" checked />
                    //          <div class="do-input doinput-${element.id}"><del>${element.title}</del></div>
                    //          <div class="do-icons">
                    //           <i class="fas fa-pencil-alt edit-${element.id}"></i>
                    //           <i class="fas fa-trash-alt trash-${element.id}"></i>
                    //         </div>
                    //         </div>`;
                    //     }
                    //
                    // });

                }
                else
                {
                    content='';
                }


                dos.innerHTML=content;
                return res;
            }
            else
            {
                let newUrl="http://127.0.0.1:8080/404.html";
                window.location.href = newUrl;
                window.location.assign(newUrl);
                window.location.replace(newUrl);
            }

        })

}

//
// async function showItems()
// {
//
//     let list= getData();
//     numberOfDos= list.length;
//     let content;
//     console.log(numberOfDos);
//     if(numberOfDos)
//     {
//         // list.forEach((element, index) => {
//         //
//         //     content += `<div class="sub-do sub-do-${index} col-sm-12 my-xs-5 my-sm-5 my-md-3">
//         // <input class="do-check check-${index}" type="checkbox" name="check" />
//         // <div class="do-input doinput-${index}">${element}</div>
//         // <div class="do-icons">
//         //     <i class="fas fa-pencil-alt edit-${index}"></i>
//         //     <i class="fas fa-trash-alt trash-${index}"></i>
//         // </div>
//         // </div>`;
//         // });
//         console.log("pgs is :",list);
//     }
//     else
//     {
//     content='';
//     }
//
//
//     dos.innerHTML=content;
// }

dos.addEventListener("click", (ev) => {

    if (ev.target.getAttribute("class").includes("trash")) {//if click on trash icon
        //let con = confirm("Are you sure to delete this item?");

        let classList,id;
        classList = ev.target.getAttribute("class").split(" ");
        id = classList[2].split("-")[1];
        id = Number(id);
        fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
            .then(res=>res.json())
            .then(res=>{
             let item= res.filter((element)=>
                {
                    return element.id===String(id);
                });
             item=item[0];

                let myModal = new bootstrap.Modal(document.getElementById('myModal'));
                modalText.innerHTML=`<strong>Title:</strong> ${item.title} <br/>
                <strong>Description:</strong> ${item.description} <br/>
                <strong>Due Date: </strong>${item.dueDate}`;
                let con= myModal.show();
                deleteBtn.addEventListener('click',(e)=>
                {
                    fetch(`https:60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`,{
                        method : 'DELETE',

                    }).then(x=>{getData();}).then(x=>{myModal.hide();});
                })

            })
    }else if (ev.target.getAttribute("class").includes("check")) {
        let classList,id;
        classList = ev.target.getAttribute("class").split(" ");
        id = classList[1].split("-")[1];
        id = Number(id);

        let currentItem = document.getElementsByClassName(`doinput-${id}`)[0];
        let text = currentItem.textContent;
        // console.log(currentitem);

        if (ev.target.checked) {
            // currentitem.innerHTML=`<del>${text}</del>`;

            ev.target.checked = true;
            fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
                .then(res=>res.json())
                .then(res=>
                {
                    let item= res.filter((element)=>
                    {
                        return element.id===String(id);
                    });
                    item=item[0];
                    item.checked=true;
                    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`,{
                    method : 'PUT',
                        headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                }).then(x=>{getData();});

                })




        } else {
            ev.target.checked = false;
            fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
                .then(res=>res.json())
                .then(res=>
                {
                    let item= res.filter((element)=>
                    {
                        return element.id===String(id);
                    });
                    item=item[0];
                    item.checked=false;
                    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`,{
                        method : 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(item)
                    }).then(x=>{getData();});

                })
        }

    } else if (ev.target.getAttribute("class").includes("edit")) {
        let classList,id;
        classList = ev.target.getAttribute("class").split(" ");
        id = classList[2].split("-")[1];
        id = Number(id);

        let value1=String(id);
        let newUrl;
        let queryString = "?id=" + value1;
        newUrl="http://127.0.0.1:8080/home.html" + queryString;
        window.location.href = newUrl;
        window.location.assign(newUrl);
        window.location.replace(newUrl);


    }

    });


pagination.addEventListener('click',(e)=>
{   let classList,Index;
    classList = e.target.getAttribute("class").split(" ");
    let parent=e.target.parentElement;
    console.log(parent);
    parent.classList.add('active');
    Index = classList[0].split("-")[1];
    console.log(Index);
    let value1=Index;
    let queryString = "?page=" + value1;

    let newUrl= "http://127.0.0.1:8080/Todos.html" + queryString;
    window.location.href = newUrl;
    window.location.assign(newUrl);
    window.location.replace(newUrl);
});