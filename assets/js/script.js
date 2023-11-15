const url = 'https://jsonplaceholder.typicode.com/users';

let currentSortingOrder = null; // Variable to store the current sorting order
let displayedUsers = []; // Variable to store the currently displayed users
let allUsers = []; // Variable to store all users

function fetchUserData() {
    return fetch(url)
        .then((response) => response.json())
        .catch(function (error) {
            console.log('Error:', error);
            return [];
        });
}

function displayUsers(userArray) {
    const displayUsers = document.getElementById('allUsers');
    const dFrag = document.createDocumentFragment();
    displayUsers.innerHTML = '';
    
    // Sort the displayedUsers based on the currentSortingOrder
    if (currentSortingOrder) {
        userArray.sort(currentSortingOrder);
    }

    if (userArray.length > 0) {
        userArray.forEach((user) => {
            const div = document.createElement('div');
            div.classList.add('col-lg-3','col-md-6','col-sm-6', 'profile-data-holder');
            let templateString = `
            
                <div class="profile-data">
                    <div class="top-data mb-0 pb-0">
                        <div class="d-block d-md-none">
                            <div class="row">
                                <div class="col-8">
                                    <div class="t-data">
                                        <h3>${user.name}</h3>
                                        <h4>@${user.username}</h4>
                                        <p>
                                            "${user.company.catchPhrase}"
                                        </p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="p-3">
                                        <img src="https://loremflickr.com/500/500/man?random=${user.id}" class="img-fluid rounded-circle" width="106px">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-none d-md-block mb-0 pb-0">
                            <div class="img-holder">
                                <img src="https://loremflickr.com/500/500/man?random=${user.id}" class="img-fluid">
                            </div>
                            <div class="mb-0 pb-0 t-data">
                                <h3>${user.name}</h3>
                                <h4>@${user.username}</h4>
                                <p>
                                    "${user.company.catchPhrase}"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-data mt-0 pt-0">
                        <div class="d-flex">
                            <p class="gap">
                                <span>
                                    <img src="assets/images/mail.png" alt="">
                                </span>
                            </p>
                            <p>
                                ${user.email}
                            </p>
                        </div>

                        <div class="d-flex">
                            <p class="gap">
                                <span>
                                    <img src="assets/images/map.png" alt="">
                                </span>
                            </p>
                            <p>
                                ${user.address.street}, 
                                ${user.address.suite} , 
                                ${user.address.city}, 
                                ${user.address.zipcode}, 
                                ${user.address.geo.lat}, 
                                ${user.address.geo.lng}
                            </p>
                        </div>
                        <div class="d-flex">
                            <p class="gap">
                                <span>
                                    <img src="assets/images/phone.png" alt="">
                                </span>
                            </p>
                            <p>
                                ${user.phone}
                            </p>
                        </div>
                        <div class="d-flex">
                            <p class="gap">
                                <span>
                                    <img src="assets/images/web.png" alt="">
                                </span>
                            </p>
                            <p>
                                ${user.website}
                            </p>
                        </div>
                        <div class="d-flex">
                            <p class="gap">
                                <span>
                                    <img src="assets/images/company.png" alt="">
                                </span>
                            </p>
                            <p>
                                ${user.company.name}
                            </p>
                        </div>
                        <div class="d-flex">
                            <p class="gap">
                                <span>
                                    <img src="assets/images/bs.png" alt="">
                                </span>
                            </p>
                            <p>
                                ${user.company.bs}
                            </p>
                        </div>
                    </div>
                </div>
        `;
            div.innerHTML = templateString;
            dFrag.appendChild(div);
        });
        displayUsers.append(dFrag);
    } else {
        const div = document.createElement('div');
        div.classList.add('col-12', 'mb-4');
        let templateString = `
            <div class="alert alert-info">
                Sorry, no results found. Please try searching another name.
            </div>
        `;
        div.innerHTML = templateString;
        dFrag.appendChild(div);
        displayUsers.append(dFrag);
    }
}

function filterByName() {
    const searchText = document.getElementById('search').value.toLowerCase();
    if (searchText === '' || searchText === null) {
        // If there is no search text, clear the search filter and display all users
        clearSearchFilter();
    } else {
        const filteredUsers = allUsers.filter((user) => user.name.toLowerCase().includes(searchText));
        displayedUsers = filteredUsers; // Update the currently displayed users
        displayUsers(filteredUsers);
    }
}

function clearSearchFilter() {
    displayedUsers = allUsers; // Use all users when the search is cleared
    displayUsers(allUsers);
}

function displayAll() {
    if (displayedUsers.length > 0) {
        // If there are displayed users, sort and display them
        sortDisplayedUsers();
    } else {
        // If no displayed users, fetch and display all users
        fetchUserData().then((data) => {
            allUsers = data; // Store all users
            displayedUsers = data; // Update the currently displayed users
            displayUsers(data);
        });
    }
}


function sortUsers(comparator) {
    displayedUsers.sort(comparator); // Sort only the displayed users
    currentSortingOrder = comparator; // Update the current sorting order
    displayUsers(displayedUsers);
}


function sortDisplayedUsers() {
    if (currentSortingOrder) {
        displayedUsers.sort(currentSortingOrder); // Sort only the displayed users
        displayUsers(displayedUsers);
    }
}

function sortAZ() {
    sortUsers((a, b) => a.name.localeCompare(b.name));
}

function sortZA() {
    sortUsers((a, b) => b.name.localeCompare(a.name));
}



displayAll();
