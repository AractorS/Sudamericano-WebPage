document.addEventListener("DOMContentLoaded", function () {
    const socialIcons = document.querySelector(".social-icons");

    window.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY;
        socialIcons.style.top = `${50 + scrollPosition * 0.05}%`;
    });
});
