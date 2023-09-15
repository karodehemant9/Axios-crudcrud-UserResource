// Load existing users from local storage
//const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

//Load existing users from crud crud server
let users;
let storedUsers = axios.get("https://crudcrud.com/api/e4d17aeaaea04f98ba8a17771d0cbe39/appointmentData");
storedUsers
.then((response) => {
    users = [...response.data] || [];
    console.log(response);
    
    // Display existing users on page load
    displayUsers();  
})
.catch((error) => console.log(error));


// Function to save users to local storage
// function saveUsersToLocalStorage() {
//     localStorage.setItem('users', JSON.stringify(users));
// }

// Function to save users to Crud Crud server 
function saveUsersToCrudCrudServer(user) {
    axios.post("https://crudcrud.com/api/e4d17aeaaea04f98ba8a17771d0cbe39/appointmentData", user)
    .then((response) => {
        // Display the updated list
        location.reload();
        displayUsers();
        console.log(response);
    })
    .catch((error) => console.log(error));   
}


function deleteUsersFromCrudCrudServer(userID) {
    axios.delete(`https://crudcrud.com/api/e4d17aeaaea04f98ba8a17771d0cbe39/appointmentData/${userID}`)
    .then((response) => {
        console.log(response);
        location.reload();
        displayUsers();

    })
    .catch((error) => console.log(error));   
}


// Function to add an user to the list
function addUser(name, email, phoneNumber) {
    users.push({name, email, phoneNumber});
    //saveUsersToLocalStorage();
    const newUser = {'name' : name, 'email': email, 'phoneNumber': phoneNumber};
    saveUsersToCrudCrudServer(newUser);
}

// Function to display the submitted details
function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const userElement = document.createElement('div');
        userElement.className = 'alert alert-info';

        // Display user details
        userElement.innerHTML = `
            <p><strong>name:</strong> ${user.name}</p>
            <p><strong>email:</strong> ${user.email}</p>
            <p><strong>phoneNumber:</strong> ${user.phoneNumber}</p>
        `;

        // Create Delete and Edit buttons with margin
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger delete-edit-buttons';
        deleteButton.textContent = 'Delete User';
        deleteButton.addEventListener('click', () => {
            // Remove the user from the array and re-display the list
           // users.splice(index, 1);
            deleteUsersFromCrudCrudServer(user._id);
            //saveUsersToLocalStorage();
            //saveUsersToCrudCrudServer();
        });

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning delete-edit-buttons';
        editButton.textContent = 'Edit User';
        editButton.addEventListener('click', () => {
            // Edit the user when the "Edit user" button is clicked
            editUser(index);
        });

        userElement.appendChild(deleteButton);
        userElement.appendChild(editButton);

        userList.appendChild(userElement);
    });
}

// Function to edit an user
function editUser(index) {
    const editedUser = users[index];
    const userForm = document.getElementById('userForm');

    // Populate the form with the selected user's details
    document.getElementById('userName').value = editedUser.name;
    document.getElementById('userEmail').value = editedUser.email;
    document.getElementById('userPhoneNumber').value = editedUser.phoneNumber;

    // Change the form submit button to "Save Changes"
    userForm.querySelector('button[type="submit"]').textContent = 'Save Changes';

    // When the form is submitted again, update the user
    userForm.removeEventListener('submit', handleUserSubmission);

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const phoneNumber = parseFloat(document.getElementById('userPhoneNumber').value);

        if (name === null || email === null || phoneNumber === null) {
            alert('Please fill in all fields with valid data.');
        } else {
            // Update the selected user
            users[index] = { name, email, phoneNumber };
            //saveUsersToLocalStorage();
            const tempUser = {name, email, phoneNumber};
            saveUsersToCrudCrudServer(tempUser);
            // Reset the form and button text
            userForm.reset();
            userForm.querySelector('button[type="submit"]').textContent = 'Submit';
            // Re-display the list
            displayUsers();
            
        }
    });
}

// Handle form submission
function handleUserSubmission(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phoneNumber = parseFloat(document.getElementById('userPhoneNumber').value);

    if (name === null || email === null || phoneNumber === null) {
        alert('Please fill in all fields with valid data.');
    } else {
        // Add the user to the list
        addUser(name, email, phoneNumber);
        // Reset the form
        e.target.reset();
        
    }
}

const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', handleUserSubmission);




