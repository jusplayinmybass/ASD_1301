// Author: Myron Carroll
// Title: Assignment 1 JavaScript
// Class: Advanced Scalable Data Infrastructures

// Wait until the DOM is Ready
$('#start').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#studentInfo');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
                //The actual JSON Object data required for this to work is coming form our json.js file which is loaded form the HTML page
            //Store JSON Object into Local Storage
            for(var n in json){
                var id = Math.floor(Math.random()*100000001);
                localStorage.setItem(id, JSON.stringify(json[n]));
            }
        }
        //Create Edit and Delete links for each stored item when displayed
        function makeItemLinks(key, linksLi ){
            //Add edit single item link
            var editLink = document.createElement('a');
            editLink.href= '#';
            editLink.key = key;
            var editText = "Edit Contact";
            editLink.addEventListener('click', editItem);
            editLink.innerHTML = editText;
            linksLi.appendChild(editLink);
          
            //Add Line Break
            var breakTag = document.createElement('br');
            linksLi.appendChild(breakTag);
            
            //Add Delete Single Item Link
            var deleteLink = document.createElement('a');
            deleteLink.href = '#';
            deleteLink.key = key;
            var deleteText = "Delete Contact";
            deleteLink.addEventListener('click', deleteItem);
            deleteLink.innerHTML = deleteText;
            linksLi.appendChild(deleteLink);
            
            
        };
	 


var getData = function(){
                toggleControls("on");
            if(localStorage.length === 0){
                alert("There is no Data In Local Storage so Default Data Was Added!");
                autoFillData();
            };
          //Write Data from local storage to the browser
          var makeDiv = document.createElement('div');
          makeDiv.setAttribute('id', 'items');
          var makeList = document.createElement('ul');
          makeDiv.appendChild(makeList);
          document.body.appendChild(makeDiv);
          ge('items').style.display = "display"; 
          for(var i=0, j=localStorage.length; i<j; i++){
            var makeLi = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value); //Convert string from localStorage back into an object with JSON.parse.
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList);
            getImage(obj.instrument[1], makeSubList);
            for (var n in obj){
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            
            makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete buttons for each item in Local Storage
            
          }
          
            
          
        }
        //Get the image for the right category
        function getImage(catName, makeSubList){
            var imageLi = document.createElement('li');
            makeSubList.appendChild(imageLi);
            var newImg = document.createElement('img');
            var setSrc = newImg.setAttribute("src", "images/"+ catName +".jpg");
            imageLi.appendChild(newImg);
        }



var storeData = function(data){
                //If there is no key, this means this is a brand new item and we need a new key.
        if(!key){
            var id = Math.floor(Math.random()*100000001);
        }else{
            //Set the id to the existing key that we are editing so it will save over the data
            //Same key that was passed from editSubmit event handler
            //to the validate function and then passed here, into the storeData function.
            id = key;
            
        }
        //Gather up all form field values in an object
        //Object contains an array that contains form label and input value
        getCheckedBoxValues();
           var item            = {};
            item.fname      = ["First Name:", ge('fname').value];
            item.lname      = ["Last Name:", ge('lname').value];
            item.email      = ["Email:", ge('email').value];
            item.birth      = ["Birthday:", ge('birth').value];
            item.instrument      = ["Instrument:", ge('instrument').value]; 
            item.reading     = ["Sight Read:", readValue];
            item.other      = ["Other:", ge('other').value];
            item.time       = ["Time:", ge('time').value];
        //Save the data into Local Storage. Use Stringify to convert object to string
        localStorage.setItem(id, JSON.stringify(item)); 
        alert("Contact Saved!");
	
}; 

var	deleteItem = function (){
                var ask = confirm("Are You Sure You Want To Delete This Contact?");
            if(ask){
                localStorage.removeItem(this.key);
                window.location.reload();
            }else{
                alert("Contact Was NOT Deleted.");
            }
			
};
					
var clearLocal = function(){
                if (localStorage.length ===0){
                alert("There is no Data to Clear!");
            } else {
                localStorage.clear();
                alert("All Contacts are Deleted!");
                window.location.reload();
                return false;
            }

};


