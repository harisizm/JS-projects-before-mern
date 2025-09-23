//read code as : comments first code after

//DOM manipulation -document. methods:

// select input box by id
let input = document.getElementById("inputBox");

// query selector for selecting multiple elements at once
let buttons = document.querySelectorAll('button')

//empty string to store result
let string="";

//making array of all buttons
//passing buttons as variables
let arr = Array.from(buttons);

//loop for the array as loop cant be applied directly on buttons
//for each loops , executes once only

//arrow function:whenever button is clicked -> e is passed
//and whenever e is passed ,value should be in the input string.
//if condition for only if the clicked button is "equal"
//eval function : inbuilt javascript maths function for evaluating expressions.
//finally storing the value in input

// and if input is not "equal button", then the values will be continuously stored and shown in the input field
arr.forEach(button =>{
  button.addEventListener('click',(e)=>{
    if(e.target.innerHTML == '='){
      string=eval(string);
      input.value= string;
    }
//targeting 'all clear' button 
    else if(e.target.innerHTML=='AC'){
      string="";
      //showing the empty value in input tag :
      input.value=string;
    }
//targeting the delete button
    else if (e.target.innerHTML== 'DEL'){
//using substring function nd taking length to delete the most recent digit
      string=string.substring(0,string.length-1)
      input.value=string;
    }

    else{string+=e.target.innerHTML;
    input.value=string;}
    
  })
})

