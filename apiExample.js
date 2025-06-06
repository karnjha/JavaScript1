let BASE_URL = "https://683fd9375b39a8039a55d7c4.mockapi.io/api/v1/postmaster/posts";
let showPost = document.querySelector('.showPost');
let createPost = document.querySelector('.createPost');
let editPost = document.querySelector('.editPost');
let comment = document.querySelector('.comment');
let spost = document.querySelector('.spost');
let hom = document.querySelector('#home');
let cret = document.querySelector('#cre');

const deletePost = async (id) => {
    try {
        let response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await getData();
    } catch (error) {
        console.error("Something went wrong:", error.message);
    }
};

function edit_Post(title, description, id) {
    showPost.style.display = 'none';
    editPost.style.display = 'block';
    comment.style.display = 'none';
    document.querySelector('.t1').value = title;
    document.querySelector('.b1').value = description;

    document.querySelector('#edit').addEventListener('submit', async (e) => {
        e.preventDefault();
        let createPostForm = document.querySelector("#edit");
        let formData = new FormData(createPostForm);
        let dataObj = {};
        for (const [name, value] of formData) {
            dataObj[name] = value;
        }
        await editChangePost(dataObj, id);
        document.querySelector('#eb1').innerHTML = "Loading...";
        await getData();
        showPost.style.display = 'block';
        editPost.style.display = 'none';
        comment.style.display = 'none';
    });
}

const editChangePost = async (payload, id) => {
    try {
        let response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title: payload.title,
                description: payload.body
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error("Something went wrong:", error.message);
    }
};

const commentPostToApi = async (commentsContainer, payload, id) => {
    try {
        let response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                postComments: {
                    name: payload.Name,
                    comment: payload.Comment
                }
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Something went wrong:", error.message);
    }
};

function comment_Post(commentsContainer, id) {
    showPost.style.display = 'none';
    comment.style.display = 'block';

    const commentForm = document.querySelector('.createCommentt');

    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let formData = new FormData(commentForm);
        let dataObj = {};
        for (const [name, value] of formData) {
            dataObj[name] = value;
        }

        await commentPostToApi(commentsContainer, dataObj, id);
        document.querySelector('.postCommentButt').innerHTML = "Loading...";
        await getData();
        goToHome();
        commentForm.reset();
    });
}
// let arrButton=[];
// let cButton;
// let eButton;
// let dButton;

const getData = async () => {
    try {
        let response = await fetch(BASE_URL);
        let data = await response.json();

        spost.innerHTML = "";
        let arr = data.slice(1, 11);

        for (let i = 0; i < data?.length - 1; i++) {
            let isMode = true;
            let div1 = document.createElement('div');
            div1.style.border = '1px solid white';
            div1.style.margin = '10px';
            div1.style.padding = '10px';
            div1.style.backgroundColor = 'blue';
            div1.style.color = 'white';

            let titleDiv = document.createElement('div');
            titleDiv.textContent = `Title: ${arr[i].title}`;

            let bodyDiv = document.createElement('div');
            bodyDiv.textContent = `Body: ${arr[i].description}`;

            let cButton = document.createElement('button');
            cButton.textContent = 'Comment';
            cButton.className = 'myButton';
            cButton.style.margin = '5px';

            let eButton = document.createElement('button');
            eButton.textContent = 'Post Edit';
            eButton.className = 'myButton';
            eButton.style.margin = '5px';

            let dButton = document.createElement('button');
            dButton.textContent = 'Delete';
            dButton.className = 'myButton';
            dButton.style.margin = '5px';

            let commentsContainer = document.createElement('div');
            commentsContainer.className = 'comments-container';
            commentsContainer.style.marginTop = '10px';
            commentsContainer.style.paddingLeft = '10px';


            if (isMode) {
                dButton.addEventListener('click', () => {
                    deletePost(`${arr[i].id}`);
                    isMode = false;
                    cButton.style.pointerEvents = 'none';
                    cButton.style.opacity = '0.5';
                    eButton.style.pointerEvents = 'none';
                    eButton.style.opacity = '0.5';
                    dButton.innerHTML = "Loading...";
                });
            }

            if (isMode) {
                cButton.addEventListener('click', () => {
                    comment_Post(commentsContainer, `${arr[i].id}`);
                    isMode = false;
                    eButton.style.pointerEvents = 'none';
                    eButton.style.opacity = '0.5';
                    dButton.style.pointerEvents = 'none';
                    dButton.style.opacity = '0.5';
                    cButton.innerHTML = "Loading...";
                });
            }

            if (isMode) {
                eButton.addEventListener('click', () => {
                    edit_Post(`${arr[i].title}`, `${arr[i].description}`, `${arr[i].id}`);
                    isMode = false;
                    cButton.style.pointerEvents = 'none';
                    cButton.style.opacity = '0.5';
                    dButton.style.pointerEvents = 'none';
                    dButton.style.opacity = '0.5';
                    eButton.innerHTML = "Loading...";
                });

            }

            div1.appendChild(titleDiv);
            div1.appendChild(bodyDiv);
            div1.appendChild(cButton);
            div1.appendChild(eButton);
            div1.appendChild(dButton);
            div1.appendChild(commentsContainer);

            if (arr[i].postComments && arr[i].postComments.name && arr[i].postComments.comment) {
                let commentDiv = document.createElement('div');
                commentDiv.textContent = `Name: ${arr[i].postComments.name}, Comment: ${arr[i].postComments.comment}`;
                commentDiv.style.color = 'white';
                commentDiv.style.marginTop = '5px';
                commentsContainer.appendChild(commentDiv);
            }

            spost.appendChild(div1);
        }
        // arrButton.push("cButton");
        // arrButton.push("eButton");
        // arrButton.push("dButton");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Something went wrong:", error.message);
    }
};

function systemStart() {
    let div = document.createElement('div');
    spost.appendChild(div);
    getData();
}

systemStart();

function goToHome() {
    showPost.style.display = 'block';
    createPost.style.display = 'none';
    editPost.style.display = 'none';
    comment.style.display = 'none';
}



function createPostFunction() {
    showPost.style.display = 'none';
    createPost.style.display = 'block';
    editPost.style.display = 'none';
    comment.style.display = 'none';
}

// console.log(arrButton);
function homeFunction() {
    goToHome();
    // window.location.reload();


    // cButton.style.pointerEvents = 'auto';
    // cButton.style.opacity = '1';
    // eButton.style.pointerEvents = 'auto';
    // eButton.style.opacity = '1';
    // eButton.innerHTML = "Edit";
    // dButton.style.pointerEvents = 'auto';
    // dButton.style.opacity = '1';
    // dButton.innerHTML = "Delete";
    // cButton.innerHTML = "Comment";


    // arrButton[0].style.pointerEvents = 'auto';
    // arrButton[0].style.opacity = '1';
    // arrButton[1].style.pointerEvents = 'auto';
    // arrButton[1].style.opacity = '1';
    // arrButton[1].innerHTML = "Edit";
    // arrButton[2].style.pointerEvents = 'auto';
    // arrButton[2].style.opacity = '1';
    // arrButton[2].innerHTML = "Delete";
    // arrButton[0].innerHTML ="Comment";
}



const postData = async (payload) => {
    try {
        let response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title: payload.title,
                description: payload.body
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error("Something went wrong:", error.message);
    }
};

document.querySelector("#createPostForm").addEventListener('submit', async (e) => {
    e.preventDefault();
    const createPostForm = document.getElementById("createPostForm");
    const formData = new FormData(createPostForm);
    const dataObj = {};
    for (const [name, value] of formData) {
        dataObj[name] = value;
    }
    document.querySelector('.btt1').innerHTML = "Loading...";
    await postData(dataObj);
    await getData();
    goToHome();
    e.target.reset();
});
