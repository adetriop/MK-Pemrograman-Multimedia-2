document.addEventListener('DOMContentLoaded', getusers);

function getusers() {
    
    //     fetch('https://adetrio.online/ci4/public/akun') // Ganti URL_REST_API dengan URL yang sesuai
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`Respons jaringan tidak baik: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log('Data yang diterima dari REST API:', data);
    //             if (!Array.isArray(data)) {
    //                 throw new Error('Data yang diterima bukan merupakan array');
    //             }
    //             displayusers(data);
    //         })
    //         .catch(error => console.error('Kesalahan mengambil atau memparsing data:', error));
    
    // }
    
    fetch('https://dummyjson.com/users') // Ganti URL_REST_API dengan URL yang sesuai
        .then(response => {
            if (!response.ok) {
                throw new Error(`Respons jaringan tidak baik: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data yang diterima dari REST API:', data);

            // Mengecek apakah ada properti 'users' yang berupa array
            const usersArray = Array.isArray(data.users) ? data.users : [];

            if (usersArray.length === 0) {
                console.log('Tidak ada produk yang ditemukan.');
                // Tindakan yang sesuai, seperti menampilkan pesan atau menghentikan eksekusi
                return;
            }

            displayusers(usersArray);
        })
        .catch(error => console.error('Kesalahan mengambil atau memparsing data:', error));
}

function displayusers(users) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    console.log('Menampilkan produk:', users);

    if (!Array.isArray(users)) {
        console.error('Data yang diterima bukan merupakan array');
        return;
    }

    if (users.length === 0) {
        console.log('Tidak ada produk yang ditemukan.');
        // Tindakan yang sesuai, seperti menampilkan pesan atau menghentikan eksekusi
        return;
    }

    users.forEach(user => {
        console.log('Detail produk:', user);
        const productCard = document.createElement('div');
        productCard.classList.add('users');

        const firstName = document.createElement('h3');
        firstName.textContent = user.firstName;

        const maidenName = document.createElement('p');
        maidenName.textContent = user.maidenName;

        const lastName = document.createElement('p');
        lastName.textContent = user.lastName;

        const image = document.createElement('img');
        image.src = user.image[0]; // Menggunakan gambar pertama dari array images

        productCard.appendChild(firstName);
        productCard.appendChild(maidenName);
        productCard.appendChild(lastName);
        productCard.appendChild(image);
        productList.appendChild(productCard);
    });

}

function searchUsers() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://dummyjson.com/users') // Ganti URL_REST_API dengan URL yang sesuai
        .then(response => response.json())
        .then(data => {
            const usersArray =Array.isArray(data.users) ? data.users:[];
            const filteredUsers = usersArray.filter(user => {
                return user.firstName.toLowerCase().includes(searchTerm);
            });
            displayusers(filteredUsers);
        })
        .catch(error => console.error('Error fetching data:', error));
}
