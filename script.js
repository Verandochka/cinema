let myTheatre = null;
let totalCash = 0;

const buildBtn = document.getElementById('build');
const clearBtn = document.getElementById('clear');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const theatre = document.getElementById('theatre');
const cashValueEl = document.getElementById('cashValue');

function updateCash() {
    if (cashValueEl) cashValueEl.textContent = totalCash;
}

buildBtn.onclick = function () {
    const rows = parseInt(rowsInput.value, 10) || 8;
    const cols = parseInt(colsInput.value, 10) || 8;

    // Видаляємо попередню залу
    if (myTheatre) {
        myTheatre.remove();
        myTheatre = null;
        totalCash = 0; // скидаємо касу при новому побудуванні
    }

    // Створюємо контейнер сітки
    myTheatre = document.createElement('div');
    myTheatre.className = 'container';
    myTheatre.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const myPlace = document.createElement('div');
            myPlace.className = 'place';
            const price = (r === rows - 1) ? 200 : 100; // останній ряд — преміум
            myPlace.dataset.price = price;
            myPlace.dataset.row = r;
            myPlace.dataset.col = c;
            myPlace.innerHTML = `<h3 style="text-align:center;margin:0">${price}₴</h3>`;

            myPlace.onclick = function () {
                if (myPlace.classList.contains('placeReserved')) {
                    const ok = confirm('Впевнені, що хочете зняти бронь?');
                    if (ok) {
                        myPlace.classList.remove('placeReserved');
                        totalCash -= Number(myPlace.dataset.price);
                    }
                } else {
                    myPlace.classList.add('placeReserved');
                    totalCash += Number(myPlace.dataset.price);
                    updateCash();
                }
            };

            myTheatre.appendChild(myPlace);
        }
    }
    if (theatre) theatre.appendChild(myTheatre);
};

clearBtn.onclick = function () {
    if (myTheatre) {
        myTheatre.remove();
        myTheatre = null;
    }
    totalCash = 0;
    updateCash();
};