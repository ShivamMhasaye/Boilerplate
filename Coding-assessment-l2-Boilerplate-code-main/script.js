// Get all color boxes
const colorBoxes = document.querySelectorAll('.box span');

// Get all size boxes
const sizeBoxes = document.querySelectorAll('.size-options label.box');

// Get the Add to Cart button
const addToCartButton = document.querySelector('.add-to-cart-button');

// Get all thumbnail images
const thumbnailImages = document.querySelectorAll('.thumbnail-image');

// Get the big image element
const bigImage = document.querySelector('.big-image');

// Loop through each thumbnail image and add click event listener
thumbnailImages.forEach(image => {
    image.addEventListener('click', () => {
        // Remove 'selected' class from all thumbnail images
        thumbnailImages.forEach(thumbnail => {
            thumbnail.classList.remove('selected');
        });
        // Add 'selected' class to the clicked thumbnail image
        image.classList.add('selected');
        // Update the src attribute of the big image to match the clicked thumbnail's data-big-image attribute
        const bigImagePath = image.getAttribute('data-big-image');
        bigImage.setAttribute('src', bigImagePath);
    });
});

// Create a message container
const messageContainer = document.createElement('div');
messageContainer.classList.add('message');
messageContainer.style.backgroundColor = 'rgba(231, 248, 183, 1)';
messageContainer.style.display = 'block';
messageContainer.style.fontFamily = 'Inter';
messageContainer.style.fontSize = '14px';
messageContainer.style.fontWeight = '600';
messageContainer.style.lineHeight = '16.94px';
messageContainer.style.textAlign = 'center';
messageContainer.style.marginBottom = '1rem'; // Set background color to green

// Add click event listener to Add to Cart button if it exists
if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
        const message = updateMessage();
        if (message) {
            // If both color and size are selected, update the message content
            messageContainer.textContent = message;
        } else {
            // If either color or size is not selected, show an alert
            alert('Please select both color and size before adding to cart.');
        }
    });

    // Append message container below the quantity container
    const quantityContainer = document.querySelector('.quantity-container');
    quantityContainer.parentNode.insertBefore(messageContainer, quantityContainer.nextSibling);
}

// Function to update the message content
function updateMessage() {
    const selectedColor = document.querySelector('.box span.selected');
    const selectedSize = document.querySelector('.size-options label.box.selected');
    if (selectedColor && selectedSize) {
        const color = selectedColor.dataset.color;
        const size = selectedSize.querySelector('.size-option').textContent;
        const message = `Embrace Sideboard with color ${color} and size ${size} added to cart.`;
        return message;
    } else {
        return '';
    }
}

// Loop through each color box and add click event listener
// colorBoxes.forEach(colorBox => {
//     colorBox.addEventListener('click', () => {
//         // Remove selected class from all color boxes
//         colorBoxes.forEach(box => {
//             box.classList.remove('selected');
//             // Remove the tick mark from all color boxes
//             const tick = box.querySelector('.tick');
//             if (tick) {
//                 tick.remove();
//             }
//         });
//         // Add selected class to the clicked color box
//         colorBox.classList.add('selected');
//         // Add a tick mark to the selected color box
//         const tick = document.createElement('div');
//         tick.classList.add('tick');
//         colorBox.appendChild(tick);
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    const checkboxLabels = document.querySelectorAll('.box label');

    checkboxLabels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        const indicator = label.querySelector('.indicator');

        label.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked; // Toggle the checkbox's checked state
            toggleBorderAndTick(); // Toggle the border and tick
            uncheckOthers(); // Uncheck all other checkboxes
        });

        function toggleBorderAndTick() {
            if (checkbox.checked) {
                label.classList.add('selected'); // Add 'selected' class to the label
                indicator.style.opacity = 1; // Show the tick icon
                const backgroundColor = getComputedStyle(label).getPropertyValue('background-color'); // Get the background color of the box
                label.style.boxShadow = `0 0 0 5px white, 0 0 0 10px ${backgroundColor}`; // Add the box-shadow with the same color as the background
            } else {
                label.classList.remove('selected'); // Remove 'selected' class from the label
                indicator.style.opacity = 0; // Hide the tick icon
                label.style.boxShadow = 'none'; // Remove the box-shadow
            }
        }

        function uncheckOthers() {
            checkboxLabels.forEach(otherLabel => {
                if (otherLabel !== label) {
                    otherLabel.querySelector('input[type="checkbox"]').checked = false; // Uncheck other checkboxes
                    otherLabel.classList.remove('selected'); // Remove 'selected' class from other labels
                    otherLabel.querySelector('.indicator').style.opacity = 0; // Hide tick icon for other checkboxes
                    otherLabel.style.boxShadow = 'none'; // Remove the box-shadow for other checkboxes
                }
            });
        }
    });
});

// Loop through each size box and add click event listener
sizeBoxes.forEach(sizeBox => {
    sizeBox.addEventListener('click', () => {
        // Remove selected class from all size boxes
        sizeBoxes.forEach(box => {
            box.classList.remove('selected');
        });
        // Add selected class to the clicked size box
        sizeBox.classList.add('selected');
    });
});

// Quantity functionality
const plus = document.querySelector(".quantity-button-plus");
const minus = document.querySelector(".quantity-button-minus");
const num = document.querySelector(".quantity");

let quantity = 1;

plus.addEventListener("click", () => {
    quantity++;
    updateQuantityDisplay();
});

minus.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        updateQuantityDisplay();
    }
});

function updateQuantityDisplay() {
    num.innerText = quantity;
}
// Get references to elements
const originalPriceElement = document.querySelector('.original-price');
const discountedPriceElement = document.querySelector('.discounted-price');
const discountTextInput = document.getElementById('discount-input');

// Function to calculate discounted price
function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountAmount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice;
}

// Function to update the display with discounted price
function updateDiscountedPrice() {
    const originalPrice = parseFloat(originalPriceElement.innerText.replace('$', ''));
    const discountPercentage = parseFloat(discountTextInput.value);
    const discountedPrice = calculateDiscountedPrice(originalPrice, discountPercentage);
    discountedPriceElement.innerText = `$${discountedPrice.toFixed(2)}`;
}

// Event listener for discount input change
discountTextInput.addEventListener('input', updateDiscountedPrice);
