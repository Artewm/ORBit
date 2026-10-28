const burger = document.querySelector("#burger");
const nav = document.querySelector("#header-nav");
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const button = form.querySelector('button[type="submit"]');
const formReaction = document.querySelector(".form__reaction");
const imgYes = document.querySelector(".img--yes");
const imgNo = document.querySelector(".img--no");

let reactionTimeout;

function closeMenu() {
    burger.classList.remove("active");
    nav.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
}

function toggleMenu() {
    const isOpen = nav.classList.toggle("active");
    burger.classList.toggle("active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
}

function showReaction(message, success) {
    clearTimeout(reactionTimeout);
    imgYes.classList.remove("reaction__active");
    imgNo.classList.remove("reaction__active");
    status.textContent = message;
    formReaction.classList.add("reaction__active");

    const icon = success ? imgYes : imgNo;
    requestAnimationFrame(() => {
        icon.classList.add("reaction__active");
    });

    reactionTimeout = setTimeout(() => {
        formReaction.classList.remove("reaction__active");
        imgYes.classList.remove("reaction__active");
        imgNo.classList.remove("reaction__active");
    }, 2000);
}

function scrollToForm() {
    closeMenu();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
}

burger.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.querySelectorAll(".header__btn, .main__btn").forEach((btn) => {
    btn.addEventListener("click", scrollToForm);
});

document.addEventListener("click", (event) => {
    if (
        nav.classList.contains("active") &&
        !nav.contains(event.target) &&
        !burger.contains(event.target)
    ) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});

emailjs.init({
    publicKey: "v-xutZ9LoqRMjKcXV"
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    button.disabled = true;
    button.textContent = "Отправка...";

    try {
        await emailjs.sendForm(
            "service_mikvehd",
            "template_0rckwlc",
            form
        );

        showReaction("Заявка успешно отправлена!", true);
        form.reset();
    } catch (error) {
        console.error("Ошибка отправки:", error);
        showReaction(
            "Не удалось отправить заявку. Попробуйте ещё раз.",
            false
        );
    } finally {
        button.disabled = false;
        button.innerHTML = 'Обсудить мой проект <span>→</span>';
    }
});
