document.addEventListener("DOMContentLoaded", function () {
    const cardArray = [
        { name: "blue_square", img: "images/blue_square.png" },
        { name: "blue_square", img: "images/blue_square.png" },
        { name: "blue_triangle", img: "images/blue_triangle.png" },
        { name: "blue_triangle", img: "images/blue_triangle.png" },
        { name: "red_square", img: "images/red_square.png" },
        { name: "red_square", img: "images/red_square.png" },
        { name: "red_triangle", img: "images/red_triangle.png" },
        { name: "red_triangle", img: "images/red_triangle.png" },
        { name: "yellow_square", img: "images/yellow_square.png" },
        { name: "yellow_square", img: "images/yellow_square.png" },
        { name: "yellow_triangle", img: "images/yellow_triangle.png" },
        { name: "yellow_triangle", img: "images/yellow_triangle.png" }
    ];

    cardArray.sort(() => Math.random() - 0.5);

    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    const restartButton = document.querySelector("#restart");
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let lockBoard = false;

    function createBoard() {
        grid.innerHTML = "";
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("div");

            card.classList.add("card");
            card.setAttribute("data-id", i);

            const cardInner = document.createElement("div");
            cardInner.classList.add("card-inner");

            const cardFront = document.createElement("div");
            cardFront.classList.add("card-front");

            const cardBack = document.createElement("div");
            cardBack.classList.add("card-back");
            const cardImage = document.createElement("img");
            cardImage.src = cardArray[i].img;
            cardImage.alt = cardArray[i].name;
            cardBack.appendChild(cardImage);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);

            card.appendChild(cardInner);

            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
        resultDisplay.textContent = 0;
    }

    function checkForMatch() {
        const cards = document.querySelectorAll(".card");
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (optionOneId === optionTwoId) {
            cards[optionOneId].classList.remove("flipped");
        } else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].removeEventListener("click", flipCard);
            cards[optionTwoId].removeEventListener("click", flipCard);
            cardsWon.push(cardsChosen);
        } else {
            setTimeout(() => {
                cards[optionOneId].classList.remove("flipped");
                cards[optionTwoId].classList.remove("flipped");
            }, 100);
        }

        cardsChosen = [];
        cardsChosenId = [];

        lockBoard = false;

        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Congratulations! You Won!";
        }
    }

    function flipCard() {
        if (lockBoard) return;
        
        const cardId = this.getAttribute("data-id");
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.classList.add("flipped");

            if (cardsChosen.length === 2) {
                lockBoard = true;
                setTimeout(checkForMatch, 500);
            }
        }
    }

    restartButton.addEventListener("click", () => {
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        cardArray.sort(() => Math.random() - 0.5);
        lockBoard = false;
        createBoard();
    });

    createBoard();
});
