// STORE CARDS FLOATING ANIMATION

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".floating-card"); // Select all floating cards
    const stopControl = document.getElementById("stop");
    const moveControl = document.getElementById("move");
    const gridControl = document.getElementById("grid");

    const container = document.getElementById("floating-cards-container"); // Get the container element
    const containerParent = document.body; // Parent element for toggling grid

    let animationId; // Reference for the animation loop
    let isRunning = true; // Tracks whether the animation is active

    // 🔹 SPEED RANGE (each card will get its own speed)
    const MIN_SPEED = 0.3;
    const MAX_SPEED = 0.5;

    // 🔹 Helper to generate random speed
    function randomSpeed() {
        return Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    }

    // Define bottom margin
    const BOTTOM_MARGIN = 15;


    // Get dynamic container bounds
    function getContainerBounds() {
        const rect = container.getBoundingClientRect();
        return {
            width: rect.width, // Visible width of container
            height: rect.height, // Visible height of container
            leftOffset: rect.left, // Left offset relative to viewport
            topOffset: rect.top // Top offset relative to viewport
        };
    }

    // Initialize card positions and random directions
    const cardData = Array.from(cards).map(card => {
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const containerBounds = getContainerBounds();

        // 🔹 Each card gets its own speed
        const speed = randomSpeed();

        return {
            element: card,
            x: Math.random() * (containerBounds.width - cardWidth), // Random X position
            y: Math.random() * (containerBounds.height - cardHeight), // Random Y position
            vx: (Math.random() > 0.5 ? speed : -speed), // Random X direction + speed
            vy: (Math.random() > 0.5 ? speed : -speed), // Random Y direction + speed
            width: cardWidth,
            height: cardHeight
        };
    });

    // Function to move the cards within the container
    function moveCards() {
        const containerBounds = getContainerBounds(); // Update bounds dynamically

        cardData.forEach(card => {
            // Update position
            card.x += card.vx;
            card.y += card.vy;

            // Enforce left and right boundaries
            if (card.x <= 0) {
                card.x = 0; // Snap to left edge
                card.vx = Math.abs(card.vx); // Reverse to the right
            }
            if (card.x + card.width >= containerBounds.width) {
                card.x = containerBounds.width - card.width; // Snap to right edge
                card.vx = -Math.abs(card.vx); // Reverse to the left
            }

            // Enforce top and bottom boundaries
            if (card.y <= 0) {
                card.y = 0; // Snap to top edge
                card.vy = Math.abs(card.vy); // Reverse downward
            }

            if (card.y + card.height >= containerBounds.height - BOTTOM_MARGIN) {
                card.y = containerBounds.height - card.height - BOTTOM_MARGIN;
                card.vy = -Math.abs(card.vy);
            }


            // if (card.y + card.height >= containerBounds.height) {
            //     card.y = containerBounds.height - card.height; // Snap to bottom edge
            //     card.vy = -Math.abs(card.vy); // Reverse upward
            // }

            // Apply position updates
            card.element.style.left = `${card.x}px`;
            card.element.style.top = `${card.y}px`;
        });

        // Continue the animation loop if running
        if (isRunning) {
            animationId = requestAnimationFrame(moveCards);
        }
    }

    // Start floating animation on page load
    moveCards();

    // STOP: Freeze card movement
    stopControl.addEventListener("click", () => {
        isRunning = false;
        cancelAnimationFrame(animationId);
    });

    // MOVE: Resume floating animation
    moveControl.addEventListener("click", () => {
        // Ensure scrolling is disabled before enabling movement
        containerParent.classList.remove("grid-layout");

        if (!isRunning) {
            isRunning = true;
            moveCards();
        }
    });

    // GRID: Enable grid layout and stop movement
    gridControl.addEventListener("click", () => {
        isRunning = false; // Disable animation
        cancelAnimationFrame(animationId);

        // Reset card positions back to normal flow
        cardData.forEach(card => {
            card.element.style.transform = ""; // Clear transform styles
        });

        // Enable scrolling
        containerParent.classList.add("grid-layout");

        cards.forEach(card => card.classList.add("grid-enable")); // Apply grid layout
    });

    // Remove grid layout and resume floating
    moveControl.addEventListener("click", () => {
        cards.forEach(card => card.classList.remove("grid-enable")); // Remove grid layout class
    });

    // Ensure cards stay within bounds during window resize
    window.addEventListener("resize", () => {
        const containerBounds = getContainerBounds();
        cardData.forEach(card => {
            if (card.x + card.width > containerBounds.width) {
                card.x = containerBounds.width - card.width;
            }
            if (card.y + card.height > containerBounds.height) {
                card.y = containerBounds.height - card.height;
            }
        });
    });
});




// switch between two classes and then reset button

// function changeStyle() {
//     const headingText = document.getElementById("heading-text");
//     // Write your code here

//     if (headingText.classList.contains("yellow")) {
//         headingText.classList.remove("yellow");
//         headingText.classList.add("dim");
//     } else {
//         headingText.classList.remove("dim");
//         headingText.classList.add("yellow");
//     }
// }

// function resetStyle() {
//     const headingText = document.getElementById("heading-text");
//     // Write your code here
//     headingText.classList.value = "";
// }