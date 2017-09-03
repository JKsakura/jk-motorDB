/* ---------- Create an array to store each Radio Input ---------- */
var radioItem = [];
radioItem[0] = document.getElementsByName("radioBox").item(0);
radioItem[1] = document.getElementsByName("radioBox").item(1);
/* ---------- PART A: My Own Database ---------- */
var orderTable = document.getElementById("orderTable");
var orderForm = document.getElementById("orderForm");
var insertRow = document.getElementById("insertRow");
var $orderForm = $("#orderForm");
var $insertRow = $("#insertRow");
var row = [];
var carOrder = [];

/* ---------- Create the CAR object ---------- */
function order(orderId, customerId, firstName, lastName, email, carId, carMake, carModel, carStyle, carYear, carColor, carPrice, carPicture) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.carId = carId;
    this.carMake = carMake;
    this.carModel = carModel;
    this.carStyle = carStyle;
    this.carYear = carYear;
    this.carColor = carColor;
    this.carPrice = carPrice;
    this.carPicture = carPicture;
}

/* ---------- Create Three default Datas ---------- */

function defaultData() {
    //localStorage.clear();
    if(localStorage.length === 0) {
        row[0] = new order(0, 0, "Jason", "Williams", "Williams.J@sample.com", 0, "BMW", "X1", "SUV", 2015, "black", 35000, "http://media.caranddriver.com/images/09q3/267589/2011-bmw-x1-review-car-and-driver-photo-290114-s-429x262.jpg");
        row[1] = new order(1, 1, "Kevin", "Durant", "Durant.K@sample.net", 1, "Honda", "Civic", "Sedan", 2015, "white", 20000, "http://automobiles.honda.com/images/2015/civic-si-sedan/configurations/base-cars/TW_si_34FRONT.png");
        row[2] = new order(2, 2, "Kobe", "Bryant", "kobebryant@sample.org", 2, "Audi", "Q5", "SUV", 2015, "red", 45000, "http://www.suvchronicles.com/wp-content/uploads/2015/09/Audi-Q5-2016-Front.jpeg");
        for(var i=0; i<3; i++) {
            setLocalStorage(i, row[i]);
            createOrder(row[i]);
        }
    }
    else {
        for(var i=0; i<localStorage.length; i++) {
            getLocalStorage(i);
        }
    }
}
/* ---------- LocalStorage ---------- */
function setLocalStorage(i, order) {
    //set the localstorage with the orderNum & order
    localStorage.setItem('carOrder' + i, JSON.stringify(order));
}


function getLocalStorage(i) {
    // Retrieve the object from localstorage
    row[i] = JSON.parse(localStorage.getItem('carOrder' + i));
    createOrder(row[i]);
}

/* ---------- This function is used to refresh the page if the user click the LOGO ---------- */
function resetPage() {
    location.reload();
}
/* ---------- Add the addOrder function to the form, when the user submit the form, do this function ---------- */
orderForm.addEventListener("submit", addOrder, false);
/* ---------- In the beginning, just hide the insertrow ---------- */
$insertRow.hide();
/* ---------- this function is used to insert a new row in html ---------- */

function createOrder(order) {
    iniCheckSearchRadio();
    //create a new tr element
    var newRow = document.createElement("tr");
    //insert the html content into the new tr element
    newRow.setAttribute("id", "row" + order.orderId);
    newRow.innerHTML = 
        "<td>" + order.firstName + "</td>"
        + "<td>" + order.lastName + "</td>"
        + "<td>" + order.email + "</td>" 
        + "<td>" + order.carMake + "</td>"
        + "<td>" + order.carModel + "</td>"
        + "<td>" + order.carStyle + "</td>"
        + "<td>" + order.carYear + "</td>"
        + "<td><div class=\"colorBox\" style=\"background:" + order.carColor + "\" id=\"color" + order.orderId + "\"></div></td>"
        + "<td id=\"price" + order.orderId + "\">$" + order.carPrice + "</td>"
        + "<td id=\"img" + order.orderId + "\"><img width=\"80px\" height=\"50px\" class=\"carPicture\" src=\"" + order.carPicture + "\"></td>"
        + "<td><input type=\"button\" class=\"deleteBtn\" value=\"DELETE\" id=\"delete" + order.orderId + "\"></td>";
    //insert this new Row before the Input row 
    //insertRow.parentElement.insertBefore(newRow, insertRow);
    $(newRow).hide().insertBefore($insertRow).fadeIn(500);
    //$insertRow.before(newRow).fadeIn(1000);
    //Create the deleteBtn and add the 'click' event to it
    var deleteBtn = document.getElementById("delete" + order.orderId);
    deleteBtn.addEventListener("click", deleteOrder, false);
    //reset the json to empty
    resetJson();
}

/* ---------- This function is used to add a new Object with the inputed value ---------- */
function addOrder(event) {
    event.preventDefault();
    //set i to the row's length
    i = row.length;
    //creathe a new order object and set the value to row[]
    row[i] = new order(i, i, orderForm.first.value, orderForm.last.value, orderForm.email.value, i, orderForm.make.value, orderForm.model.value, orderForm.style.value, orderForm.year.value, orderForm.color.value, orderForm.price.value, orderForm.picture.value);
    //create a new row with the value from row[]
    createOrder(row[i]);
    //save to the localstorage
    setLocalStorage(i, row[i]);
    //Testing
    //console.log(row[i].orderId);
    //console.log(row[i].customerId);
    orderForm.reset();
    //when add a new row, call this function to set the editable area
    checkRadio();
    //Testing the Add data
    //console.table(row);
}

/* ---------- This function is used to delete an order object ---------- */
function deleteOrder(event) {       
    $("#checkBox").show();   
    $("#checkButton").on('click', function() {
        $("#checkBox").hide();     
    //get the event.target
    var deleteButton = event.target;
    //get the target's id without the 'delete'
    var deleteNum = Number(deleteButton.id.slice(6));
    var deleteNode = deleteButton.parentElement.parentElement;
    //var deleteNode = deleteButton.parentElement.parentElement;
    //remove the whole row from the table
    $(deleteNode).fadeOut(500, function() {
        $(this).remove();
    });
    //reset the json to empty
    resetJson();
    //deleteNode.parentElement.removeChild(deleteNode);
    //if the row is removed, set the row after it to covered its value & id
    for(var i = deleteNum; i<row.length-1; i++) {
        //if the row is deleted, replaced it by the later one
        row[i] = row[i+1];
        row[i].orderId = i;
        row[i].customerId = i;
        row[i].carId = i;
        document.getElementById("delete" + (i + 1)).id = "delete" + i;
        document.getElementById("row" + (i + 1)).id = "row" + i;
        setLocalStorage(i, row[i]);
    }   
        //remove the last one from the row
        row.pop();
        localStorage.removeItem("carOrder" + (localStorage.length - 1));
        //row = row.slice(0, row.length-1);
        //console.table(row);
        //Testing row output
        //console.table(row);
        });   
    
    $("#noCheckButton").on('click', function(){
        $("#checkBox").hide();    
    });
}

/* ---------- This function is to edit the database ---------- */
function editOrder() {
    $(this).keypress(function(event){
        var x = event.which;
        //when the user press enter
        if(x == 13) {
            $(this).attr("contentEditable", "false");
            //console.log($(this).text());
            //console.log($(this).parent().attr("id"));
            //get the id of the row
            var editNum = Number($(this).parent().attr("id").slice(3));
            var editNode = document.getElementById("row" + editNum);
            //set the value to the row object
            row[editNum].firstName = $(editNode.getElementsByTagName("td")[0]).text();
            row[editNum].lastName = $(editNode.getElementsByTagName("td")[1]).text();
            row[editNum].email = $(editNode.getElementsByTagName("td")[2]).text();
            row[editNum].carMake = $(editNode.getElementsByTagName("td")[3]).text();
            row[editNum].carModel = $(editNode.getElementsByTagName("td")[4]).text();
            row[editNum].carStyle = $(editNode.getElementsByTagName("td")[5]).text();
            row[editNum].carYear = $(editNode.getElementsByTagName("td")[6]).text();
            row[editNum].carColor = $(editNode.getElementsByTagName("td")[7]).text();
            row[editNum].carPrice = $(editNode.getElementsByTagName("td")[8]).text().replace('$', '');
            row[editNum].carPicture = $(editNode.getElementsByTagName("td")[9]).text();
            if(editNode.getElementsByTagName("td")[7].textContent != '') {
            if(editNode.getElementsByTagName("td")[7].textContent == 'black') {
                editNode.getElementsByTagName("td")[7].textContent == '#000';
            }
            if(editNode.getElementsByTagName("td")[7].textContent == 'white') {
                editNode.getElementsByTagName("td")[7].textContent == '#fff';
            }
            //change the color box color according to the box content
            editNode.getElementsByTagName("td")[7].innerHTML = "<td><div class=\"colorBox\" style=\"background:" + editNode.getElementsByTagName("td")[7].textContent + "\"></div></td>";
            }
            //set the value to localstorage
            setLocalStorage(editNum, row[editNum]);
        }
    });
}


/* ---------- This function is to check which Radio Input is checked to see if to make the form editable or not ---------- */
function checkRadio() {
    //If the user selects the EDIT Radio Input, do this
    if(radioItem[1].checked == true) {
        $(document.getElementById("insertRow")).show();
        for(var i=0; i<row.length; i++) {
            rowTr = document.getElementById("row" + i);
            $(rowTr.getElementsByTagName("td")[10]).show();
            for(var j=0; j<10; j++) {
                    rowTd = rowTr.getElementsByTagName("td")[j];
                //the 8th column & 10th column are not editable
                    //set the rest column to editable
                if(j != 9) {
                        //add the active color to the cell
                        rowTd.contentEditable = true;
                        $(rowTd).on('mouseover', function(){
                            $(this).addClass("editActive");
                        });
                        //remove the active color from the cell
                        $(rowTd).on('mouseout', function(){
                            $(this).removeClass("editActive");
                        });
                        //change the contentEditable to true so that user can edit the content
                        $(rowTd).focus(editOrder);
                        $(rowTd).on('blur', function(){
                            $(this).attr("contentEditable", "true");
                        });
                        rowTd.style.cursor = "text";
                    }
                    //if the column are 7 or 9, don't allow to edit
                else if(j == 9) {
                    rowTd.contentEditable = false;
                    rowTd.style.cursor = "not-allowed";
                }
            }
        }
    }
    else if(radioItem[0].checked == true){
        $(document.getElementById("insertRow")).hide();
        for(var i=0; i<row.length; i++) {
                rowTr = document.getElementById("row" + i);
                $(rowTr.getElementsByTagName("td")[10]).hide();
                
            for(var j=0; j<10; j++) {
                    rowTd = rowTr.getElementsByTagName("td")[j];
                //the 8th column & 10th column are not editable
                    //set the rest column to editable
                    rowTd.contentEditable = false;
                    rowTd.style.cursor = "default";
            }
        }
    }
}

/* ---------- PART B: Search ---------- */
/* ---------- Set the global variables for all of the search functions ---------- */
var searchFlip = document.getElementById("searchFlip");
var searchRadio = document.getElementsByName("searchRadio");
var $clearBtn = $("#clearBtn");
/* ---------- gett the search text field & search button ---------- */
var searchField = document.getElementById("searchField");
var searchBtn = document.getElementById("searchBtn");
var $reslutBox = $("#resultBox");
/* ---------- add a click event to the search button, and calls the search function ---------- */
searchBtn.addEventListener('click', search, false);
$clearBtn.click(clearSearch);
/* ---------- this function is to transform the object to Json format ---------- */
function transformJson() {
    for(var i=0; i<row.length; i++) {
            carOrder[i] = {
                "OrderNum": row[i].orderId,
                "CustomerNum": row[i].customerId,
                "FirstName": row[i].firstName.toUpperCase(),
                "LastName": row[i].lastName.toUpperCase(),
                "Email": row[i].email.toUpperCase(),
                "CarNum": row[i].carId,
                "Make": row[i].carMake.toUpperCase(),
                "Model": row[i].carModel.toUpperCase(),
                "BodyStye": row[i].carStyle.toUpperCase(),
                "Year": row[i].carYear,
                "Color": row[i].carColor.toUpperCase(),
                "Price": row[i].carPrice,
                "CarPicture": row[i].carPicture,
            };
        }
}

/* ---------- LocalStorage ---------- */
if (window.localstorage) {
} 


/* ---------- everytime when there's some change for the row object, reset the json to empty ---------- */
function resetJson() {
    for(var i=0; i<carOrder.length; i++) {
        carOrder[i] = {};
        }
}

/* ---------- set the option panel for the user to select a searching field ---------- */
function iniCheckSearchRadio() {
    for(var i=0; i<searchRadio.length; i++) {
        if(searchRadio[i].checked == true ) {
            //Testing
            //console.log(searchRadio[i].value);
            searchFlip.value = searchRadio[i].value;
        }
    }
}

/* ---------- add the event to the search panel's radio button ---------- */
for(var i=0; i<searchRadio.length; i++) {
    searchRadio[i].addEventListener("click", checkSearchRadio, false);
}

function checkSearchRadio(event) {
    if(this.checked == true) {
        //Testing
        //console.log(this.value);
        searchFlip.value = this.value;
    }
}

/* ---------- Slide down the SearchPanel ---------- */

$(document).ready(function(){
    var $calculator = 0;
    var $downAarrow = $('#downAarrow');
    var $upAarrow = $('#upAarrow');
    $("#downAarrow").show();
    $("#upAarrow").hide();
    $("#searchFlip").click(function(){
        $("#searchPanel").slideToggle("fast");
        if($calculator == 0) {
            $("#downAarrow").hide();
            $("#upAarrow").show();
            $calculator++;
        }
        else {
            $("#downAarrow").show();
            $("#upAarrow").hide();
            $calculator = 0;
        }
    });
});
/* ---------- this function is used to set the default Event to Enter ---------- */
function searchEnter(event) {
    var x = event.which;
    if(x == 13 && searchField.value != '') {
        search();
    }
}

/* ---------- this function set the searchBar's value to empty if the mouse focus on the search text field ---------- */
function searchFocus() {
    var element = document.getElementById("searchField");
    if(element.value == 'Search') {
        element.value = "";
    }
}

/* ---------- this function sets the searchBar's value to Search if the mouse move out of the search text field ---------- */
function searchBlur() {
    var element = document.getElementById("searchField");
    if(element.value == '') {
        element.value = "Search";
    }
}

/* ---------- this function is used to clear the searching result ---------- */

function clearSearch() {
    //clear all the matching row
    if(carOrder.length > 0) {
        for(var i=1; i<carOrder.length+1; i++) {
            for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute("class", "none"); 
            }
        }
    }
    //Hide the Clear button
    $clearBtn.hide();
    //clear all the no result text
    $reslutBox.hide();
}

/* ---------- this function is used to search the according to the users' input content ---------- */
function search() {
    var searchContent = searchField.value;
    var searchRow;
    var searchNum;
    //clear all the no result text
    $reslutBox.hide();
    //Show the Clear button
    $clearBtn.show();
    //Call the function to transform the object into JSON format
    transformJson();
        //Testing 
        //console.table(carOrder[1]);
    
    //Output the table of the result from the Where function if _.where function is not empty
    //if there are matching result, hightlight the row
    if(searchRadio[0].checked == true) {
        if(_.where(carOrder,{"OrderNum": Number(searchContent)}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"OrderNum": Number(searchContent)}).length; i++) {
                searchRow = _.where(carOrder,{"OrderNum": Number(searchContent)})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }  
            console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
        }
        if(_.where(carOrder,{"CustomerNum": Number(searchContent)}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"CustomerNum": Number(searchContent)}).length; i++) {
                searchRow = _.where(carOrder,{"CustomerNum": Number(searchContent)})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"FirstName": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"FirstName": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"FirstName": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"LastName": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"LastName": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"LastName": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"Email": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Email": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Email": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"CarNum": Number(searchContent)}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"CarNum": Number(searchContent)}).length; i++) {
                searchRow = _.where(carOrder,{"CarNum": Number(searchContent)})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"Make": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Make": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Make": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"Model": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Model": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Model": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"BodyStye": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"BodyStye": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"BodyStye": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"Year": Number(searchContent)}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Year": Number(searchContent)}).length; i++) {
                searchRow = _.where(carOrder,{"Year": Number(searchContent)})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"Color": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Color": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Color": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"Price": Number(searchContent)}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Price": Number(searchContent)}).length; i++) {
                searchRow = _.where(carOrder,{"Price": Number(searchContent)})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
        if(_.where(carOrder,{"CarPictur": searchContent}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"CarPictur": searchContent}).length; i++) {
                searchRow = _.where(carOrder,{"CarPictur": searchContent})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[1].checked == true) {
        if(_.where(carOrder,{"FirstName": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"FirstName": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"FirstName": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[2].checked == true) {
        if(_.where(carOrder,{"LastName": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"LastName": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"LastName": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[3].checked == true) {
        if(_.where(carOrder,{"Email": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Email": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Email": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[4].checked == true) {
        if(_.where(carOrder,{"Make": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Make": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Make": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[5].checked == true) {
        if(_.where(carOrder,{"Model": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Model": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Model": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[6].checked == true) {
        if(_.where(carOrder,{"BodyStye": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"BodyStye": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"BodyStye": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[7].checked == true) {
        if(_.where(carOrder,{"Year": Number(searchContent)}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Year": Number(searchContent)}).length; i++) {
                searchRow = _.where(carOrder,{"Year": Number(searchContent)})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[8].checked == true) {
        if(_.where(carOrder,{"Color": searchContent.toUpperCase()}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Color": searchContent.toUpperCase()}).length; i++) {
                searchRow = _.where(carOrder,{"Color": searchContent.toUpperCase()})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[9].checked == true) {
        if(_.where(carOrder,{"Price": Number(searchContent)}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"Price": Number(searchContent)}).length; i++) {
                searchRow = _.where(carOrder,{"Price": Number(searchContent)})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    else if(searchRadio[9].checked == true) {
        if(_.where(carOrder,{"CarPictur": searchContent}).length > 0) {
            for(var i=0; i<_.where(carOrder,{"CarPictur": searchContent}).length; i++) {
                searchRow = _.where(carOrder,{"CarPictur": searchContent})[i].OrderNum;
                //console.table(_.where(carOrder,{"OrderNum": Number(searchContent)}));
                for(var j=0; j<10; j++) {
                document.getElementsByTagName("tr")[searchRow+1].getElementsByTagName("td")[j].setAttribute("class", "hightLight"); 
                }
            }
        }
    }
    //if all of the _.where function return empty, output no result
    if(_.where(carOrder,{"OrderNum": Number(searchContent)}).length == 0
       && _.where(carOrder,{"CustomerNum": Number(searchContent)}).length == 0
       && _.where(carOrder,{"FirstName": searchContent.toUpperCase()}).length == 0
       && _.where(carOrder,{"LastName": searchContent.toUpperCase()}).length == 0
       && _.where(carOrder,{"Email": searchContent.toUpperCase()}).length == 0
       && _.where(carOrder,{"CarNum": Number(searchContent)}).length == 0
       && _.where(carOrder,{"Make": searchContent.toUpperCase()}).length == 0
       && _.where(carOrder,{"Model": searchContent.toUpperCase()}).length == 0
       && _.where(carOrder,{"BodyStye": searchContent.toUpperCase()}).length == 0
       && _.where(carOrder,{"Year": Number(searchContent)}).length == 0
       && _.where(carOrder,{"Color": searchContent.toUpperCase()}).length == 0
       && _.where(carOrder,{"Price": Number(searchContent)}).length == 0
       && _.where(carOrder,{"CarPictur": searchContent}).length == 0
      ) {
        //show up the text of no result
        $reslutBox.show();
        $reslutBox.text('Sorry, no resutl!');
    }
}
/* ---------- search function end ---------- */