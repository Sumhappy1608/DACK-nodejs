let fisrtPage = 1;
let curPage = 1;
let lastPage = document.getElementById('all-page').value;
let id = document.getElementById('product-id').value;
var prev = document.getElementById('prev');
var next = document.getElementById('next');

function checkView(){
    
    if(curPage <= fisrtPage)
    {
        prev.style.visibility = "hidden";
    }
    else{
        prev.style.visibility = "initial";
    }

    if(curPage >= lastPage){
        next.style.visibility = "hidden";
    }
    else{
        next.style.visibility = "initial";
    }
}

function ChangePage(){
    $.getJSON('/api/comment/change-page?id=' + id + '&currentPage=' + curPage, function(data){
        if(data){
            let arr = data.comments;
            let Str = "";
            arr.forEach(element => {
                Str = Str + "<h3>" + element.username + "</h3><label>" + element.date + "</label><p>" + element.text + "</p>";
            });
            document.getElementById('user_comment').innerHTML = Str;
        }
    });
}

checkView();

function checkNext(){
    curPage++;
    checkView();
    if(curPage > 1)
    {
        ChangePage();
    }
}

function checkPrev(){
    curPage--;
    checkView();
    if(curPage < lastPage)
    {
        ChangePage();
    }
}