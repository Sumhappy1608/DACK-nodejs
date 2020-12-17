let isUsernameCheck = false;
let isConfirmPasswordCheck = false;

function checkUsernameExist(username){
    $.getJSON('/api/users/is-exist', {username}, function(data){
        if(data){
            $('#username-info').addClass('error').removeClass('success').html('User name has already been taken');
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
        isConfirmPasswordCheck = true;
    }
    else{
        isConfirmPasswordCheck = false;
    }
}

function checkValid(){
    if(isUsernameCheck && isConfirmPasswordCheck)
    {
        return true;
    }
    return false;
}