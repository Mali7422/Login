const fileInput = document.getElementById('file');
const button = document.getElementById('button');
const username = document.getElementById('username');
const password = document.getElementById('password');
const pUsername = document.getElementById('p_username');
const pPassword = document.getElementById('p_password');

let mouseOn = false;


let user = [];
let pin = [];

fileInput.addEventListener('change', selectFile);
button.addEventListener('click', checkButton);
pPassword.addEventListener('mouseover', showPassword);
pPassword.addEventListener('mouseout', hidePassword);

function selectFile(event) {
    const file = event.target.files[0];
    let fr = new FileReader();

    fr.readAsText(fileInput.files[0]);

    fr.onload = function() {
        let knowledges = fr.result.split('\n'); //İçeriği satır sonlarından böl
        knowledges = knowledges.map(o => o.replace('\r','')); //Split'ten gelen \r eklentisini kaldırır

        for(var i=0; i<knowledges.length; i++) {
            if(i%2==0) {
                let clean = knowledges[i].trim();
                user.push(clean);
            }
            if(i%2==1) {
                let clean = knowledges[i].trim();
                pin.push(clean);
            }
        }
    };
    //Çıkan değerin olduğu satır sayısı tekse user'a çiftse pin'e atıyor
};
//File input'unda değişiklik olursa içeriği string ifadeye çevirip user ve pin dizilerine gönderiyor

function checkButton() {
    if(user.length==0||pin.length==0) {
        alert('Please first select file!');
    }
    else if(!username.value) {
        alert('Please enter username!');
    }
    else if(!password.value) {
        alert('Please enter password!');
    }
    else {
        correctLogin();
    }
};
//Butona basıldığında bilgilerin girilip girilmediğini kontrol ediyor

function correctLogin() {
    if((user.includes(username.value))&&(pin.includes(password.value))) {
        enterKnowledge(username.value,password.value);
    }
    else {
        alert('Username or password is wrong!');
    }
};
//Username ve password'ün eşleşme durumuna göre alert gönderiyor

function showPassword() {
    mouseOn = true;
    if((user.includes(username.value))&&(pin.includes(password.value))) {
        enterKnowledge(username.value,password.value);
    }
};

function hidePassword() {
    mouseOn = false;
    if((user.includes(username.value))&&(pin.includes(password.value))) {
        enterKnowledge(username.value,password.value);
    }
};

function enterKnowledge(username,password) {
    pUsername.innerHTML = "Username: ";
    pPassword.innerHTML = "Password: ";

    let secret;
    if(mouseOn) {
        secret = pPassword.innerText+' - ' + password;
    }
    //Mouse üzerine geldiği zaman şifreyi gösterir
    else {
        secret = pPassword.innerText+' - ' + password.substring(0,3) + '***';
    }

    pUsername.innerHTML =  pUsername.innerText +' - ' + username;

    pPassword.innerHTML = secret;

};