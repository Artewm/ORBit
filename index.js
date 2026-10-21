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
