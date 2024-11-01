// ــــــــــــــــــــــــGet-NPUTSــــــــــــــــــ
let downlistCate = document.querySelector("#downlistCate");
let category = document.querySelector("#category");
let Product = document.querySelector("#Product");
let quntity = document.querySelector("#quntity");
let Price = document.querySelector("#Price");
let Descount = document.querySelector("#Descount");
let Total = document.querySelector("#Total");

let CategoryArray; 
let ProductArray;
let btnupdates= "creat";
let proID;
localStorage.category != null? CategoryArray = JSON.parse(localStorage.category) :CategoryArray=[];
localStorage.Product != null? ProductArray = JSON.parse(localStorage.Product) :ProductArray=[];

// ــــــــــــــــــــــــCategoryــــــــــــــــــ
// ــــSave-Category:-
 function SaveCategory(){
    let objCategory={
        category: category.value
    };
 CategoryArray.push(objCategory);
 localStorage.setItem("category",JSON.stringify(CategoryArray));
 Reset();
 ShowCategory();
 ShowTableCategory();
 CountCategory();
}

// --------------------------------
// ـــReset-Category:-
function Reset(){
category.value= " ";

}

// --------------------------------
// ـــShow-Data:-
 function ShowCategory(){
    let item=" ";
    item +=`<option value="">Select Category.........</option>`
    for(let i = 0; i < CategoryArray.length; i++)
    {
        item += `<option value="${i}" >${CategoryArray[i].category}</option> `
    }
    downlistCate.innerHTML= item;
 }

// --------------------------------
//ـــShow-Table-Category:-
function ShowTableCategory() {

 let Table = "";
 for(let i = 0; i < CategoryArray.length; i++)
    {
        Table += `
        <tr>
            <td>${i}</td>
            <td>${CategoryArray[i].category}</td>
            <td>
            <div onclick="DeleteCategory(${i})"> 
            <i class="fa-solid fa-delete-left fa-fade fa-lg" style="color: #ee1111;"></i>
             </div>

            </td>               
        </tr>
        `;
    }
 document.querySelector("#bodyCategory").innerHTML = Table;

}

// --------------------------------
// ــــDelet-Category:-
function DeleteCategory(id){
    if(confirm(`Are You Sure Deleted...?`) == true){
        CategoryArray.splice(id, 1);
        localStorage.category = JSON.stringify(CategoryArray);
        ShowTableCategory();
        ShowCategory();
        CountCategory();
    }
}

// ---------------------------------
//ــــCount-Category:-
 function CountCategory(){
    document.querySelector("#CountCategory").innerHTML =`-Total Category(${CategoryArray.length})`;
 }

// ---------------------------------
// ـــValidation-Category:-
function validatCategory(){
    let valid = true;
    if(category.value == " "){
        alert("Pleas,Enter Name Category...");
        valid= false;
    }else{

        SaveCategory();
        valid= true;
    }

 return valid;

}

/////////////////////////////////////////////////////////////////////////////
// ــــــــــــــــــــــــPRODUCTSــــــــــــــــــ
// ــــCount-Total-Product:-
// 

function GetTotal() {
    if (Price.value != 0) {
        let totalValue = (quntity.value * Price.value) - Descount.value;
        Total.value = totalValue;
        Total.className.replace ="form-control bg-danger text-center";
        Total.className= "form-control bg-success text-center";
    } else {
        Total.value = 0;
        Total.className.replace ="form-control bg-success text-center";
        Total.className= "form-control bg-danger text-center";
    }
}

// -------------------------------
 // ــــSave-Product:-
 function SaveProduct() {
    let NewProduct = {
        downlistCate: downlistCate.options[downlistCate.selectedIndex].text, // للحصول على اسم الفئة من القائمة المنسدلة
        Product: Product.value,
        quntity: quntity.value,
        Price: Price.value,
        Descount: Descount.value,
        Total: Total.value
    };
    if(btnupdates==="creat"){
        ProductArray.push(NewProduct);

    }else{
        ProductArray[proID] = NewProduct;
        document.getElementById("btnSave").className.replace= 'btn btn-warning w-25';
        document.getElementById("btnSave").className= 'btn btn-success w-25';

    }

    localStorage.setItem("Product", JSON.stringify(ProductArray));
    ResetData();
    showTableProduct();
    CountProduct();
    GetTotal()
 }

// -------------------------------
 // ـــReset-Data:-
 function ResetData(){
    downlistCate.options[downlistCate.selectedIndex].text="Select Category.........";
    Product.value="";
    quntity.value=0;
    Price.value=0;
    Descount.value=0;
    Total.value=0;
 }

// -------------------------------
//ـــShow-Data-in Table:-

 function showTableProduct(){
    let TablePro =" ";
    //عليها  loop عشان اظهر حاجة لازم اعمل  
    for(let x = 0; x < ProductArray.length ; x++){
        TablePro +=`
          <tr>
                 <td>${x}</td>
                 <td>${ProductArray[x].downlistCate}</td>
                 <td>${ProductArray[x].Product}</td>
                 <td>${ProductArray[x].quntity}</td>
                 <td>${ProductArray[x].Price}</td>
                 <td>${ProductArray[x].Descount}</td>
                 <td>${ProductArray[x].Total}</td>
                 <td>
                    <button class="btn btn-info"onclick="EditProduct(${x})"> <i class="fa-solid fa-pen-to-square fa-lg ro" style="color: #2fac5d;"></i> </button>
                    <button class="btn btn-danger"onclick="DeleteProdct(${x})" > <i class="fa-solid fa-trash-can" style="color: #de1b4c;"> </i></button>
                 </td>
                 
             </tr>
        `;

    }

document.getElementById('tablepro').innerHTML = TablePro;
 }

// -------------------------------
//ـــDelete-Product:-
function DeleteProdct(id){
if(confirm ("Are You Sure Deleted")==true){
ProductArray.splice(id,1);
localStorage.Product = JSON.stringify(ProductArray);
showTableProduct();
CountProduct();
}

}

// -------------------------------
//ـــEdit-Product:-

function EditProduct(id){
downlistCate.options[downlistCate.selectedIndex].text = ProductArray[id].downlistCate;
Product.value = ProductArray[id].Product;
quntity.value= ProductArray[id].quntity;
Price.value = ProductArray[id].Price;
Descount.value =ProductArray[id].Descount;
Total.value = ProductArray[id].Total;
btnupdates ="Edit";
proID= id;
document.getElementById("btnSave").className.replace= 'btn btn-success w-25';
document.getElementById("btnSave").className= 'btn btn-warning w-25';
}

// -------------------------------
//ــــCount-Product:-

function CountProduct(){
    document.getElementById('countPro').innerHTML=`Total(${ProductArray.length})`;
}

// -------------------------------
// ـــValidation-Product:-
 function validationpro(){
 let drobcate = document.getElementById('drobcate');
 let lbpro = document.getElementById('lbpro');
 let lbquntity = document.getElementById('lbquntity');
 let lbPrice = document.getElementById('lbPrice');

 let valid = true;

 if(downlistCate.options [downlistCate.selectedIndex].text == 'Select Category.........'){
    drobcate.innerHTML='Category :*[Required]';
    drobcate.style.color = 'red';
    valid = false;
 {


 } }else{
    drobcate.innerHTML='Category :*';
    drobcate.style.color = 'white';
    let valid = true;
 }
 // -------
 
 if(Product.value == '' ){
    lbpro.innerHTML ='(Product Name):[Required]' ;
    lbpro.style.color = 'red';
    valid = false;
 {
 
 } }else{
     lbpro.innerHTML='(Product Name)' ;
     lbpro.style.color = 'white';
     valid = true;
    }
// -------
    if(quntity.value == 0 ){
        lbquntity.innerHTML ='(Quntity):[Required]' ;
        lbquntity.style.color = 'red';
        valid = false;
    {

    } }else{
        lbquntity.innerHTML='(Quntity):' ;
        lbquntity.style.color = 'white';
        valid = true;
    }

 //--------
 if(Price.value == 0 ){
    lbPrice.innerHTML ='(Price):[Required]' ;
    lbPrice.style.color = 'red';
    valid = false;
 {

 } }else{
    lbPrice.innerHTML='(Price):' ;
    lbPrice.style.color = 'white';
    valid = true;
 SaveProduct();

}

if(downlistCate.options[downlistCate.selectedIndex] .text != ''
     && Product.value != '' && quntity.value !=0 && price.value !=0){

        SaveProduct();
     }

return valid;
}

// ــــــــــــــData-Table-Designـــــــــ
$(document).ready(function(){
    ShowCategory();
    ShowTableCategory();
    CountCategory();
    showTableProduct();
    CountProduct();
 $("#tablePro").DataTable();
});




