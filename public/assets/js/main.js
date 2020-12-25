let isUsernameCheck = false;
let isConfirmPasswordCheck = false;

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

function ChangeImage(image_link){
    var image = document.getElementById('image-info');
    image.src = image_link;
}