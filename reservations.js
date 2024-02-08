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
        
        if(!allAreFilled){
            setInterval(() => button.classList.add("invalidSubmitAnimation"), 200);
            button.classList.remove("invalidSubmitAnimation");
            return;
        }

        // if user is making a reservation, then give them a reservation ID after they complete it
        if(button.parentElement.className === "inputForm"){
            var resIdNotif = document.querySelector(".resIdNotif");
            var resId = resIdNotif.querySelector("span");
            resId.innerText = generateID();
            resIdNotif.style.display = "block";
        }

        button.addEventListener("click", () => {
            // displaying the "success!" alert
            alertElement.style.display = 'block';
            setTimeout(function(){
                alertElement.style.opacity = '1';
            }, 100);
    
            // hide alert after 3.5 seconds
            setInterval(() => {
                alertElement.style.opacity = '0';
                setTimeout(function(){
                    alertElement.style.display = 'none';
                }, 600)
                
            }, 3500);
        });
    });
});

function generateID() { 
    return ("" + Math.random()).substring(2, 8);
} 

var selector = document.getElementById("editFields");
// upon the user changing the value of the selector
selector.onchange = function() {
    var selectorVal = selector.value;

    // if it is not the basic (default) "select an option" value
    if(selectorVal != "select"){
        var text = selector.options[selector.selectedIndex].text;

        // if the element exists, then edit its text and type
        if(document.querySelector(".edit")){
            let editDiv = document.querySelector(".edit");
            let editLabel = editDiv.querySelector("label");
            editLabel.innerText = text;
            let editInput = editDiv.querySelector("input");
            editInput.setAttribute("type", selector.options[selector.selectedIndex].getAttribute("data-type"));
        }

        // if element does not exist, create it
        else{
            let frag = new DocumentFragment();
            let editDiv = document.createElement("div");
            editDiv.classList.add("edit");
            let editLabel = document.createElement("label");
            editLabel.setAttribute("for", "editTo");
            editLabel.innerText = text;
            let editInput = document.createElement("input");
            editInput.setAttribute("aria-required", "true");
            editInput.required = true;
            editInput.id = "editTo";
            
            // changing input type based on what was selected
            editInput.setAttribute("type", selector.options[selector.selectedIndex].getAttribute("data-type")); // by default, it will have type "text"

            editDiv.appendChild(editLabel);
            editDiv.appendChild(editInput);
            frag.appendChild(editDiv);

            let editForm = document.querySelector(".editForm");
            let submitBtn = submitButtons[2];   // get the last submit button (which would correspond to "editForm")
            editForm.insertBefore(frag, submitBtn); // insert the element before the submit button
        }
    }
    // if the user changes it back to the default "Select an option" value
    else{
        // and if div exists
        if(document.querySelector(".edit")){
            // remove the div
            let editDiv = document.querySelector(".edit");
            editDiv.remove();
        }
    }
};