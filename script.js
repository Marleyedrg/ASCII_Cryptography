let messageElement = window.document.getElementById('message')
let btn = window.document.getElementById('btn')

messageElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Main();
    }
});

btn.addEventListener("click", Main);

function Main() {
    let messageElement = window.document.getElementById('message')
    let message = messageElement.value

    let hardKey = Number(7)//Used to make encryption more "hard" to interpret, just work well with number 

    let keyWordTag = 0137; //used to mark the position of commas in encryption 

    let prefix;//used to read ASCII, and after changed to a comma, receives the last 3 digits of the encryption plus `hardKey`

    if (message.length == '' || message.length == message.includes("\n")) {
        alert("much sort, do again.");
        messageElement.value = ''

    } else if (message.substring(0, 3) == String(Number(message.slice(-3)) + hardKey)) {

        //the last 3 digits of the encryption plus `hardKey`
        prefix = String(Number(message.slice(-3)) + hardKey)

        // change `prefix` to `prefix` to read the encrypted
        message = message.replace(prefix, ',')
        alert('decrypting the message...')
        encode();

    } else {
        if (message.length > 1054) {
            alert("much long, sorry I can't read it all. ");

        } else {
            alert('encrypting the message...')
            code();
            // If the first 3 characters of the message do not match with prefix, call the code function to encrypt the message
        }
    }

    function code() {
        let crypt = "";

        for (let i = 0; i < message.length; i++) {
            crypt += message.charCodeAt(i) * hardKey + ",";
        }

        //remove the last comma
        crypt = crypt.slice(0, -1);

        //replace commas to keyWordTag
        crypt = crypt.replace(/,/g, keyWordTag)

        crypt = 'prefix' + crypt


        prefix = String(Number(crypt.slice(-3)) + hardKey)
        //basically it takes the last encryption digits and plus `hardkey`

        crypt = crypt.replace("prefix", prefix)

        ChangeFontColorToPurple(messageElement, crypt)
        ChangeBtnColorToGreen()
    }

    function encode() {
        //replace keyWordTag to commas
        message = message.replace(new RegExp(keyWordTag, 'g'), ',');

        let crypt = "";

        let messageArray = message.split(",");
        for (let i = 1; i < messageArray.length; i++) {
            crypt += String.fromCharCode(messageArray[i] / hardKey);
        }

        ChangeFontColorToGreen(messageElement, crypt)
        ChangeBtnColorToPurple()
    }
}
function ChangeToDefault() {
    let messageElement = window.document.getElementById('message')

    messageElement.style.color = "rgb(209, 206, 206)";

    btn.style.backgroundColor = 'rgb(25, 25, 25)'
    btn.textContent = 'DO'
    btn.style.color = "white";

}

function ChangeFontColorToGreen(text, x) {
    text.style.color = "rgb(63, 238, 19)";
    text.value = (x);
}

function ChangeFontColorToPurple(text, x) {
    text.style.color = "rgb(171, 22, 240)";
    text.value = (x);
}

function ChangeBtnColorToGreen() {
    btn.style.backgroundColor = 'rgb(63, 238, 19)'
    btn.textContent = 'Decrypt'
    btn.style.color = "black";

}

function ChangeBtnColorToPurple() {
    btn.style.backgroundColor = 'rgb(171, 22, 240)'
    btn.textContent = 'encrypt'
    btn.style.color = "white";
}