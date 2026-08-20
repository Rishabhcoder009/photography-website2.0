/* =========================================================
   YOUR STUDIO — PHOTOGRAPHY & VIDEOGRAPHY WEBSITE
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });


    /*
        Close mobile menu when clicking a navigation link.
    */

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


/* =========================================================
   02. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {

    if (!menuToggle || !navLinks) {
        return;
    }


    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("active");

    }

});


/* =========================================================
   03. PORTFOLIO FILTER
   ========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");


if (
    filterButtons.length > 0 &&
    portfolioItems.length > 0
) {

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {


            /* -------------------------
               Remove active state
            ------------------------- */

            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });


            /* -------------------------
               Activate clicked button
            ------------------------- */

            button.classList.add("active");


            const selectedCategory =
                button.dataset.filter;


            /* -------------------------
               Filter items
            ------------------------- */

            portfolioItems.forEach((item) => {

                const itemCategory =
                    item.dataset.category;


                if (
                    selectedCategory === "all" ||
                    itemCategory === selectedCategory
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });

}


/* =========================================================
   04. PORTFOLIO LIGHTBOX
   ========================================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxContent =
    document.getElementById("lightbox-content");

const lightboxClose =
    document.getElementById("lightbox-close");

const lightboxPrev =
    document.getElementById("lightbox-prev");

const lightboxNext =
    document.getElementById("lightbox-next");


let currentPortfolioIndex = 0;


/*
    We only want portfolio items that actually
    contain something that can be opened.
*/

const lightboxItems =
    Array.from(portfolioItems);


/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

function openLightbox(index) {

    if (
        !lightbox ||
        !lightboxContent ||
        !lightboxItems[index]
    ) {

        return;

    }


    currentPortfolioIndex = index;


    const item =
        lightboxItems[currentPortfolioIndex];


    const image =
        item.querySelector("img");


    const video =
        item.querySelector("video");


    lightboxContent.innerHTML = "";


    /* -------------------------
       Image
    ------------------------- */

    if (image) {

        const newImage =
            document.createElement("img");


        newImage.src = image.src;

        newImage.alt =
            image.alt || "Portfolio photograph";


        lightboxContent.appendChild(newImage);

    }


    /* -------------------------
       Video
    ------------------------- */

    else if (video) {

        const newVideo =
            document.createElement("video");


        newVideo.src = video.currentSrc || video.src;

        newVideo.controls = true;

        newVideo.autoplay = true;

        newVideo.playsInline = true;


        lightboxContent.appendChild(newVideo);

    }


    lightbox.classList.add("active");


    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove("active");


    document.body.style.overflow = "";


    if (lightboxContent) {

        lightboxContent.innerHTML = "";

    }

}


/* =========================================================
   PORTFOLIO ITEM CLICK
   ========================================================= */

portfolioItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* =========================================================
   LIGHTBOX CLOSE BUTTON
   ========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* =========================================================
   CLOSE LIGHTBOX BY CLICKING BACKGROUND
   ========================================================= */

if (lightbox) {

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


/* =========================================================
   PREVIOUS PORTFOLIO ITEM
   ========================================================= */

function showPreviousItem() {

    if (lightboxItems.length === 0) {
        return;
    }


    currentPortfolioIndex--;


    if (currentPortfolioIndex < 0) {

        currentPortfolioIndex =
            lightboxItems.length - 1;

    }


    openLightbox(currentPortfolioIndex);

}


/* =========================================================
   NEXT PORTFOLIO ITEM
   ========================================================= */

function showNextItem() {

    if (lightboxItems.length === 0) {
        return;
    }


    currentPortfolioIndex++;


    if (
        currentPortfolioIndex >=
        lightboxItems.length
    ) {

        currentPortfolioIndex = 0;

    }


    openLightbox(currentPortfolioIndex);

}


/* =========================================================
   LIGHTBOX NAVIGATION BUTTONS
   ========================================================= */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        showPreviousItem
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        showNextItem
    );

}


/* =========================================================
   05. KEYBOARD LIGHTBOX CONTROLS
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (
        !lightbox ||
        !lightbox.classList.contains("active")
    ) {

        return;

    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowLeft") {

        showPreviousItem();

    }


    if (event.key === "ArrowRight") {

        showNextItem();

    }

});


/* =========================================================
   06. SCROLL REVEAL ANIMATION
   ========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".service-card, " +
        ".featured-item, " +
        ".approach-card, " +
        ".why-item, " +
        ".process-item, " +
        ".service-detail-content, " +
        ".about-content"
    );


if (
    animatedElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const animationObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "fade-up",
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach((element) => {

        animationObserver.observe(element);

    });

}


/* =========================================================
   07. BOOKING DATE — PREVENT PAST DATES
   ========================================================= */

const shootDate =
    document.getElementById("shoot-date");


if (shootDate) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const todayFormatted =
        `${year}-${month}-${day}`;


    shootDate.min =
        todayFormatted;

}


/* =========================================================
   08. EMAILJS — BOOKING / ENQUIRY FORM
   ========================================================= */


/*
    IMPORTANT
    ---------------------------------------------------------
    Replace these three values with your actual EmailJS
    credentials.
*/

const EMAILJS_PUBLIC_KEY =
    "Zng7wZGiCvG7Piegf";

const EMAILJS_SERVICE_ID =
    "service_j3ipb3q";

const EMAILJS_TEMPLATE_ID =
   "template_riu2wir";


/* =========================================================
   INITIALIZE EMAILJS
   ========================================================= */

if (
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
) {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

}


/* =========================================================
   BOOKING FORM
   ========================================================= */

const bookingForm =
    document.getElementById(
        "booking-form-element"
    );


const formStatus =
    document.getElementById(
        "form-status"
    );


const submitButton =
    bookingForm
        ? bookingForm.querySelector(
            'button[type="submit"]'
        )
        : null;


/* =========================================================
   FORM SUBMISSION
   ========================================================= */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* -------------------------
               Basic validation
            ------------------------- */

            if (!bookingForm.checkValidity()) {

                bookingForm.reportValidity();

                return;

            }


            /* -------------------------
               Make sure EmailJS exists
            ------------------------- */

            if (
                typeof emailjs === "undefined"
            ) {

                showFormStatus(
                    "Email service could not be loaded. Please try again later.",
                    "error"
                );

                return;

            }


            /* -------------------------
               Loading state
            ------------------------- */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.dataset.originalText =
                    submitButton.textContent;

                submitButton.textContent =
                    "Sending...";

            }


            showFormStatus(
                "Sending your enquiry...",
                "loading"
            );


            try {

                /* -------------------------
                   Send form through EmailJS
                ------------------------- */

await emailjs.sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    bookingForm
);

                /* -------------------------
                   Success
                ------------------------- */

                showFormStatus(
                    "Thank you! Your enquiry has been sent successfully. We'll get back to you soon.",
                    "success"
                );


                /* -------------------------
                   Clear form
                ------------------------- */

                bookingForm.reset();


            } catch (error) {

                console.error(
                    "EmailJS Error:",
                    error
                );


                showFormStatus(
                    "Something went wrong while sending your enquiry. Please try again or contact us directly.",
                    "error"
                );


            } finally {

                /* -------------------------
                   Restore button
                ------------------------- */

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        submitButton.dataset.originalText ||
                        "Send Enquiry";

                }

            }

        }
    );

}


/* =========================================================
   FORM STATUS HELPER
   ========================================================= */

function showFormStatus(
    message,
    type
) {

    if (!formStatus) {
        return;
    }


    formStatus.className =
        `form-status ${type}`;


    formStatus.textContent =
        message;

}
/* =========================================================
   09. PREVENT VIDEO FROM PLAYING IN BACKGROUND
   ========================================================= */

const portfolioVideos =
    document.querySelectorAll(
        ".portfolio-video video"
    );


portfolioVideos.forEach((video) => {

    video.addEventListener(
        "mouseenter",
        () => {

            video.play().catch(() => {});

        }
    );


    video.addEventListener(
        "mouseleave",
        () => {

            video.pause();

        }
    );

});


/* =========================================================
   10. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "Your Studio website JavaScript loaded successfully."
);