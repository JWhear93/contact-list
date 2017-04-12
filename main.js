////        make printable string for console readout, recursively
var make_printable_object = function(ar_use)
{
////        internal arguments
var in_tab = arguments[1];
var st_return = arguments[2];
////        default vales when applicable
if (!in_tab) in_tab = 0;
if (!st_return) st_return = "";
////        add depth
var st_tab = "";
for (var i=0; i < in_tab; i++) st_tab = st_tab+"-~-~-";

////        traverse given depth and build string
for (var key in ar_use)
{
    ////        gather return type
    var st_returnType = typeof ar_use[key];
    ////        get current depth display
    var st_returnPrime = st_tab+ "["+key+"] ->"+ar_use[key]+"< is {"+st_returnType+"}"+ '<br>';
    ////        remove linefeeds to avoid printout confusion
    
    ////        add line feed
    st_return = st_return+st_returnPrime+"\n";
    ////         stop at a depth of 15
    if (in_tab>15) return st_return;
    ////        if current value is an object call this function
    if ( (typeof ar_use[key] == "object") & (ar_use[key] != "null") & (ar_use[key] != null) ) st_return = make_printable_object(ar_use[key], in_tab+1, st_return);


}

////        return complete output
return st_return;

};
////		END

////    Console log to HTML
(function () {
    var old_logger = console.log;
    var html_logger = document.getElementById('html_logger');
    console.log = function(msg) {
      old_logger.call(this, arguments);
      if (typeof msg == 'object') {
        html_logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(msg) : msg) + '<br>';
      } else {
        html_logger.innerHTML += msg + '<br>';
      }
    }
})();
////        END

var friends = {};
friends.bill = {
    firstName: "Bill",
    lastName: "Bob",
    number: "123 123456",
    address: ['420 blaze it road','Blunt town','Chronicville']
};
friends.steve = {
    firstName: "Steve",
    lastName: "Sloane",
    number: "321 654321",
    address: ['420 blaze it road','Blunt town','Chronicville']
};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var list = function (obj) {
    for (var prop in obj) {        
        console.log(prop.capitalizeFirstLetter());
    }
};

var search = function(name) {
    for(var prop in friends) {
        if(friends[prop].firstName === name) {
            console.log( make_printable_object(friends[prop]));
            return friends[prop];
        }
    }
};



var myButton = document.querySelector('div > button#listButton');
myButton.onclick = function () {
    list(friends);
};

var otherButton = document.querySelector('div > button#searchButton');
otherButton.onclick = function() {
	var userInput = prompt("Search for a contact...").capitalizeFirstLetter();
    search(userInput);
};