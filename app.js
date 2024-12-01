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
            const card = document.createElement("img");
            card.setAttribute("src", "images/blank.png");
            card.setAttribute("data-id", i);
            card.classList.add("card");
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
        resultDisplay.textContent = 0;
    }

    function checkForMatch() {
        const cards = document.querySelectorAll("img");
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute("src", "images/blank.png");
        } else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute("src", "images/white.png");
            cards[optionTwoId].setAttribute("src", "images/white.png");
            cards[optionOneId].removeEventListener("click", flipCard);
            cards[optionTwoId].removeEventListener("click", flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute("src", "images/blank.png");
            cards[optionTwoId].setAttribute("src", "images/blank.png");
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
            this.setAttribute("src", cardArray[cardId].img);

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