//////////////////////////////////////////
//Elements
const getElementsById = id => document.getElementById(id);
const getElementsByClass = className => document.getElementsByClassName(className);

const submitBtn = getElementsById("submit");
const cardField = getElementsById('cardNumbers');
const cardImages = getElementsByClass('card');
//////////////////////////////////////////
//Cards
//Amex Card: ^3[47][0-9]{13}$
//Mastercard: ^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$
//Visa Card: ^4[0-9]{12}(?:[0-9]{3})?$
const rules = {
    amex: /^3[47][0-9]{13}$/,
    master: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/
};
//////////////////////////////////////////
submitBtn.addEventListener("click", getCardType);
function getCardType(val) {
    val = cardField;

    if (rules.amex.test(val.value)) {
        cardImages.amex.classList.remove('hidden');
        cardImages.amex.classList.add('active');
    }
    if (rules.visa.test(val.value)) {
        cardImages.visa.classList.remove('hidden');
        cardImages.visa.classList.add('active');
    }
    if (rules.master.test(val.value)) {
        cardImages.master.classList.remove('hidden');
        cardImages.master.classList.add('active');
    }
}
cardField.addEventListener("change", luhnCheck);

//////////////////////////////////////////
// // // //Luhn check
function luhnCheck (num) {
    num = cardField.value;
    let digit, digits, j, len, odd, sum;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (j = 0, len = digits.length; j < len; j++) {
        digit = digits[j];
        digit = parseInt(digit, 10);
        if ((odd = !odd)) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    console.log(sum);
    if(!(sum % 10 === 0)){
        cardField.focus();

    }
}
    //TODO has to get true or false and return something in html if false!!
    // console.log!(sum % 10 === 0)
// takes the form field value and returns true on valid number
// function creditCardCheck (value) {
//     value = cardField.value;
//     // accept only digits, dashes or spaces
//     if (/[^0-9-\s]+/.test(value)) return false;
//
//     // The Luhn Algorithm. It's so pretty.
//     let nCheck = 0, nDigit = 0, bEven = false;
//     value = value.replace(/\D/g, "");
//
//     for (let n = value.length - 1; n >= 0; n--) {
//         let cDigit = value.charAt(n),
//             nDigit = parseInt(cDigit, 10);
//
//         if (bEven) {
//             if ((nDigit *= 2) > 9) nDigit -= 9;
//         }
//
//         nCheck += nDigit;
//         bEven = !bEven;
//     }
//     console.log(nCheck);
//     return (nCheck % 10) === 0;
// }
// cardField.addEventListener("input", input_credit_card);
// function input_credit_card (input){
//     input = cardField;
//     var format_and_pos = function(char, backspace)
//     {
//         var start = 0;
//         var end = 0;
//         var pos = 0;
//         var separator = " ";
//         var value = input.value;
//
//         if (char !== false)
//         {
//             start = input.selectionStart;
//             end = input.selectionEnd;
//
//             if (backspace && start > 0) // handle backspace onkeydown
//             {
//                 start--;
//
//                 if (value[start] == separator)
//                 { start--; }
//             }
//             // To be able to replace the selection if there is one
//             value = value.substring(0, start) + char + value.substring(end);
//
//             pos = start + char.length; // caret position
//         }
//
//         var d = 0; // digit count
//         var dd = 0; // total
//         var gi = 0; // group index
//         var newV = "";
//         var groups = /^\D*3[47]/.test(value) ? // check for American Express
//             [4, 6, 5] : [4, 4, 4, 4];
//
//         for (var i = 0; i < value.length; i++)
//         {
//             if (/\D/.test(value[i]))
//             {
//                 if (start > i)
//                 { pos--; }
//             }
//             else
//             {
//                 if (d === groups[gi])
//                 {
//                     newV += separator;
//                     d = 0;
//                     gi++;
//
//                     if (start >= i)
//                     { pos++; }
//                 }
//                 newV += value[i];
//                 d++;
//                 dd++;
//             }
//             if (d === groups[gi] && groups.length === gi + 1) // max length
//             { break; }
//         }
//         input.value = newV;
//
//         if (char !== false)
//         { input.setSelectionRange(pos, pos); }
//     };
//
//     input.addEventListener('keypress', function(e)
//     {
//         var code = e.charCode || e.keyCode || e.which;
//
//         // Check for tab and arrow keys (needed in Firefox)
//         if (code !== 9 && (code < 37 || code > 40) &&
//             // and CTRL+C / CTRL+V
//             !(e.ctrlKey && (code === 99 || code === 118)))
//         {
//             e.preventDefault();
//
//             var char = String.fromCharCode(code);
//
//             // if the character is non-digit
//             // OR
//             // if the value already contains 15/16 digits and there is no selection
//             // -> return false (the character is not inserted)
//
//             if (/\D/.test(char) || (this.selectionStart === this.selectionEnd &&
//                 this.value.replace(/\D/g, '').length >=
//                 (/^\D*3[47]/.test(this.value) ? 15 : 16))) // 15 digits if Amex
//             {
//                 return false;
//             }
//             format_and_pos(char);
//         }
//     });
//
//     // backspace doesn't fire the keypress event
//     input.addEventListener('keydown', function(e)
//     {
//         if (e.keyCode === 8 || e.keyCode === 46) // backspace or delete
//         {
//             e.preventDefault();
//             format_and_pos('', this.selectionStart === this.selectionEnd);
//         }
//     });
//
//     input.addEventListener('paste', function()
//     {
//         // A timeout is needed to get the new value pasted
//         setTimeout(function(){ format_and_pos(''); }, 50);
//     });
//
//     input.addEventListener('blur', function()
//     {
//         // reformat onblur just in case (optional)
//         format_and_pos(this, false);
//     });
// };
//
// input_credit_card(document.getElementById('cardNumbers'));