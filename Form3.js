let URL1 = "https://jsonplaceholder.typicode.com/posts/1";
let URL2 = "https://jsonplaceholder.typicode.com/comments";
let URL3 = "https://jsonplaceholder.typicode.com/albums";



// const deletedata = async () => {
//     try {
//         let response = await fetch(URL1, {
//             method: 'DELETE',
//         });

//          if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("success:", data);
//     } catch (error) {
//         console.log("Something went wrong:", error.message);
//     }
// };
// deletedata();



// ---> Patch

// const patchEditData = async () => {
//     try {
//         let response = await fetch(URL1, {
//             method: 'PATCH',
//             headers: { 
//                 'Content-Type': 'application/json;charset=UTF-8'
//             },
//             body: JSON.stringify({
//                 title: 'foo',
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("success:", data);
//     } catch (error) {
//         console.log("Something went wrong:", error.message);
//     }
// };
// patchEditData();



// ---> put 
// const putUpdateData = async () => {
//     try {
//         let response = await fetch(URL1, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json;charset=UTF-8'
//             },
//             body: JSON.stringify({
//                 id: 1,           
//                 title: 'foo',
//                 body: 'bar',
//                 userId: 1
//             })
//         });
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Success:", data);
//     } catch (error) {
//         console.log("Something went wrong:", error.message);
//     }
// };

// putSomeUpdateData();


// ---> Using try...catch in an async function

// const postNewData = async () => {
//     try {
//         const response = await fetch(URL1, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json; charset=UTF-8'
//             },
//             body: JSON.stringify({
//                 title: 'foo',
//                 body: 'bar',
//                 userId: 1
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Success:", data);
//     } catch (error) {
//         console.error("Something went wrong:", error.message);
//     }
// };

// postNewData();





//--->  Using .catch() with Promises

// const postNewData = () => {
//     fetch(URL1, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8'
//         },
//         body: JSON.stringify({
//             title: 'foo',
//             body: 'bar',
//             userId: 1
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Success:", data);
//     })
//     .catch(error => {
//         console.error("Error occurred:", error);
//     });
// };

// postNewData();


// ---> simple POST --> Create new data	, Add a new post

// const postNewData = async () => {
//     let response = await fetch(URL1, {
//         method: 'POST',
//         header: {
//             'content-type': 'application/json;charset=UFT-8',
//         },
//         body: JSON.stringify({
//             title: 'foo',
//             body: 'bar',
//             userId: 1
//         })
//     });

//     let data = await response.json();
//     console.log(data);
// };

// postNewData();






// // --> Get the from URL1
// const changeInData= async() => {

//     let response=await fetch(URL1);
//     let data=await response.json();
//     console.log(data);

//     data.forEach(i => {
//         //console.log(i. userId);
//         console.log(i. userId, i.title);
//     });

// };

// changeInData();


// -- > Fetch a single post with ID = 1
// const getPostById = async (id) => {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//     const data = await response.json();
//     console.log(data);
// };

// getPostById(1);





//-->

const getDataFromURL1And2 = async () => {
    console.log("Getting Data From URL 1...");
    let response1 = await fetch(URL1);
    let data1 = await response1.json();
    console.log(data1);


    console.log("Getting Data From URL 2...");
    let response2 = await fetch(URL2);
    let data2 = await response2.json();
    console.log(data2);

};


const getDataFromURL3 = async() =>{
    console.log("Getting Data Frome URL 3 ...");
    let response3=await fetch(URL3);
    let data3= await response3.json();
    console.log(data3);
}


const getData= async() => {
    getDataFromURL1And2();
    getDataFromURL3();
}




// const getDataFromURL1 = async() =>{
//     console.log("Getting Data Frome URL 1 ...");
//     let response1=await fetch(URL1);
//     let data1= await response1.json();
//     console.log(data1);
// }

// const getDataFromURL2 = async()=>{
//     console.log("Getting Data From URL 2 ...");
//     let response2 = await fetch(URL2);
//     let data2 = await response2.json();
//     console.log(data2);
// }

// const getDataFromURL3 = async()=>{
//     console.log("Getting Data From URL 3 ...");
//     let response3 = await fetch(URL3);
//     let data3 = await response3.json();
//     console.log(data3);
// }
// getDataFromURL1();
// getDataFromURL2();
// getDataFromURL3();




//--> Data is Fetch one after Another
const getFacts = async () => {
    console.log("Getting Data From URL 1...");
    let response1 = await fetch(URL1);
    let data1 = await response1.json();
    console.log(data1);

    console.log("Getting Data From URL 2...");
    let response2 = await fetch(URL2);
    let data2 = await response2.json();
    console.log(data2);

    console.log("Getting Data From URL 3...")
    let response3 = await fetch(URL3);
    let data3 = await response3.json();
    console.log(data3);
};
getFacts();











// function asyncFunc(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log("data1");
//             reject("Reject");
//         },4000);
//     });
// }


// console.log("Data is Featching...");
// let p1 = asyncFunc();
// // p1.then((res)=>{
// //     console.log(res);
// // });
// p1.catch((err)=>{
//     console.log(err);
// });


// function getData(dataId,getDataValue){
//     setTimeout(()=>{
//         console.log("Data",dataId);

//         if(getDataValue){
//             getDataValue();
//         }
//     },3000);
// }


// getData(1,()=>{
//     console.log("Data is Featching for data 2...");
//     getData(2,()=>{
//         console.log("Data is feateched from data 3...");
//         getData(3);
//     });
// });