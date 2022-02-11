const display = document.querySelector('.display');

const number = document.querySelectorAll('.number')

number.forEach((button) => {
    button.addEventListener('click', operatorHesap)
})

const operator = document.querySelectorAll('.operator')


var SyntaxError = false
function operatorHesap(event) {
    var buttonValue = event.target.value
    if ((!isNaN(buttonValue)) || (".+-*/".includes(buttonValue))) {     
        
        ekle(buttonValue)
    }
    else if (buttonValue == '=') {
        sonuc() 
    }
    else if (buttonValue == "C") {
        sil() 
    }
    else if (buttonValue == "AC") {
        temizle() 
    }
}



operator.forEach((button) => {
    button.addEventListener('click', operatorHesap)
})

function ekle(num) {
    
    if (SyntaxError) {
        temizle();
    }
    
    if (display.value.length < 20   ) {
        if (isNaN(num)) {
            
            if ("+-*/%.".includes(display.value[display.value.length - 1])) {
                sil();
            }
            display.value += num;
        }
        else if (display.value.length == 1 && display.value[0] == 0) {
            display.value = num
        }
        /*else if ("=".includes(display.value[display.value.length==1])) {
            sonuc();
            display.value += num;}*/
            

        else {
            display.value += num
        }
    }
    else {
        return
    }
}
function temizle() {    
    SyntaxError = false
    display.value = "0";
}

const diziAyır = (veri) => {
    let operator = [],
        number = [];
    let isPrevNumber = true,
        current = "";
    for (let i = 0; i < veri.length; i++) {
        if (!isNaN(veri[i]) || veri[i] == ".") {
            if (isPrevNumber) {
                current += veri[i];                
            }
             else {
                number.push(current);
                current = veri[i];
            }
            isPrevNumber = true;
        } else {
            operator.push(veri[i]);
            isPrevNumber = false;
        }
    }
    number.push(current);
    number = number.map(Number);

    return { numArray: number, opArray: operator };
};

const sonucGuncelle = (result, number, operator) => {
    operator.splice(index, 1);
    number.splice(index, 2, result);
};
let index = 0;

const hesapla = (veri) => {
    let ilksayı = 0, ikincisayı = 0, result = display.value;
    let ayır = diziAyır(veri);
    let number = ayır.numArray;
    let operator = ayır.opArray;
    while (operator.length) {
        if (operator.includes("/")) {
            index = operator.indexOf("/");
            ilksayı = number[index];
            ikincisayı = number[index + 1];            
            result = ilksayı / ikincisayı;
           
            sonucGuncelle(result, number, operator);
        } else if (operator.includes("*")) {
            index = operator.indexOf("*");
            ilksayı = number[index];
            ikincisayı = number[index + 1];
            result = ilksayı * ikincisayı;
            sonucGuncelle(result, number, operator);
        } else if (operator.includes("+")) {
            index = operator.indexOf("+");
            ilksayı = number[index];
            ikincisayı = number[index + 1];
            result = ilksayı + ikincisayı;
            sonucGuncelle(result, number, operator);
        } else if (operator.includes("-")) {
            index = operator.indexOf("-");
            ilksayı = number[index];
            ikincisayı = number[index + 1];
            result = ilksayı - ikincisayı;
            sonucGuncelle(result, number, operator);
        }
            
        
       
    }
    return result;
};
function sonuc() {
    
if(!isNaN(display.value[display.value.length-1])){
    
    var veri = display.value
    var answer = hesapla(veri);   
   

    if (isFinite(answer)) {
        if(display.value.includes(".")){
            display.value = answer.toFixed(3);
        }
        else{
            display.value = answer
        }
        
        
       
        
    }
    else {
        display.value = "Sıfıra bölünemez" 
        SyntaxError = true
    }

}

}
function sil() {    
    if (SyntaxError) {
        return
    }
    display.value = display.value.substring(0, display.value.length - 1)//substring: (Bir dizenin,string ifadenin belli bir bölümünü çıkarır ve yeni bir dize, string ifade oluşturur.
    if (display.value == "") {
        display.value = "0"
    }
}

