/* ---------- Create an array to store each Radio Input ---------- */
var radioItem = [];
radioItem[0] = document.getElementsByName("radioBox").item(0);
radioItem[1] = document.getElementsByName("radioBox").item(1);

/* ---------- PART A: My Own Database ---------- */
//Initial variables for the Database
var orderTable = document.getElementById("orderTable");
var orderForm = document.getElementById("orderForm");
var insertRow = document.getElementById("insertRow");
var $orderForm = $("#orderForm");
var $insertRow = $("#insertRow");
var row = [];
var carOrder = [];

/* ---------- Create the CAR object ---------- */
function order(orderId, firstName, lastName, email, carMake, carModel, carStyle, carYear, carColor, carPrice, carPicture) {
    this.orderId = orderId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.carMake = carMake;
    this.carModel = carModel;
    this.carStyle = carStyle;
    this.carYear = carYear;
    this.carColor = carColor;
    this.carPrice = carPrice;
    this.carPicture = carPicture;
}

/* ---------- Set up the default function ---------- */

$(document).ready(function(){
    defaultData();
    checkRadio();
    iniCheckSearchRadio();
});

/* ---------- Add the addOrder function to the form, when the user submit the form, do this function ---------- */
orderForm.addEventListener("submit", addOrder, false);

/* ---------- In the beginning, just hide the insertrow ---------- */
$insertRow.hide();

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
function clearStorage() {
    $("#checkBox").show(300);   
    $("#checkButton").on('click', function() {
        $("#checkBox").hide(); 
            localStorage.clear();
            location.reload();
        });
    
    $("#noCheckButton").on('click', function(){
        $("#checkBox").hide(300);    
    });
}

/* ---------- Create Three default Datas ---------- */
function defaultData() {
    if (localStorage.length == 0) {
        row[0] = new order(0, "Jason", "Williams", "Williams.J@sample.com", "BMW", "X1", "SUV", 2015, "black", 35000, "http://media.caranddriver.com/images/09q3/267589/2011-bmw-x1-review-car-and-driver-photo-290114-s-429x262.jpg");
        row[1] = new order(1, "Kevin", "Durant", "Durant.K@sample.net", "Honda", "Civic", "Sedan", 2015, "white", 20000, "http://automobiles.honda.com/images/2015/civic-si-sedan/configurations/base-cars/TW_si_34FRONT.png");
        row[2] = new order(2, "Kobe", "Bryant", "kobebryant@sample.org", "Audi", "Q5", "SUV", 2015, "red", 45000, "http://www.suvchronicles.com/wp-content/uploads/2015/09/Audi-Q5-2016-Front.jpeg");
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

/* ---------- this function is used to insert a new row in html ---------- */
function createOrder(order) {
    //create a new tr element
    var newRow = document.createElement("tr");
    //Create the deleteBtn and add the 'click' event to it
    var $deleteBtn;
    iniCheckSearchRadio();
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
        + "<td><div class=\"colorBox\" style=\"background:" + order.carColor + "\"></div></td>"
        + "<td id=\"price" + order.orderId + "\">$" + order.carPrice + "</td>"
        + "<td id=\"img" + order.orderId + "\"><img width=\"80px\" height=\"50px\" class=\"carPicture\" src=\"" + order.carPicture + "\"></td>"
        + "<td><input type=\"button\" class=\"deleteBtn\" value=\"DELETE\" id=\"delete" + order.orderId + "\"></td>";
    //insert this new Row before the Input row
    $(newRow).hide().insertBefore($insertRow).fadeIn(500);
    //Add the click event to the deleteButton
    $deleteBtn = $("#delete" + order.orderId);
    $deleteBtn.one("click", deleteOrder);
    //reset the json to empty
    resetJson();
}

/* ---------- This function is used to add a new Object with the inputed value ---------- */
function addOrder(event) {
    event.preventDefault();
    //set i to the row's length
    i = row.length;
    //creathe a new order object and set the value to row[]
    row[i] = new order(i, orderForm.first.value, orderForm.last.value, orderForm.email.value, orderForm.make.value, orderForm.model.value, orderForm.style.value, Number(orderForm.year.value), orderForm.color.value, Number(orderForm.price.value), orderForm.picture.value);
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
    //get the event.target
    var deleteButton = event.target;
    //get the target's id without the 'delete'
    var deleteNum = Number(deleteButton.id.slice(6));
    var deleteNode = deleteButton.parentElement.parentElement;
    //remove the whole row from the table
    $(deleteNode).fadeOut(500, function() {
        $(this).remove();
    });
    //reset the json to empty
    resetJson();
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
        localStorage.removeItem("carOrder" + (localStorage.length - 1));
        //remove the last one from the row
        row.pop();
        //Testing row output
        //console.table(row);
}

/* ---------- This function is to edit the database ---------- */
function editOrder() {
        var editNum;
        var editNode;
        var colorEdit;
    $(this).keypress(function(event){
        var x = event.which;
        //when the user press enter
        if(x == 13) {
            $(this).attr("contentEditable", "false");
            //get the id of the row
            editNum = Number($(this).parent().attr("id").slice(3));
            editNode = document.getElementById("row" + editNum);
            //set the value to the row object
            row[editNum].firstName = $(editNode.getElementsByTagName("td")[0]).text();
            row[editNum].lastName = $(editNode.getElementsByTagName("td")[1]).text();
            row[editNum].email = $(editNode.getElementsByTagName("td")[2]).text();
            row[editNum].carMake = $(editNode.getElementsByTagName("td")[3]).text();
            row[editNum].carModel = $(editNode.getElementsByTagName("td")[4]).text();
            row[editNum].carStyle = $(editNode.getElementsByTagName("td")[5]).text();
            row[editNum].carYear = Number($(editNode.getElementsByTagName("td")[6]).text());
            row[editNum].carPrice = Number($(editNode.getElementsByTagName("td")[8]).text().replace('$', ''));
            row[editNum].carPicture = $(editNode.getElementsByTagName("td")[9]).text();
            //change the color box color according to the box content
            colorEdit = editNode.getElementsByTagName("td")[7];
            if(this == colorEdit) {
                colorEdit.innerHTML = "<td><div class=\"colorBox\" style=\"background:" + colorEdit.textContent + "\"></div></td>";
                row[editNum].carColor = $(colorEdit).text();
            }
            //set the value to localstorage
            setLocalStorage(editNum, row[editNum]);
        }
    });
    $(this).blur(function(){
        //get the id of the row
        editNum = Number($(this).parent().attr("id").slice(3));
        editNode = document.getElementById("row" + editNum);
        //set the value to the row object
        row[editNum].firstName = $(editNode.getElementsByTagName("td")[0]).text();
        row[editNum].lastName = $(editNode.getElementsByTagName("td")[1]).text();
        row[editNum].email = $(editNode.getElementsByTagName("td")[2]).text();
        row[editNum].carMake = $(editNode.getElementsByTagName("td")[3]).text();
        row[editNum].carModel = $(editNode.getElementsByTagName("td")[4]).text();
        row[editNum].carStyle = $(editNode.getElementsByTagName("td")[5]).text();
        row[editNum].carYear = Number($(editNode.getElementsByTagName("td")[6]).text());
        row[editNum].carPrice = Number($(editNode.getElementsByTagName("td")[8]).text().replace('$', ''));
        row[editNum].carPicture = $(editNode.getElementsByTagName("td")[9]).text();
            //change the color box color according to the box content
            colorEdit = editNode.getElementsByTagName("td")[7];
            if(this == colorEdit) {
                colorEdit.innerHTML = "<td><div class=\"colorBox\" style=\"background:" + colorEdit.textContent + "\"></div></td>";
                row[editNum].carColor = $(colorEdit).text();
            }
        //set the value to localstorage
        setLocalStorage(editNum, row[editNum]);
    });
    //reset the json to empty
    resetJson();
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
var $resultBox = $("#resultBox");
/* ---------- add a click event to the search button, and calls the search function ---------- */
searchBtn.addEventListener('click', search, false);
$clearBtn.click(clearSearch);
/* ---------- this function is to transform the object to Json format ---------- */
function transformJson() {
    for(var i=0; i<row.length; i++) {
            carOrder[i] = {
                "OrderNum": row[i].orderId,
                "FirstName": row[i].firstName.toUpperCase(),
                "LastName": row[i].lastName.toUpperCase(),
                "Email": row[i].email.toUpperCase(),
                "Make": row[i].carMake.toUpperCase(),
                "Model": row[i].carModel.toUpperCase(),
                "BodyStye": row[i].carStyle.toUpperCase(),
                "Year": Number(row[i].carYear),
                "Color": row[i].carColor.toUpperCase(),
                "Price": row[i].carPrice,
                "CarPicture": row[i].carPicture,
            };
        }
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
    //initial the variables for the search bar
    var calculator = [];
    var $downArrow = $('#downArrow');
    var $upArrow = $('#upArrow');
    var $searchName = $(document.getElementsByName("searchRadio"));
    //clear all the no result text
    $resultBox.hide();
    $downArrow.show();
    $upArrow.hide();
    //Click the searchFlip and show the radio buttons
    $("#searchFlip").click(function(){
        //set a calculator for for showing or hiding searchFlip
        calculator.length = 0;
        $("#searchPanel").slideToggle("fast");
        if(calculator.length == 0) {
            $downArrow.toggle();
            $upArrow.toggle();
            calculator.length = 1;
        }
    });
    //Click other sections will hide the radio buttons
    $('body').click(function(e) {
        if(e.target.className != 'searchArea' && e.target.className != 'searchPanel') {
            calculator.length++;
            if(calculator.length == 3) {
                $("#searchPanel").slideUp("fast");
                $downArrow.show();
                $upArrow.hide();
                calculator.length = 0;
            }
        }
    });
});

/* ---------- this function is used to set the default Event to Enter ---------- */
function searchEnter(event) {
    //if the type is not input, the Enter default doesn't do anything
    $('body').keypress(function(event) { 
        if(event.target.nodeType != "input") {
        return event.keyCode != 13;
        }
    });
    //set the Enter default of the search
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
    //remover all the highlight when user calls search
    $('td').each(function() {
        $(this).removeClass("highLight");
        $(this).removeHighlight();
    });
    //Hide the Clear button
    $clearBtn.hide();
    //clear all the no result text
    $resultBox.hide();
}

/* ---------- This function is to search for the matching result and highlight the whole row ---------- */
function search() {
    //initial variables for the search funciton
    var searchContent = searchField.value;
    var searchRow;
    var searchNum;
    var searchOption;
    //hide the result before search
    $resultBox.hide();
    //show the clear button when it starts to search
    $clearBtn.show();
    //Call the function to transform the object into JSON format
    transformJson();
    //remover all the highlight when user calls search
    $('td').each(function() {
        $(this).removeClass("highLight");
        $(this).removeHighlight();
    });
    $('td').highlight_Str(searchContent); 
    //Set the searchOption according to the Radio button
    for(var i=0; i<searchRadio.length; i++) {
        if(searchRadio[i].checked == true) {
            searchOption = i;
        }
    }
    /* ---------- to search for the result according to the Radio button ---------- */
    //Search for the first name
    if(searchOption == 0 || searchOption == 1) {
        carOrder.first = $.grep(carOrder, function(element, index) {
            return element.FirstName == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.first);
    }
    //Search for the last name
    if(searchOption == 0 || searchOption == 2) {
        carOrder.last = $.grep(carOrder, function(element, index) {
            return element.LastName == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.last);
    }
    //Search for the email
    if(searchOption == 0 || searchOption == 3) {
        carOrder.email = $.grep(carOrder, function(element, index) {
            return element.Email == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.email);
    }
    //Search for the Car Make
    if(searchOption == 0 || searchOption == 4) {
        carOrder.make = $.grep(carOrder, function(element, index) {
            return element.Make == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.make);
    }
    //Search for the Car Model
    if(searchOption == 0 || searchOption == 5) {
        carOrder.model = $.grep(carOrder, function(element, index) {
            return element.Model == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.model);
    }
    //Search for the Body Style
    if(searchOption == 0 || searchOption == 6) {
        carOrder.style = $.grep(carOrder, function(element, index) {
            return element.BodyStye == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.style);
    }
    //Search for the Year
    if(searchOption == 0 || searchOption == 7) {
        carOrder.year = $.grep(carOrder, function(element, index) {
            return element.Year == searchContent;
        });
        highlight_Row(carOrder.year);
    }
    //Search for the Color
    if(searchOption == 0 || searchOption == 8) {
        carOrder.color = $.grep(carOrder, function(element, index) {
            return element.Color == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.color);
    }
    //Search for the price
    if(searchOption == 0 || searchOption == 9) {
        carOrder.price = $.grep(carOrder, function(element, index) {
            return element.Price == searchContent;
        });
        highlight_Row(carOrder.price);
    }
    //Search for the picture
    if(searchOption == 0 || searchOption == 10) {
        carOrder.picture = jQuery.grep(carOrder, function(element, index) {
            return element.CarPicture == searchContent.toUpperCase();
        });
        highlight_Row(carOrder.picture);
    }
    //If there is no matching result, shows the no result box
    switch(searchOption) {
        case 0:
        if(carOrder.first.length == 0
            && carOrder.last.length == 0
            && carOrder.email.length == 0
            && carOrder.make.length == 0
            && carOrder.model.length == 0
            && carOrder.style.length == 0
            && carOrder.year.length == 0
            && carOrder.color.length == 0
            && carOrder.price.length == 0
            && carOrder.picture.length == 0
          ) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 1:
            if(carOrder.first.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 2:
            if(carOrder.last.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 3:
            if(carOrder.email.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 4:
            if(carOrder.make.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 5:
            if(carOrder.model.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 6:
            if(carOrder.style.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 7:
            if(carOrder.year.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 8:
            if(carOrder.color.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 9:
            if(carOrder.price.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
        case 10:
            if(carOrder.picture.length == 0) {
            //show up the text of no result
            $resultBox.show();
            $resultBox.text('Sorry, no matching data!');
            }
            break;
    }
}
    
/* ---------- This function is to highlight the matchign row ---------- */
function highlight_Row(searchRow) {
    for(var i=0; i<searchRow.length; i++) {
        highlightRow = searchRow[i].OrderNum;
        for(var j=0; j<10; j++) {
            $("tr").eq(highlightRow+1).find("td").eq(j).attr("class", "highLight");
        }
    }
}

/* ---------- This function is refer from http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html ---------- */
/*
highlight v5
Highlights arbitrary terms.
<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
MIT license.
Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>
*/
$.fn.highlight_Str = function(pat) {
    function innerHighlight(node, pat) {
            var skip = 0;
            if(node.nodeType == 3) {
                var pos = node.data.toUpperCase().indexOf(pat);
                pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
                if(pos >= 0) {
                    var spannode = document.createElement('span');
                    $(spannode).attr("class", "highlight");
                    var middlebit = node.splitText(pos);
                    var endbit = middlebit.splitText(pat.length);
                    var middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            }
            else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    i += innerHighlight(node.childNodes[i], pat);
                }
            }
            return skip;
        }
        return this.length && pat && pat.length ? this.each(function() {
            innerHighlight(this, pat.toUpperCase());
        }) : this;
}

jQuery.fn.removeHighlight = function() {
    return this.find("span.highlight").each(function() {
    this.parentNode.firstChild.nodeName;
    with (this.parentNode) {
        replaceChild(this.firstChild, this);
        normalize();
    }
    }).end();
};