
import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

class ItcModal {
  #elem;
  #template = '<div class="itc-modal-backdrop"><div class="itc-modal-content"><div class="itc-modal-header"><div class="itc-modal-title">{{title}}</div><span class="itc-modal-btn-close" title="Закрыть">×</span></div><div class="itc-modal-body">{{content}}</div>{{footer}}</div></div>';
  #templateFooter = '<div class="itc-modal-footer">{{buttons}}</div>';
  #templateBtn = '<button type="button" class="{{class}}" data-action={{action}}>{{text}}</button>';
  #eventShowModal = new Event('show.itc.modal', { bubbles: true });
  #eventHideModal = new Event('hide.itc.modal', { bubbles: true });
  #disposed = false;

  constructor(options = []) {
    this.#elem = document.createElement('div');
    this.#elem.classList.add('itc-modal');
    let html = this.#template.replace('{{title}}', options.title || 'Новое окно');
    html = html.replace('{{content}}', options.content || '');
    const buttons = (options.footerButtons || []).map((item) => {
      let btn = this.#templateBtn.replace('{{class}}', item.class);
      btn = btn.replace('{{action}}', item.action);
      return btn.replace('{{text}}', item.text);
    });
    const footer = buttons.length ? this.#templateFooter.replace('{{buttons}}', buttons.join('')) : '';
    html = html.replace('{{footer}}', footer);
    this.#elem.innerHTML = html;
    document.body.append(this.#elem);
    this.#elem.addEventListener('click', this.#handlerCloseModal.bind(this));
  }

  #handlerCloseModal(e) {
    if (e.target.closest('.itc-modal-btn-close') || e.target.classList.contains('itc-modal-backdrop')) {
      this.hide();
    }
  }

  show() {
    if (this.#disposed) {
      return;
    }
    this.#elem.classList.add('itc-modal-show');
    this.#elem.dispatchEvent(this.#eventShowModal);
  }

  hide() {
    this.#elem.classList.remove('itc-modal-show');
    this.#elem.dispatchEvent(this.#eventHideModal);
  }

  dispose() {
    this.#elem.remove(this.#elem);
    this.#elem.removeEventListener('click', this.#handlerCloseModal);
    this.#disposed = true;
  }

  setBody(html) {
    this.#elem.querySelector('.itc-modal-body').innerHTML = html;
  }

  setTitle(text) {
    this.#elem.querySelector('.itc-modal-title').innerHTML = text;
  }
}
// FORM
document.addEventListener("DOMContentLoaded", function() {
  let form = document.querySelector("#myForm");
  let nameInput = document.querySelector("#name");
  let emailInput = document.getElementById("email");
  let phoneInput = document.querySelector("#phone");
  let phoneFormat = document.querySelector("#phone-format");
  let dropdownContainer = phoneInput.parentNode;

  let iti = window.intlTelInput(phoneInput, {
    separateDialCode: true,
    initialCountry: "ua",
    preferredCountries: [],
    dropdownContainer: dropdownContainer,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
  });

  let handleChangeCountry = function() {
    let selectedCountry = iti.getSelectedCountryData();
    if (selectedCountry && selectedCountry.dialCode) {
      let exampleNumber = iti.getNumberType().exampleNumber;
      
      phoneFormat.textContent = "Формат номера: " + exampleNumber;
    }
  };

  // Функція перевірки валідності електронної пошти
  function validateEmail() {
    let emailValue = emailInput.value;
    let emailPattern = /^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

    return emailPattern.test(emailValue);
  }

  // Функція перевірки валідності номера телефону
  function validatePhone() {
    let phoneValue = phoneInput.value;
    let numberPattern = new RegExp(phoneInput.getAttribute("pattern"));
    return numberPattern.test(phoneValue);
  }

  // Функція перевірки форми перед відправкою
  function validateForm() {
    let valid = true;

    // Перевірка порожнього поля ім'я
    if (nameInput.value.trim() === "") {
      nameInput.classList.add("invalid");
      valid = false;
    } else {
      nameInput.classList.remove("invalid");
      nameInput.classList.add("valid");
    }

    // Перевірка порожнього поля електронної пошти
    if (emailInput.value.trim() === "") {
      emailInput.classList.add("invalid");
      valid = false;
    } else {
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
    }

    // Перевірка порожнього поля номера телефону
    if (phoneInput.value.trim() === "") {
      phoneInput.classList.add("invalid");
      valid = false;
    } else {
      phoneInput.classList.remove("invalid");
      phoneInput.classList.add("valid");
    }

    // Перевірка валідності електронної пошти
    if (!validateEmail()) {
      emailInput.classList.add("invalid");
      valid = false;
    } else {
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
    }

    // Перевірка валідності номера телефону
    if (!validatePhone()) {
      phoneInput.classList.add("invalid");
      valid = false;
    } else {
      phoneInput.classList.remove("invalid");
      phoneInput.classList.add("valid");
    }

    return valid;
  }

  nameInput.addEventListener("blur", function() {
    if (nameInput.value.trim() === "") {
      nameInput.classList.add("invalid");
    } else {
      nameInput.classList.remove("invalid");
      nameInput.classList.add("valid");
    }
  });

  // Обробник події втрати фокусу (blur) електронної пошти
  emailInput.addEventListener("blur", function() {
    if (!validateEmail()) {
      emailInput.classList.add("invalid");
    } else {
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
    }
  });

  // Обробник події втрати фокусу (blur) номера телефону
  phoneInput.addEventListener("blur", function() {
    if (!validatePhone()) {
      phoneInput.classList.add("invalid");
    } else {
      phoneInput.classList.remove("invalid");
      phoneInput.classList.add("valid");
    }
  });

  function setAttributePattern() {
    let numberPattern = convertExampleNumberToPattern(phoneInput.getAttribute('placeholder'));
    phoneInput.setAttribute("pattern", numberPattern);
  }

  function convertExampleNumberToPattern(exampleNumber) {
    // Видаляємо пробіли та символи, які не є цифрами
    let cleanedNumber = exampleNumber.replace(/\s+/g, '').replace(/\D/g, '');
    // Створюємо патерн з очищеного прикладного номера
    let pattern = '^' + cleanedNumber.replace(/(\d)/g, '\\d') + '$';
    return pattern;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      // Якщо форма не валідна, не відправляємо її
      return;
    }
    
    var formData = new FormData(form);

    // Виконуємо POST-запит на сервер через fetch API
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    
    .then(function(data) {
      // Обробка успішної відправки форми та виведення модального вікна з повідомленням
      showModalWithTitleAndMessage("Успешно", "Форма успешно отправлена.");
    })
    .catch(function(error) {
      // Обробка помилки при відправці форми та виведення модального вікна з повідомленням про помилку
      showModalWithTitleAndMessage("Ошибка", "Возникла ошибка при отправкеформы. Попробуйте еще раз.");
    });

    // Очищаємо значення полів форми після відправки
    form.reset();
  }

  function showModalWithTitleAndMessage(title, message) {
    
    const modal = new ItcModal({
      title: title,
      content: message,
      buttons: [
        {
          text: "Закрыть",
          closeOnClick: true
        }
      ]
    });
  
    modal.show();
  }

  phoneInput.addEventListener("countrychange", handleChangeCountry);
  phoneInput.addEventListener("countrychange", setAttributePattern);
  form.addEventListener("submit", handleSubmit);
});


