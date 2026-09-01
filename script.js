

/*====================================================
        MOBILE NAVIGATION
=====================================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

    });


    /* Close menu after selecting a navigation link */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

        });

    });


    /* Close menu if the user clicks outside it */

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navLinks.classList.contains("show")
        ) {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

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