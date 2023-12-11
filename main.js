document.addEventListener('DOMContentLoaded', function () {
    let totalCost = 0;
    let totalAdventureCost = 0;
    // Declaring DOM Elements For Room Reservation
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const roomTypeSelect = document.getElementById('roomType');
    const numGuestsAInput = document.getElementById('numGuestsA');
    const numChildrenCInput = document.getElementById('numChildrenC');
    const numBedInput = document.getElementById('numbed');
    const currentBookingDetails = document.getElementById('current-booking-details');
    const currentBookingCost = document.getElementById('current-booking-cost');
    const bookingTableBody = document.getElementById('booking-table-body');
    const bookBtn = document.getElementById('bookBtn');
    const AdvBtn = document.getElementById('Adv-button')
    const loyaltyPointsValue = document.getElementById('loyaltyPointsValue');
    const loyaltyBtn = document.getElementById('loyaltyBtn');


    //Declaring Dom Elements For Adventure Booking
    const numAdultsInput = document.getElementById('numAdults');
    const numChildrenInput = document.getElementById('numChildren');
    const numGuestsAFInput = document.getElementById('numGuestsAF');
    const numChildrenCFInput = document.getElementById('numChildrenCF');
    const currentBookingDetailsA = document.getElementById('current-booking-detailsA');
    const currentBookingCostA = document.getElementById('current-booking-costA');
    const adventureTableBody = document.getElementById('adventure-table-body');
    const adventureTypeSelect = document.getElementById('adventure-type-Select');
    const advBtn = document.getElementById('advBtn');

    //Declaring Dom Elements For Add To Favourites
    const AFBtn = document.getElementById('AFBtn');
    const AFBtnadv = document.getElementById('AFBtnAdv');

    //Declaring DOM Elements For Getting The Total Cost
    const totalCostText = document.getElementById('TotalCostText');
    const promoCodeInput = document.getElementById('promoCode');
    const getTotalCostBtn = document.getElementById('getTotalCostBtn');
    const totalBillText = document.getElementById('totalBill');

    //Function to calculate the total cost
    function calculateTotalCost() {
        let total = totalCost;
        const tableBody = document.getElementById('room-reservations-body');
    
        // Loop through each row of the table
        for (let i = 0; i < tableBody.rows.length; i++) {
            // Assuming the cost is always in the last cell (index - 1)
            const costCell = tableBody.rows[i].cells[tableBody.rows[i].cells.length-1].textContent;
    
            // Extracting the numeric value from the string
            const cost = parseFloat(costCell.replace('Rs. ', ''));
    
            // Adding the cost to the total
            total += cost;
        }
        return total;
    }
    //Function To Display Total Cost
    function displayTotalCost(totalCost) {
        totalCostText.textContent = `Total Cost: Rs. ${totalCost.toFixed(2)}`;
    }
    const form = document.querySelector('form');

    //Event Listener To Display The Total Cost
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const total = calculateTotalCost();
        displayTotalCost(total); 

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const numGuestsI = document.getElementById('numGuestsI').value;
        const email = document.getElementById('email').value;
        const contacts = document.getElementById('contacts').value;
        const specialR = document.getElementById('spr').value;
        const costCell = `Rs. ${totalCost.toFixed(2)}`;

        const tableBody = document.getElementById('room-reservations-body');

        const newRow = tableBody.insertRow(-1);

        // Getting the selected room type value
        const roomType = roomTypeSelect.options[roomTypeSelect.selectedIndex].value;

        const cells = [
            firstName,
            lastName,
            email,
            contacts,
            roomType,
            numGuestsAInput.value,
            numChildrenCInput.value,
            numGuestsI,
            numBedInput.value,
            checkinInput.value,
            checkoutInput.value,
            specialR,
            costCell

        ];

        cells.forEach((cellContent, index) => {
            const newCell = newRow.insertCell(index);
            newCell.textContent = cellContent;
    });
});

//Calculating the current cost for room reservation
    // Room Prices
    const roomPrices = {
        single: 25000,
        double: 35000,
        triple: 40000
    };

    function calculateStayCost() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const contacts = document.getElementById('contacts').value;
        const numGuestsA = parseInt(numGuestsAInput.value) || 0;
        const numChildrenC = parseInt(numChildrenCInput.value) || 0;
        const numGuestsI = document.getElementById('numGuestsI').value;
        const roomType = roomTypeSelect.value;
        const checkIn = new Date(checkinInput.value);
        const checkOut = new Date(checkoutInput.value);
        const numbed = parseInt(numBedInput.value) || 0;
        const specialR = document.getElementById('spr').value;

        function addToFavourites() {
        const favourites ={
            '1. First Name': firstName,
            '2. Last Name': lastName,
            '3. Email Address': email,
            '4. Contact Number': contacts,
            '5. Number of Adult Guests': numGuestsA,
            '6. Number of Children': numChildrenC,
            '7. Number of Infants': numGuestsI,
            '8. Room Type': roomType,
            '9. Check-In Date': checkIn,
            '10. Check-Out Date': checkOut,
            '11. First Name': firstName,
            '12. Number of Extra Beds': numbed,
            '13. Special Requests': specialR
    };
            // Retrieving Existing Room Details From Local Storage
            const existingRoomBookings = JSON.parse(localStorage.getItem('Favourites-Rooms')) || [];
            existingRoomBookings.push(favourites);
        
            // Store Updated Room Booking Details In Local Storage
            localStorage.setItem('Fovourites-Rooms', JSON.stringify(existingRoomBookings));

            alert('Room has been added to favorites!');
        }

        // Event Listener Forv Add To Favourites Button(AfBtn)
        if (AFBtn) {
            AFBtn.addEventListener('click', addToFavourites);
        }

        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const numDays = (checkOut - checkIn) / millisecondsPerDay;

        if (numDays <= 0) {
            alert("Please select valid dates");
            return;
        }

        totalCost = roomPrices[roomType] * numDays + numChildrenC * 5000 * numDays + numbed * 8000 * numDays;

        currentBookingDetails.textContent = `Stay: ${numDays} days`;
        currentBookingCost.textContent = `Cost: Rs. ${totalCost.toFixed(2)}`;

        // Updating overall booking table
        updateOverallBooking(roomType, totalCost, numDays);
    };

    // Update overall booking table function
    function updateOverallBooking(roomType, totalCost, numDays) {
        const newRow = bookingTableBody.insertRow(-1);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.textContent = roomType;
        cell2.textContent = `Rs. ${totalCost.toFixed(2)} (${numDays} days)`;
    }

    // Event Listener For Book Now Button
    if (bookBtn) {
        bookBtn.addEventListener('click', calculateStayCost);
    }

    //Function to calculate loyalty points
    function calculateLoyaltyPoints() {
        const numRooms = bookingTableBody.rows.length; // Number of rooms booked
        let loyaltyPoints = 0; // Initializing loyalty points

        if (numRooms > 3) {
            loyaltyPoints = numRooms * 20;
        }

        // Updating loyalty points text
        if (loyaltyPointsValue) {
            loyaltyPointsValue.textContent = loyaltyPoints;
        }
    }
    // Event Listener for Check Loyalty Points Button
    if (loyaltyBtn) {
        loyaltyBtn.addEventListener('click', calculateLoyaltyPoints);
    }

    //Function to calculate the total cost for adventures
    function calculateTotalCostAdv() {
        let totalAdventureCost = 0;
        const tableBody = document.getElementById('adventure-booking-body');

        // Loop through each row of the table
        for (let i = 0; i < tableBody.rows.length; i++) {
            // Assuming the cost is always in the last cell (index - 1)
            const costCell2 = tableBody.rows[i].cells[tableBody.rows[i].cells.length - 1].textContent;

            const cost1 = parseFloat(costCell2.replace('Rs. ', ''));

            totalAdventureCost += cost1;
        }
        return totalAdventureCost;

    }

    // Function to display the total adventure cost
    function displayTotalCostAdv(totalAdventureCost) {
        const totalCostAdvText = document.getElementById('TotalCostAdvText');
        totalCostAdvText.textContent = `Total Cost: Rs. ${totalAdventureCost.toFixed(2)}`;
    }
    
    const adventureBookingForm = document.querySelector('#Adventure-form');

    //Event listener for the adventures part
    adventureBookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const advFirstNameInput = document.getElementById('advFirstName').value;
        const advLastNameInput = document.getElementById('advLastName').value;
        const numHours = document.getElementById('numHours').value;
        const adventureTypeSelect = document.getElementById('adventure-type-Select');

        const adventureCost = calculateAdventureCost(document.getElementById('adventure-type-Select'));
        const costCell2 = `Rs. ${adventureCost.toFixed(2)}`;

    
        const tableBody = document.getElementById('adventure-booking-body');
    
        const newRow = tableBody.insertRow(-1);

    
        // Gather adventure details into an array
        const cells = [
            advFirstNameInput,
            advLastNameInput,
            adventureTypeSelect.value,
            numAdultsInput.value,
            numChildrenInput.value,
            numGuestsAFInput.value,
            numChildrenCFInput.value,
            numHours,
            costCell2
        ];
    
        cells.forEach((cellContent, index) => {
            const newCell = newRow.insertCell(index);
            newCell.textContent = cellContent;
        });

        const totalAdventureCost = calculateTotalCostAdv();

    // Displaying the updated total adventure cost
    displayTotalCostAdv(totalAdventureCost);
    });
    // Define adventure costs
    const adventureCosts = {
        localAdult: 5000,
        localChild: 2000,
        foreignAdult: 10000,
        foreignChild: 5000,
    };

    function calculateAdventureCost(adventureTypeSelect) {
        let adventureCost = 0;
        const selectedAdventureType = adventureTypeSelect.value;
        const numAdults = parseInt(numAdultsInput.value) || 0;
        const numChildren = parseInt(numChildrenInput.value) || 0;
        const numGuestsAF = parseInt(numGuestsAFInput.value) || 0;
        const numChildrenCF = parseInt(numChildrenCFInput.value) || 0;
        const numHours = parseInt(document.getElementById('numHours').value) || 1;

        function addToFavouritesAdv(){
        const favourites2 = {
            '1.Adventure Type':selectedAdventureType,
            '2.Num Of Adults (Local)':numAdults,
            '3.Number of Children (Local)':numChildren,
            '4.Number of Adults (Foreign)':numGuestsAF,
            '5.Number of Children (Foreign)':numChildrenCF,
            '6.Number of Hours':numHours
        };
                    // Retrieving existing room bookings from local storage
                    const existingRoomBookings = JSON.parse(localStorage.getItem('Favourites-Adventures')) || [];
                    existingRoomBookings.push(favourites2);
                
                    // Storing updated room booking details in local storage
                    localStorage.setItem('Fovourites-Adventures', JSON.stringify(existingRoomBookings));

                    alert('Adventure has been added to favorites!');
                }
        
                // Event listener for the Add to Favorites button (AFBtn)
                if (AFBtnadv) {
                    AFBtnadv.addEventListener('click', addToFavouritesAdv);
        // Calculating total adventure cost based on selected options
        adventureCost +=
            (adventureCosts.localAdult * numAdults +
                adventureCosts.localChild * numChildren +
                adventureCosts.foreignAdult * numGuestsAF +
                adventureCosts.foreignChild * numChildrenCF) * numHours;
        // Checking if guide is needed and add guide cost
        if (document.getElementById('GA').checked ||
            document.getElementById('GC').checked ||
            document.getElementById('GAF').checked ||
            document.getElementById('GCF').checked) {
            adventureCost += (1000 * (numAdults + numGuestsAF) + 500 * (numChildren + numChildrenCF)) * numHours;
        }
        return adventureCost;
    }
        updateAdventureBooking(adventureName, adventureCost, numHours);
    }

    function updateAdventureBooking(adventureName, adventureCost, numHours) {
        const newRow = adventureTableBody.insertRow(-1);

        // Inserting cells into the row
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.textContent = adventureName;
        cell2.textContent = `Rs. ${adventureCost.toFixed(2)} (For ${numHours} hours)`;
    }
    if (getTotalCostBtn) {
        getTotalCostBtn.addEventListener('click', function() {
            const promoCode = promoCodeInput.value;
            const totalRoomReservationCost = calculateTotalCost();

            let totalBill = totalAdventureCost + totalRoomReservationCost;
        
            if (promoCode === 'Promo123') {
                // Apply a 5% discount if the promo code matches
                const discount = totalBill * 0.05;
                totalBill -= discount;
            }
        
            totalBillText.textContent = `Total Bill: Rs. ${totalBill.toFixed(2)}`;
        });
    }
    // Function to reset room booking details
    function resetRoomBookingDetails() {
        currentBookingDetails.textContent = '';
        currentBookingCost.textContent = '';
        bookingTableBody.innerHTML = '';
    }

    // Function to reset adventure booking details
    function resetAdventureBookingDetails() {
        currentBookingDetailsA.textContent = '';
        currentBookingCostA.textContent = '';
        adventureTableBody.innerHTML = '';
    }

    // Function to reset overall booking table
    function resetOverallBookingTable() {
        bookingTableBody.innerHTML = '';
    }

    // Function to reset overall adventure booking table
    function resetOverallAdventureBookingTable() {
        adventureTableBody.innerHTML = '';
    }

    // Event listener for the "AdvBtn" button
    if (AdvBtn) {
        AdvBtn.addEventListener('click', function () {
            const selectedAdventureType = adventureTypeSelect.value;
            const numAdults = parseInt(numAdultsInput.value) || 0;
            const numChildren = parseInt(numChildrenInput.value) || 0;
            const numGuestsAF = parseInt(numGuestsAFInput.value) || 0;
            const numChildrenCF = parseInt(numChildrenCFInput.value) || 0;
            const numHours = parseInt(document.getElementById('numHours').value) || 1;

            const adventureDetails =`Adventure Details:\n` +
            `Adventure Type: ${selectedAdventureType}\n` +
            `Num Of Adults (Local): ${numAdults}\n` +
            `Number of Children (Local): ${numChildren}\n` +
            `Number of Adults (Foreign): ${numGuestsAF}\n` +
            `Number of Children (Foreign): ${numChildrenCF}\n` +
            `Number of Hours: ${numHours}`
            // Calling functions to reset different sections
            resetRoomBookingDetails();
            resetAdventureBookingDetails();
            resetOverallBookingTable();
            resetOverallAdventureBookingTable();
            alert(`Thank you for your booking!\n ${adventureDetails}`);
        });
                }            
        if (advBtn) {
            advBtn.addEventListener('click',function(){
            const adventureCost = calculateAdventureCost(document.getElementById('adventure-type-Select'));
            const totalAdvCost = calculateAdventureCost(adventureTypeSelect);
            
            // Updating totalAdventureCost based on the adventureCost returned from calculateAdventureCost
            totalAdventureCost += adventureCost;
            
            // Displaying total adventure cost
            currentBookingDetailsA.textContent=`Adventure Type: ${adventureTypeSelect.value}`
            currentBookingCostA.textContent = `Adventure Cost: Rs. ${totalAdvCost.toFixed(2)}`;
            updateAdventureBooking(adventureTypeSelect.value, totalAdvCost, parseInt(document.getElementById('numHours').value) || 1);
            displayTotalCostAdv(totalAdvCost);

            });
}});
