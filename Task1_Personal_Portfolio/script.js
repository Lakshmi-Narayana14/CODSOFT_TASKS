// Mobile Navigation Menu

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Contact Form Validation

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e){

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if(name === "" || email === "" || message === ""){
        e.preventDefault();
        alert("Please fill all the fields.");
    }
    else{
        alert("Message Sent Successfully!");
    }

});
const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you! Your message has been received.");
    form.reset();
});