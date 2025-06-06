const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
const orderedPage= [page1,page2,page3];

const r1 = document.querySelector('#r1');
const r2 = document.querySelector('#r2');
const r3 = document.querySelector('#r3');
const orderedRod=[r1,r2,r3];


h
function displayNextPage(pageIndex){
    orderedPage[pageIndex - 1].style.display = 'none';
    orderedPage[pageIndex].style.display = 'block';
}

function displayPreviousPage(pageChange){
    orderedPage[pageChange].style.display = 'none';
    orderedPage[pageChange - 1].style.display = 'block';
}

function displayNewPage(pageIndex){
    orderedPage[pageIndex].style.display='none';
    orderedPage[pageIndex - 2].style.display = 'block';
}


function setToLocalStorage(currentPage){
    const formData = new FormData(currentPage);
    const dataObj = {};
    for (const [name, value] of formData) {
        dataObj[name] = value;
    }
    localStorage.setItem("formData", JSON.stringify(dataObj));

    fetchData(formData);
}

function fetchData(){
    var formget = JSON.parse(localStorage.getItem('formData')) || [];
    var formresult = document.querySelector('.page');

    formresult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var  = bookmarks[i].name;
        var  = bookmarks[i].url;
}


function rodColorFillNextPage(rodIndex){
    orderedRod[rodIndex].style.width='50%';
    orderedRod[rodIndex-1].style.width='100%';
}

function rodColorFillPreviousPage(rodIndex){
    orderedRod[rodIndex].style.width='0%';
    orderedRod[rodIndex-1].style.width='50%';
}


page1.addEventListener('submit', (e) => {
    e.preventDefault();
    setToLocalStorage(page1);
    displayNextPage(1);
    rodColorFillNextPage(1);
});

document.querySelector('.page2 .back').addEventListener('click', (e) => {
    e.preventDefault();
    displayPreviousPage(1);
    rodColorFillPreviousPage(1);
});

page2.addEventListener('submit', (e) => {
    e.preventDefault();
    setToLocalStorage(page2);
    displayNextPage(2);
    rodColorFillNextPage(2);
});

document.querySelector('.page3 .back').addEventListener('click', (e) => {
    e.preventDefault();
    displayPreviousPage(2);
    rodColorFillPreviousPage(2);
});

page3.addEventListener('submit', (e) => {
    e.preventDefault();
    setToLocalStorage(page3);
    alert("Successfully submitted!");
    displayNewPage(2);

    
});




// page2.querySelector('.back input').addEventListener('click', function (e) {
//     page2.style.display = 'none';
//     page1.style.display = 'block';
//     r1.style.width='50%';
// });

// page2.querySelector('.submit input').addEventListener('click', function (e) {
//     e.preventDefault();
//     page2.style.display = 'none';
//     page3.style.display = 'block';
//     r1.style.width='100%';
//     r2.style.width='100%';
// });

// page3.querySelector('.back input').addEventListener('click', function (e) {
//     e.preventDefault();
//     page3.style.display = 'none';
//     page2.style.display = 'block';
//     r1.style.width='100%';
//     r2.style.width='50%';
//     r1.style.width='100%';
// });

// page3.querySelector('.submit input').addEventListener('click', function (e) {
//     e.preventDefault();
//     //querySelector('.page3 .submit').textContent="Submitting..";

//     confirm(`${cityValue1} ${cityValue2}`);

//     alert("Form submitted successfully!");
// });