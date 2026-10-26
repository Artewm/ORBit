
//Бургер меню
const burger = document.querySelector("#burger");
const nav = document.querySelector("#header-nav");
const navLinks = document.querySelectorAll(".nav__link");
const mobileButton = document.querySelector(".header__btn--mobile");

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
    burger.setAttribute(
        "aria-label",
        isOpen ? "Закрыть меню" : "Открыть меню"
    );
}

burger.addEventListener("click", toggleMenu);

// Закрываем меню после перехода по ссылке
navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Закрываем меню после нажатия на кнопку
mobileButton.addEventListener("click", () => {
    closeMenu();

    // Здесь можно вызвать открытие формы заявки
});

// Закрываем меню при клике за его пределами
document.addEventListener("click", (event) => {
    if (
        nav.classList.contains("active") &&
        !nav.contains(event.target) &&
        !burger.contains(event.target)
    ) {
        closeMenu();
    }
});

// Закрываем меню по Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// При переходе на десктоп возвращаем обычную шапку
window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});


//Отправка формы
emailjs.init({
    publicKey: "v-xutZ9LoqRMjKcXV"
});

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const button = form.querySelector('button[type="submit"]');

const formReaction = document.querySelector(".form__reaction");
const imgYes = document.querySelector(".img--yes");
const imgNo = document.querySelector(".img--no");

let reactionTimeout;

function showReaction(message, success) {
    // Отменяем предыдущее автоматическое закрытие
    clearTimeout(reactionTimeout);

    // Сбрасываем иконки
    imgYes.classList.remove("reaction__active");
    imgNo.classList.remove("reaction__active");

    // Устанавливаем сообщение
    status.textContent = message;

    // Показываем модальное окно
    formReaction.classList.add("reaction__active");

    // Показываем нужную иконку
    const icon = success ? imgYes : imgNo;

    // Небольшая задержка для запуска CSS-анимации
    requestAnimationFrame(() => {
        icon.classList.add("reaction__active");
    });

    // Закрываем через 2 секунды
    reactionTimeout = setTimeout(() => {
        formReaction.classList.remove("reaction__active");
        imgYes.classList.remove("reaction__active");
        imgNo.classList.remove("reaction__active");
    }, 2000);
}

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
