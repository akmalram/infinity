const ready = (callback) => {
    window.addEventListener('DOMContentLoaded', (e) => {
        callback(e);
    })
}

ready(() => {
    const MenuClassToggler = () => {
        const btn = document.querySelector('.navbar-toggler .btn');
        const menu = document.querySelector('.navbar-menu');

        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            menu.classList.toggle('active');
            document.querySelector('body').classList.toggle('overhidden');
        });
    }

    MenuClassToggler();
});

ready(() => {
    let toursSwiper = new Swiper('.tours .swiper-container', {
        slidesPerView: 2,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            }
        }
    });

    let partnersSwiper = new Swiper('.partners .swiper-container', {
        speed: 400,
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2e3,
            disableOnInteraction: false,
        },
        breakpoints: {
            1020: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            520: {
                slidesPerView: 1,
            },
        }
    });
});

ready(() => {
    let name = false,
        phone = false,
        location = false,
        email = true,
        count = false,
        dateFrom = false,
        dateTo = false,
        textarea = false;

    const nameInput = document.querySelector('.form .name .form-input');
    const emailInput = document.querySelector('.form .email .form-input');
    const phoneInput = document.querySelector('.form .phone .form-input');
    const locationInput = document.querySelector('.form .location .form-input');
    const countInput = document.querySelector('.form .people-count .form-input');
    const dateFromInput = document.querySelector('.form .date-from .form-input');
    const dateToInput = document.querySelector('.form .date-to .form-input');
    const textareaInput = document.querySelector('.form .message textarea');
    const form = document.querySelector('.tour-form-wrapper .form');

    const validateName = () => {
        const data = nameInput.value;

        if (data.length == 0) {
            name = false;
            nameInput.classList.add('invalid');
        } else if (/\d/.test(data)) {
            name = false;
            nameInput.classList.add('invalid');
        } else if (data.length < 2) {
            name = false;
            nameInput.classList.add('invalid');
        } else {
            name = true;
            nameInput.classList.remove('invalid');
        }
    }

    const validatePhone = () => {
        const data = phoneInput.value;

        if (data === '' || data.length === 0) {
            phone = false;
            phoneInput.classList.add('invalid');
        } else if (!/(\+\d+)|(\d+)/.test(data)) {
            phone = false;
            phoneInput.classList.add('invalid');
        } else if (data.length < 7) {
            phone = false;
            phoneInput.classList.add('invalid');
        } else {
            phone = true;
            phoneInput.classList.remove('invalid');
        }
    }

    const validateLocation = () => {
        const data = locationInput.value;

        if (data.length == 0) {
            location = false;
            locationInput.classList.add('invalid');
        } else {
            location = true;
            locationInput.classList.remove('invalid');
        }
    }

    const validateEmail = () => {
        const data = emailInput.value;

        if (data.length != 0) {

            if (!/.+@.+\..+/i.test(data)) {
                email = false;
                emailInput.classList.add('invalid');
            } else if (data.length < 7) {
                email = false;
                emailInput.classList.add('invalid');
            } else {
                email = true;
                emailInput.classList.remove('invalid');
            }

        }
    }

    const validateCount = () => {
        const data = countInput.value;

        if (data.length == 0) {
            count = false;
            countInput.classList.add('invalid');
        } else if(parseInt(data) < 1) {
            count = false;
            countInput.classList.add('invalid');
        } else {
            count = true;
            countInput.classList.remove('invalid');
        }
    }

    const validateDateFrom = () => {
        const data = dateFromInput.value;

        if (data.length == 0) {
            dateFrom = false;
            dateFromInput.classList.add('invalid');
        } else {
            dateFrom = true;
            dateFromInput.classList.remove('invalid');
        }
    }

    const validateDateTo = () => {
        const data = dateToInput.value;

        if (data.length == 0) {
            dateTo = false;
            dateToInput.classList.add('invalid');
        } else {
            dateTo = true;
            dateToInput.classList.remove('invalid');
        }
    }

    const validateTextarea = () => {
        const data = textareaInput.value;

        if (data.length == 0) {
            textarea = false;
            textareaInput.classList.add('invalid');
        } else {
            textarea = true;
            textareaInput.classList.remove('invalid');
        }
    }

    nameInput.addEventListener('input', () => validateName());

    locationInput.addEventListener('input', () => validateLocation());

    phoneInput.addEventListener('input', () => validatePhone());

    emailInput.addEventListener('input', () => validateEmail());

    countInput.addEventListener('input', () => validateCount());

    dateFromInput.addEventListener('input', () => validateDateFrom());

    dateToInput.addEventListener('input', () => validateDateTo());

    textareaInput.addEventListener('input', () => validateTextarea());


    form.addEventListener('submit', (e) => {
        validateName();
        validateLocation();
        validatePhone();
        validateEmail();
        validateCount();
        validateDateFrom();
        validateDateTo();
        validateTextarea();

        if(!name || !location || !phone || !email || !count || !dateFrom || !dateTo || !textarea) {
            e.preventDefault();
        } else {
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: "../send.php",
                data: $(form).serialize(),
            })
            .done(function() {
                alert('Ваша заявка принята!')
                form.reset();
            });
        }
    });
});

ready(() => {
    const orderForms = document.querySelectorAll('form.order-tour');

    orderForms.forEach(one => {
        one.addEventListener('submit', (e) => {
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: "../order-tour.php",
                data: $(one).serialize(),
            })
            .done(function() {
                alert('Ваша заявка принята!')
                one.reset();
            });
        });
    });
});

ready(() => {
    const modalToggler = (buttonClass, modalClass) => {
        let btn = document.querySelectorAll(buttonClass),
            modal = document.querySelector(modalClass),
            closetBtn = document.querySelector(`${modalClass} .close`);

       if(modal) {
            btn.forEach(one => {
                one.addEventListener('click', () => {
                    modal.classList.add('active');
                });
            });

            [closetBtn].forEach(one => {
                one.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            });
       }
    }

    modalToggler('.open-modal-paris','.details-modal.paris');
});

const fontAwesomeFreeObserver = new FontFaceObserver('Font Awesome 5 Free');
const fontAwesomeBrandsObserver = new FontFaceObserver('Font Awesome 5 Brands');
const gilroyObserver = new FontFaceObserver('Gilroy');

Promise.all([
    fontAwesomeFreeObserver.load(),
    fontAwesomeBrandsObserver.load(),
    gilroyObserver.load()
]).then(() => {
    document.querySelector('html').classList.add('fonts-loaded');
});