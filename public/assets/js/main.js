let isUsernameCheck = false;
let isConfirmPasswordCheck = false;

let usernameConfirmCHange = false;

function checkUsernameExist(username){
    $.getJSON('/api/users/is-exist', {username}, function(data){
        if(data){
            $('#username-info').addClass('error').removeClass('success').html('User name has already been taken');
            isUsernameCheck = false;
        }
        else if (username === ''){
            $('#username-info').addClass('error').removeClass('success').html('Please fill this one');
            isUsernameCheck = false;
        }
        else{
            $('#username-info').addClass('success').removeClass('error').html('You can take this username');
            isUsernameCheck = true;
        }
    });
}

function checkUsernameExist2(username){
    $.getJSON('/api/users/is-exist', {username}, function(data){
        if(data){
            $('#username-check').addClass('success').removeClass('error').html('');
            
            usernameConfirmCHange = true;
            console.log(usernameConfirmCHange);
        }
        else if (username === ''){
            $('#username-check').addClass('error').removeClass('success').html('Please fill this one');
            usernameConfirmCHange = false;
        }
        else{
            $('#username-check').addClass('error').removeClass('success').html('There is no username like this!');
            usernameConfirmCHange = false;
        }
    });
}

function checkConfirmPassword(con_password){
    let password = document.getElementById('password').value;
    console.log(password);
    if(con_password === password)
    {
        $('#password-confirm').removeClass('error').html('');
        isConfirmPasswordCheck = true;
    }
    else{
        $('#password-confirm').addClass('error').html('Please check your password again');
        isConfirmPasswordCheck = false;
    }
}

function makeBoolFalse(){
    isConfirmPasswordCheck = false;
}

function checkValid(){
    if(isUsernameCheck && isConfirmPasswordCheck)
    {
        return true;
    }
    return false;
}

function CheckValidUser(){
    console.log(usernameConfirmCHange);
    if(usernameConfirmCHange)
    {
        return true;
    }
    return false;
}

function ChangeImage(image_link){
    var image = document.getElementById('image-info');
    image.src = image_link;
}

function isValidPrice(){
    var min = parseInt(document.getElementById("minPrice").value);
    var max = parseInt(document.getElementById("maxPrice").value);
    if (!min)
    {
        min = 0;
    }
    if (!max)
    {
        max = 100000000
    }
    if(min > max){
        $('#errorNotice').text("Giá nhỏ nhất phải bé hơn hoặc bằng giá lớn nhất");
        document.getElementById('submitButton').disabled = true;
        alert(min);
        alert(max);
    }
    else if(Math.sign(min) == -1 || Math.sign(max) == -1)
    {
        $('#errorNotice').text("Không được nhập giá trị âm");
        document.getElementById('submitButton').disabled = true;
    }
    else{
        $('#errorNotice').empty();
        document.getElementById('submitButton').disabled = false;
    }
}