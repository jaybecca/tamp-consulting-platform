/*====================================================
        MOBILE NAVIGATION
=====================================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    const menuIcon = menuToggle.querySelector("i");

    function closeMenu() {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        if (menuIcon) {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        }
    }

    function openMenu() {
        navLinks.classList.add("show");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        if (menuIcon) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
        }
    }

    menuToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen =
            navLinks.classList.contains("show");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    /* Close menu after selecting a navigation link */

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    /* Close menu when clicking outside it */

    document.addEventListener("click", function (event) {
        if (
            navLinks.classList.contains("show") &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    /* Reset mobile menu when returning to desktop */

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

}


const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.pageYOffset > 300){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// Automatically update copyright year

document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
});




    /*==============================================
            INPUT FOCUS EFFECT
    ==============================================*/

    const inputs = document.querySelectorAll(

        ".contact-form input, .contact-form textarea, .contact-form select"

    );

    inputs.forEach((input) => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("active");

        });

        input.addEventListener("blur", () => {

            if (input.value.trim() === "") {

                input.parentElement.classList.remove("active");

            }

        });

    });


    
const form = document.getElementById("form");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const submitBtn = form.querySelector(".contact-btn");

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const formData = new FormData(form);

    try{

        const response = await fetch(form.action,{
            method:"POST",
            body:formData
        });

        const result = await response.json();

        if(result.success){

            alert("Message sent successfully!");

            form.reset();

        }else{

            alert(result.message);

        }

    }catch(error){

        alert("Something went wrong.");

    }

    submitBtn.disabled = false;
    submitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> Send Message';

});







const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const timer = setInterval(()=>{

                current += Math.ceil(target / 100);

                if(current >= target){

                    counter.textContent = target;

                    clearInterval(timer);

                }else{

                    counter.textContent = current;

                }

            },20);

            observer.unobserve(counter);

        }

    });

});

counters.forEach(counter=>observer.observe(counter));