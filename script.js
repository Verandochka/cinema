document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const moviesSection = document.getElementById("movies");
    const seatsSection = document.getElementById("seats");
    const cinemaHall = document.querySelector(".cinema-hall");
    const selectedSeatsDisplay = document.getElementById("selectedSeats");
    const totalPriceDisplay = document.getElementById("totalPrice");
    const confirmBooking = document.getElementById("confirmBooking");

    let selectedSeats = [];
    const seatPrice = 100; // Ціна за звичайне місце
    const premiumSeatPrice = 200; // Ціна за преміум-місце

    // Реєстрація
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("registration").classList.add("hidden");
        moviesSection.classList.remove("hidden");
    });

    // Вибір фільму
    moviesSection.addEventListener("click", (e) => {
        if (e.target.classList.contains("select-movie")) {
            moviesSection.classList.add("hidden");
            seatsSection.classList.remove("hidden");
            generateSeats();
        }
    });

    // Генерація місць
    function generateSeats() {
        cinemaHall.innerHTML = ""; // Очищення перед генерацією
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const seat = document.createElement("button");
                seat.classList.add("seat");
                seat.dataset.seat = `${i}-${j}`;
                seat.dataset.price = i === 7 ? premiumSeatPrice : seatPrice; // Останній ряд — преміум
                if (i === 7) seat.classList.add("premium");
                cinemaHall.appendChild(seat);
            }
        }
    }

    // Вибір місця
    cinemaHall.addEventListener("click", (e) => {
        if (e.target.classList.contains("seat")) {
            const seat = e.target;
            const seatId = seat.dataset.seat;
            const seatPrice = parseInt(seat.dataset.price);

            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                selectedSeats = selectedSeats.filter((s) => s.id !== seatId);
            } else {
                seat.classList.add("selected");
                selectedSeats.push({ id: seatId, price: seatPrice });
            }

            updateSummary();
        }
    });

    // Оновлення підсумку
    function updateSummary() {
        const totalSeats = selectedSeats.length;
        const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

        selectedSeatsDisplay.textContent = totalSeats;
        totalPriceDisplay.textContent = totalPrice;
    }

    // Підтвердження бронювання
    confirmBooking.addEventListener("click", () => {
        alert(`Ви забронювали ${selectedSeats.length} місць. Сума: ${totalPriceDisplay.textContent} грн`);
        location.reload();
    });
});