    function init() {

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

    return cardArray;

    }

    function createBoard(cardArray) {
        const grid = document.querySelector(".grid");
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

            grid.appendChild(card);
        }
    }

