const url = 'https://jsonplaceholder.typicode.com/users';

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

    if (userArray.length > 0) {
        userArray.forEach((user) => {
            const div = document.createElement('div');
            div.classList.add('col-lg-3', 'col-md-6', 'col-sm-6', 'mb-4');
            let templateString = `
            
                <div class="profile-data">
                    <div class="top-data mb-0 pb-0">
                        <div class="d-block d-md-none">
                            <div class="row">
                                <div class="col-8">
                                    <div class="p-2">
                                        <h3>${user.name}</h3>
                                        <h4>@${user.username}</h4>
                                        <p>
                                            "${user.company.catchPhrase}"
                                        </p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="p-3">
                                        <img src="https://loremflickr.com/500/500?random=${user.id}" class="img-fluid rounded-circle" width="106px">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-none d-md-block mb-0 pb-0">
                            <div class="img-holder">
                                <img src="https://loremflickr.com/500/500?random=${user.id}" class="img-fluid">
                            </div>
                            <div class="p-2 mb-0 pb-0">
                                <h3>${user.name}</h3>
                                <h4>@${user.username}</h4>
                                <p>
                                    "${user.company.catchPhrase}"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-data p-2 mt-0 pt-0">
                        <p>
                            <span class="me-1">
                                <img src="assets/images/mail.png" alt="">
                            </span>
                            ${user.email}
                        </p>
                        <p>
                            <span class="me-1">
                                <img src="assets/images/map.png" alt="">
                            </span>
                            ${user.address.street}, 
                            ${user.address.suite} , 
                            ${user.address.city}, 
                            ${user.address.zipcode}, 
                            ${user.address.geo.lat}, 
                            ${user.address.geo.lng}
                        </p>
                        <p>
                            <span class="me-1">
                                <img src="assets/images/phone.png" alt="">
                            </span>
                            ${user.phone}
                        </p>
                        <p>
                            <span class="me-1">
                                <img src="assets/images/web.png" alt="">
                            </span>
                            ${user.website}
                        </p>
                        <p>
                            <span class="me-1">
                                <img src="assets/images/company.png" alt="">
                            </span>
                            ${user.company.name}
                        </p>
                        <p>
                            <span class="me-1">
                                <img src="assets/images/bs.png" alt="">
                            </span>
                            ${user.company.bs}
                        </p>
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
        displayAll();
    } else {
        fetchUserData().then((data) => {
            const filteredUsers = data.filter((user) => user.name.toLowerCase().includes(searchText));
            displayUsers(filteredUsers);
        });
    }
}

function displayAll() {
    fetchUserData().then((data) => {
        displayUsers(data);
    });
}

function sortUsers(comparator) {
    fetchUserData().then((data) => {
        const sortedUsers = data.slice().sort(comparator);
        displayUsers(sortedUsers);
    });
}

function sortAZ() {
    sortUsers((a, b) => a.name.localeCompare(b.name));
}

function sortZA() {
    sortUsers((a, b) => b.name.localeCompare(a.name));
}

displayAll();