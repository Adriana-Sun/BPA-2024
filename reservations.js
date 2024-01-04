const alertElement = document.getElementById("alert");
const submitButtons = document.querySelectorAll("input[type='submit']");

submitButtons.forEach(button => {
    // adding an event listener to each "submit" button
    // that checks if the associated form has all required fields filled out
    button.addEventListener("click", (e) => {
    
    let allAreFilled = true;    // assume fields are filled out by default
        button.parentElement.querySelectorAll("[required]").forEach(function(i) {
        if(!allAreFilled) return;   // if one of the prev required fields is empty, just return so as to not waste time
        
        if(!i.value) 
            allAreFilled = false;  // if there is no value, then the required field is not filled
        
        if(i.tagName.toLowerCase() === "select"){
            if(i.value === "select") 
                allAreFilled = false;
        }
        });
        
        if(!allAreFilled) return;

        alertElement.style.opacity = '1';
        setInterval(() => alertElement.style.opacity = '0', 3500);
    });
});

var selector = document.getElementById("editFields");
console.log(selector.value);
if(document.body.contains(selector)){

}