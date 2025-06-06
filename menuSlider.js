function toggleModal() {
    const signupCard = document.querySelector('.signup');
    signupCard.style.display = "block";
}

const crossbutton = document.querySelector('.crosssign');
crossbutton.addEventListener('click', () => {
    document.querySelector('.signup').style.display = "none";

});

function toggleMenu() {
    const menubutt = document.querySelector(".menubutton");
    const menuIcon = document.querySelector(".fa-bars");

    menubutt.classList.toggle("active");

    if (menubutt.classList.contains("active")) {
        menuIcon.style.marginLeft = "20%";
    } else {
        menuIcon.style.marginLeft = "20px";
    }
}
