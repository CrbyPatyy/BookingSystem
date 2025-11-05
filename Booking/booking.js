const form = document.getElementById('bookingForm');
const steps = document.querySelectorAll('.form-section');
const stepIndicators = document.querySelectorAll('.step');
const nextStep1 = document.getElementById('nextStep1');
const nextStep2 = document.getElementById('nextStep2');
const nextStep3 = document.getElementById('nextStep3');
const backStep2 = document.getElementById('backStep2');
const backStep3 = document.getElementById('backStep3');
const backStep4 = document.getElementById('backStep4');
const confirmBooking = document.getElementById('confirmBooking');
const guestCount = document.getElementById('guestCount');
const guestsInput = document.getElementById('guestsInput');
const decreaseGuests = document.getElementById('decreaseGuests');
const increaseGuests = document.getElementById('increaseGuests');
const summaryCheckin = document.getElementById('summaryCheckin');
const summaryCheckout = document.getElementById('summaryCheckout');
const summaryNights = document.getElementById('summaryNights');
const summaryGuests = document.getElementById('summaryGuests');
const summaryRoom = document.getElementById('summaryRoom');
const summaryName = document.getElementById('summaryName');
const summaryTotal = document.getElementById('summaryTotal');
const totalAmount = document.getElementById('totalAmount');
const paymentTotalAmount = document.getElementById('paymentTotalAmount');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const paymentOptions = document.querySelectorAll('.payment-option');
const paymentMethodInput = document.getElementById('paymentMethod');
let currentStep = 1;
let guestCountValue = 2;
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
checkinInput.min = today.toISOString().split('T')[0];
checkoutInput.min = tomorrow.toISOString().split('T')[0];

function updateGuestCount() {
    guestCount.textContent = guestCountValue + (guestCountValue === 1 ? ' Guest' : ' Guests');
    guestsInput.value = guestCountValue;
    decreaseGuests.disabled = guestCountValue <= 1;
    increaseGuests.disabled = guestCountValue >= 10;
}

decreaseGuests.addEventListener('click', () => {
    if (guestCountValue > 1) {
        guestCountValue--;
        updateGuestCount();
    }
});

increaseGuests.addEventListener('click', () => {
    if (guestCountValue < 10) {
        guestCountValue++;
        updateGuestCount();
    }
});

function showStep(step) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
    stepIndicators.forEach(indicator => {
        indicator.classList.toggle('active', parseInt(indicator.dataset.step) === step);
    });
    currentStep = step;
    // Update payment total when showing step 4
    if (step === 4) {
        paymentTotalAmount.textContent = totalAmount.textContent;
    }
}

function validateStep1() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    document.getElementById('checkin-error').classList.remove('show');
    document.getElementById('checkout-error').classList.remove('show');
    checkinInput.classList.remove('error');
    checkoutInput.classList.remove('error');
    let isValid = true;
    if (!checkin) {
        document.getElementById('checkin-error').classList.add('show');
        checkinInput.classList.add('error');
        isValid = false;
    }
    if (!checkout) {
        document.getElementById('checkout-error').textContent = 'Please select check-out date';
        document.getElementById('checkout-error').classList.add('show');
        checkoutInput.classList.add('error');
        isValid = false;
    } else if (new Date(checkout) <= new Date(checkin)) {
        document.getElementById('checkout-error').classList.add('show');
        checkoutInput.classList.add('error');
        isValid = false;
    }
    return isValid;
}

function validateStep2() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    ['firstName', 'lastName', 'email', 'phone'].forEach(field => {
        document.getElementById(`${field}-error`).classList.remove('show');
        document.getElementById(field).classList.remove('error');
    });
    let isValid = true;
    if (!firstName) {
        document.getElementById('firstName-error').classList.add('show');
        document.getElementById('firstName').classList.add('error');
        isValid = false;
    }
    if (!lastName) {
        document.getElementById('lastName-error').classList.add('show');
        document.getElementById('lastName').classList.add('error');
        isValid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').classList.add('show');
        document.getElementById('email').classList.add('error');
        isValid = false;
    }
    if (!phone || !/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) {
        document.getElementById('phone-error').classList.add('show');
        document.getElementById('phone').classList.add('error');
        isValid = false;
    }
    return isValid;
}

function validateStep4() {
    const selectedMethod = paymentMethodInput.value;
    if (!selectedMethod) {
        alert('Please select a payment method');
        return false;
    }
    return true;
}

function calculateTotal() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const roomType = document.getElementById('roomType').value;
    
    if (!checkin || !checkout) return;

    const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    
    // 🟢 CORRECTED PRICES (same as admin dashboard)
    const roomPrices = {
        'standard': 1500,
        'deluxe': 2500,
        'suite': 4000,
        'family': 3500
    };
    
    const pricePerNight = roomPrices[roomType] || 2500;
    const total = nights * pricePerNight;
    
    // Update display with currency symbol
    summaryTotal.textContent = `₱${total.toLocaleString()}`;
    totalAmount.textContent = `₱${total.toLocaleString()}`;
    
    // 🟢 Update hidden fields for form submission
    document.getElementById('nightsHidden').value = nights;
    document.getElementById('totalAmountHidden').value = total;
    
    console.log('Calculated total:', total, 'Nights:', nights); // Debug log
}

function updateSummary() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const roomType = document.getElementById('roomType').value;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    
    if (checkin) {
        summaryCheckin.textContent = new Date(checkin).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }
    
    if (checkout) {
        summaryCheckout.textContent = new Date(checkout).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }
    
    summaryGuests.textContent = guestCountValue;
    
    const roomOptions = {
        'standard': 'Standard',
        'deluxe': 'Deluxe', 
        'suite': 'Suite',
        'family': 'Family'
    };
    summaryRoom.textContent = roomOptions[roomType] || 'Deluxe';
    summaryName.textContent = (firstName && lastName) ? `${firstName} ${lastName}` : '-';
    
    calculateTotal();
}

// Payment method selection
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        paymentMethodInput.value = option.dataset.method;
    });
});

nextStep1.addEventListener('click', () => {
    if (validateStep1()) {
        updateSummary();
        showStep(2);
    }
});

nextStep2.addEventListener('click', () => {
    if (validateStep2()) {
        updateSummary();
        showStep(3);
    }
});

nextStep3.addEventListener('click', () => {
    showStep(4);
});

backStep2.addEventListener('click', () => showStep(1));
backStep3.addEventListener('click', () => showStep(2));
backStep4.addEventListener('click', () => showStep(3));

checkinInput.addEventListener('change', () => {
    if (checkinInput.value) {
        const nextDay = new Date(checkinInput.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutInput.min = nextDay.toISOString().split('T')[0];
        if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
            checkoutInput.value = '';
        }
    }
    updateSummary();
});

checkoutInput.addEventListener('change', () => {
    updateSummary();
});

document.getElementById('roomType').addEventListener('change', () => {
    updateSummary();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateStep2() || !validateStep4()) return;
    
    const formData = new FormData(form);
    
    // 🟢 Get values from hidden fields
    const nightsValue = document.getElementById('nightsHidden').value;
    const totalAmountValue = document.getElementById('totalAmountHidden').value;
    
    // 🟢 DEBUG: Check what values we're sending
    console.log('=== DEBUG FORM SUBMISSION ===');
    console.log('Nights value:', nightsValue);
    console.log('Total Amount value:', totalAmountValue);
    console.log('Checkin:', checkinInput.value);
    console.log('Checkout:', checkoutInput.value);
    console.log('Room Type:', document.getElementById('roomType').value);
    
    // 🟢 Also check if hidden fields exist
    console.log('Nights hidden field exists:', !!document.getElementById('nightsHidden'));
    console.log('TotalAmount hidden field exists:', !!document.getElementById('totalAmountHidden'));
    console.log('=== END DEBUG ===');
    
    formData.append("nights", nightsValue);
    formData.append("totalAmount", totalAmountValue);

    const confirmButton = document.getElementById("confirmBooking");
    const defaultState = confirmButton.querySelector(".state--default");
    const bookedState = confirmButton.querySelector(".state--sent");

    // 🔹 Show "Booked" animation first
    confirmButton.disabled = true;
    defaultState.style.display = "none";
    bookedState.style.display = "flex";

    // 🔹 Wait 1 second before actually saving to DB - CSP SAFE VERSION
    setTimeout(function() {
        fetch("save_booking.php", {
            method: "POST",
            body: formData
        })
        .then(function(res) { return res.text(); })
        .then(function(data) {
            console.log('Server response:', data);
            if (data.trim() === "success") {
                // ✅ Smooth delay before alert - CSP SAFE VERSION
                setTimeout(function() {
                    Swal.fire({
                        title: "✅ Booking Confirmed!",
                        text: "Booking has been saved successfully!",
                        icon: "success",
                        confirmButtonColor: "#2D9D92"
                    }).then(function() {
                        // Reset form after user clicks OK
                        form.reset();
                        showStep(1);
                        guestCountValue = 2;
                        updateGuestCount();
                        summaryCheckin.textContent = "-";
                        summaryCheckout.textContent = "-";
                        summaryNights.textContent = "0";
                        summaryGuests.textContent = "2";
                        summaryRoom.textContent = "Deluxe";
                        summaryName.textContent = "-";
                        summaryTotal.textContent = "₱0";
                        totalAmount.textContent = "₱0";
                        paymentMethodInput.value = "";
                        paymentOptions.forEach(function(opt) { 
                            opt.classList.remove('selected'); 
                        });
                        // Reset hidden fields
                        document.getElementById('nightsHidden').value = '';
                        document.getElementById('totalAmountHidden').value = '';
                        // Reset button
                        confirmButton.disabled = false;
                        bookedState.style.display = "none";
                        defaultState.style.display = "flex";
                    });
                }, 600);
            } else {
                Swal.fire("⚠️ Error", "Error saving booking: " + data, "error");
                confirmButton.disabled = false;
                bookedState.style.display = "none";
                defaultState.style.display = "flex";
            }
        })
        .catch(function(err) {
            Swal.fire("⚠️ Connection Failed", err.toString(), "error");
            confirmButton.disabled = false;
            bookedState.style.display = "none";
            defaultState.style.display = "flex";
        });
    }, 1000); // small delay before processing
});

updateGuestCount();

// Room availability functions
// In your booking.js, update the checkRoomAvailability function:
function checkRoomAvailability() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guestsInput').value;
    const roomSelect = document.getElementById('roomNumber');
    
    if (!checkin || !checkout) {
        roomSelect.innerHTML = '<option value="">Select check-in and check-out dates first</option>';
        return;
    }
    
    if (new Date(checkout) <= new Date(checkin)) {
        roomSelect.innerHTML = '<option value="">Check-out must be after check-in</option>';
        return;
    }
    
    roomSelect.innerHTML = '<option value="">Checking availability...</option>';
    
    // Debug: log what we're sending
    console.log('Checking availability for:', checkin, 'to', checkout);
    
    fetch('check_availability.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `checkin=${checkin}&checkout=${checkout}&guests=${guests}`
    })
    .then(res => res.json())
    .then(data => {
        console.log('Availability response:', data);
        if (data.error) {
            roomSelect.innerHTML = `<option value="">${data.error}</option>`;
        } else {
            updateRoomSelection(data.availableRooms || []);
        }
    })
    .catch(error => {
        console.error('Availability check error:', error);
        roomSelect.innerHTML = '<option value="">Error checking availability</option>';
    });
}

function updateRoomSelection(availableRooms) {
    const roomSelect = document.getElementById('roomNumber');
    const roomTypeInput = document.getElementById('roomType');
    
    roomSelect.innerHTML = '';
    
    if (availableRooms.length === 0) {
        roomSelect.innerHTML = '<option value="">No rooms available for selected dates</option>';
        roomTypeInput.value = '';
        return;
    }
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `Select from ${availableRooms.length} available room(s)`;
    roomSelect.appendChild(defaultOption);
    
    availableRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.room_number;
        option.textContent = `Room ${room.room_number} - ${room.room_type} - ₱${room.price_per_night}/night (up to ${room.capacity} guests)`;
        option.dataset.roomType = room.room_type;
        option.dataset.price = room.price_per_night;
        roomSelect.appendChild(option);
    });
    
    roomSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value) {
            roomTypeInput.value = selectedOption.dataset.roomType || '';
            calculateTotal();
        } else {
            roomTypeInput.value = '';
        }
    });
}

// Update calculateTotal to use actual room prices
function calculateTotal() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const roomSelect = document.getElementById('roomNumber');
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    
    if (!checkin || !checkout || !selectedOption.value) return;

    const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    const pricePerNight = selectedOption.dataset.price ? parseInt(selectedOption.dataset.price) : 0;
    const total = nights * pricePerNight;
    
    // Update display
    summaryTotal.textContent = `₱${total.toLocaleString()}`;
    totalAmount.textContent = `₱${total.toLocaleString()}`;
    summaryNights.textContent = nights;
    
    // Update hidden fields
    document.getElementById('nightsHidden').value = nights;
    document.getElementById('totalAmountHidden').value = total;
}

// Add event listeners for date changes
checkinInput.addEventListener('change', function() {
    if (checkinInput.value) {
        const nextDay = new Date(checkinInput.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutInput.min = nextDay.toISOString().split('T')[0];
        if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
            checkoutInput.value = '';
        }
    }
    checkRoomAvailability();
    updateSummary();
});

checkoutInput.addEventListener('change', function() {
    checkRoomAvailability();
    updateSummary();
});

// Update guest count to trigger availability check
function updateGuestCount() {
    guestCount.textContent = guestCountValue + (guestCountValue === 1 ? ' Guest' : ' Guests');
    guestsInput.value = guestCountValue;
    decreaseGuests.disabled = guestCountValue <= 1;
    increaseGuests.disabled = guestCountValue >= 10;
    
    // Check availability when guest count changes
    checkRoomAvailability();
}

// In your booking.js, add these lines:
checkinInput.addEventListener('change', checkRoomAvailability);
checkoutInput.addEventListener('change', checkRoomAvailability);
