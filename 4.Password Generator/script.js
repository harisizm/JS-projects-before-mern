//dom :

let inputSlider= document.getElementById("inputSlider");
//slider value for showing the value
let sliderValue = document.getElementById("sliderValue");

//accessing all other required elements
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");

//cuz we want input slider value in slider value
sliderValue.textContent = inputSlider.value;

//add event to change slider value when moving
inputSlider.addEventListener('input',()=>{
  sliderValue.textContent = inputSlider.value;
})

//event , whenever gen btn clicked a function is executed :
genBtn.addEventListener('click', ()=>{
  //passbox gets a value from generate pass
    passBox.value = generatePassword();
})

// storing fixed values
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*"; 
 
// Function to generate Password
function generatePassword(){
  //string to store generated password:
    let genPassword = "";
    let allChars = "";

//conditions to check which checkbox of required is selected by user
    allChars  += lowercase.checked ? lowerChars : "";
    allChars  += uppercase.checked ? upperChars : "";
    allChars  += numbers.checked ? allNumbers : "";
    allChars  += symbols.checked ? allSymbols : "";

    if(allChars == "" || allChars.length == 0){
        return genPassword;
    }
    
//loop to store full password length given by input slider
    let i = 1;
    while(i<=inputSlider.value){

      //math random func generates a random value b/w 0 and 1 
      //math.floor to get non-decimal value
      //char at function for random character
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }
    return genPassword;
}

//event , when copy icon clicked
copyIcon.addEventListener('click', ()=>{
  //condition: dont copy empty password
    if(passBox.value != "" || passBox.value.length >=1){

      //this to copy password to clipboard:
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";
      //to change the icon back to previous one after set time 
        setTimeout(()=>{
          //do the following
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
//3000 milisecond
        }, 3000)
    }
});
