document.addEventListener('DOMContentLoaded', getUsers);

function getUsers() {
    fetch('https://dummyjson.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const usersArray = Array.isArray(data.users) ? data.users : [];
            displayUsers(usersArray);
        })
        .catch(error => console.error('Error fetching or parsing data:', error));
}

function displayUsers(users) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (!Array.isArray(users)) {
        console.error('Data received is not an array');
        return;
    }

    if (users.length === 0) {
        console.log('No products found.');
        return;
    }

    users.forEach(user => {
        const productRow = document.createElement('tr');

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = user.firstName;

        const maidenNameCell = document.createElement('td');
        maidenNameCell.textContent = user.maidenName;

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = user.lastName;

        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = user.image;
        image.alt = user.firstName;
        imageCell.appendChild(image);

        productRow.appendChild(firstNameCell);
        productRow.appendChild(maidenNameCell);
        productRow.appendChild(lastNameCell);
        productRow.appendChild(imageCell);

        productList.appendChild(productRow);
    });
}

function searchUsers() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            const usersArray = Array.isArray(data.users) ? data.users : [];
            const filteredUsers = usersArray.filter(user => {
                return user.firstName.toLowerCase().includes(searchTerm);
            });
            displayUsers(filteredUsers);
        })
        .catch(error => console.error('Error fetching data:', error));
}
