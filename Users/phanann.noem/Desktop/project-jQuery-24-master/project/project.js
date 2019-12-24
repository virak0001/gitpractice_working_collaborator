function getUrl(){
    var url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
// how to get value or use value for get option 
$(document).ready(function(){
    requestApi();
    $('#select').on('change', ()=>{
        var selected = $('#select').val();
        getRecipe(selected);
    });
    //When we clcik on button add
    $('#add').on('click', function(){
        add();
        //declear for catch or select option from id
        var selected = $('#select').val();
        //get value when user click
        var increment = $('#member').val();
        updateRecipe(selected, increment)
    })
    //when we click on button minus
    $('#minus').on('click', function(){
        minus();
        var selecte = $('#select').val();
        var decrement = $('#member').val();
        updateRecipe(selecte, decrement);
    })
})
//Request API 
function requestApi(){
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Error"),
    });
}
//selete all value in recipe or when we need choose option
var GetData = [];
function chooseRecipe(recipe){
    GetData = recipe;
    var option = "";
    recipe.forEach(item => {
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $('#select').append(option);
    //For hide if we want see. we can select on option
    $('#allMember').hide();
    $('#ingredient').hide();
    $('#show-instruction').hide();
    $('#ruler').hide();
}
//For show name, image of food near step
function getRecipe(id){
    GetData.forEach(item => {
        if(item.id == id){
            showRecipe(item.name, item.iconUrl);
            showIngredient(item.ingredients);
            showInstructions(item.instructions);
            //catch member from id(member)
            $('#member').val(item.nbGuests);
            Member = $('#member').val();
        } 
    })
}
//For show name , image on Number of persons or under option choose 
function showRecipe(name, img){
    var result = "";
      result += `
        <tr>
            <td> ${name}</td>
            <td> <img src="${img}" class="img-fluid" width="200px"></td>
        </tr>
    `;
    $('#table-result').html(result);
    $('#allMember').show();
}
//For show name, image, old value of show name, image near step
function showIngredient(ing){
    var store = "";
    ing.forEach(item => {
      store +=`
        <tr>
            <td> <img src="${item.iconUrl}" width="50px"></td>
            <td> ${item.quantity}</td>
            <td> ${item.unit[0]}</td>
            <td> ${item.name}</td>
        </tr>

    `;
})
$('#ingredient-result').html(store);
$('#ingredient').show();
$('#ruler').show();
}
//New value for show name, image near step when we click on button add or minus 
var updateDate=(ing ,increment)=>{
    resultUpdate = "";
    ing.forEach(item =>{
        //item.quantity =  old value// parsetInt(increment) = new member // Member = new member 
       
        var addIngredient = item.quantity * parseInt(increment) / Member;
        console.log(item.quantity);
        resultUpdate+= `
        <tr>
            <td> <img src="${item.iconUrl}" class="img-fluid" width="50px"> </td>
            <td> ${addIngredient}</td>
            <td> ${item.unit[0]} </td>
            <td> ${item.name} </td>
        </tr>
        `; 
    })
    $('#ingredient-result').html(resultUpdate);
}
//How to catch split 
function showInstructions(instructioned){
      var storeInstructions = "";
      var catchsplit = instructioned.split("<step>");
      for(let i = 1; i<catchsplit.length; i++){
          storeInstructions += `
            <p class="text-primary">Step${i}</p>
            <p>${catchsplit[i]}</p>
          `;
          $('#instruction').html(storeInstructions);
          $('#show-instruction').show();
      }
}
// update recipe of add
var updateRecipe = (ricipeId,increment) => {
    GetData.forEach(item => {
        if(item.id == ricipeId){
            updateDate(item.ingredients, increment);
            $("#members").val(increment);
        }
    })
}
//How to get value of add when click on button. 
function add(){
    var displayadd = $('#member').val();
    var displayadd = parseInt(displayadd) + 1;
    if(displayadd <= 15){
       $("#member").val(displayadd);
    }
}
//How to get value of minus when click
function minus(){
    var displayminus = $('#member').val();
    var displayminus = parseInt(displayminus) - 1;
    if(displayminus >= 0){
    $("#member").val(displayminus);
    }
}