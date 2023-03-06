let rating = document.querySelector('.ratings span');
rating = parseFloat(rating.innerHTML);

let ratingPercentage = rating * 10;
ratingPercentage += '%';

let stars = document.getElementsByClassName('stars-inner');
stars[0].style.width = ratingPercentage;

//navboxes

let navBoxes = document.getElementsByClassName('navboxes');
let products = document.getElementById('products');
let upload = document.getElementById('upload');
let edit = document.getElementById('editProducts');
let editbtn = document.getElementById('edit');


function productsShow() {
	navBoxes[0].classList.add('navcolor');
	navBoxes[1].classList.remove('navcolor');
	navBoxes[2].classList.remove('navcolor');
    products.classList.add('show');
    upload.classList.remove('show');
    edit.classList.remove('show');
}

function uploadShow() {
	navBoxes[1].classList.add('navcolor');
	navBoxes[0].classList.remove('navcolor');
	navBoxes[2].classList.remove('navcolor');
	products.classList.remove('show');
    upload.classList.add('show');
    edit.classList.remove('show');
}

function editShow() {
	navBoxes[2].classList.add('navcolor');
	navBoxes[1].classList.remove('navcolor');
	navBoxes[0].classList.remove('navcolor');
	products.classList.remove('show');
    upload.classList.remove('show');
    edit.classList.add('show');
}

navBoxes[0].addEventListener('click',productsShow);
navBoxes[1].addEventListener('click',uploadShow);
navBoxes[2].addEventListener('click',editShow);
editbtn.addEventListener('click',editShow);

//userdata

let user = JSON.parse(localStorage.getItem('user'));

document.getElementById('name').innerHTML = `<h1>${user.username}</h1>`;

//edit profile

const nameEdit = document.getElementById('name-edit');
const phoneEdit = document.getElementById('phone-edit');
const emailEdit = document.getElementById('email-edit');

nameEdit.value = `${user.username}`;
phoneEdit.value = `${user.phone}`;
emailEdit.value = `${user.email}`;


const saveBtn = document.getElementById('save');

function saveChanges(event){
	event.preventDefault();
	user.username = nameEdit.value;
	const userUpdated = JSON.stringify(user);
	localStorage.setItem('user',userUpdated);
}

saveBtn.addEventListener('click',saveChanges);

//location detection

const box = document.getElementById('arrow-downBox')

const city = document.getElementById('city');

const successfulLookup = (position) => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6fb98deaf8b54d719c0330a5a44a6ac3`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('city', (data.results[0].components.city));
        const cityName = localStorage.getItem('city');    
        city.value = `${cityName}`;
    });
}

box.addEventListener('click',function(){  
    navigator.geolocation.getCurrentPosition(successfulLookup, console.log);
});

if(localStorage.getItem('city') != null){
    const cityName = localStorage.getItem('city');    
    city.innerHTML = `${cityName}`;
}

//upload product   
const form= document.getElementById('upload-product-form')
form.addEventListener('submit',function(event){
    event.preventDefault()
    const formData = new FormData(form)
    const name = formData.get('name')
    const description=formData.get('description')
    const price = formData.get('price')
    const image = formData.get('image')
    const product = {
        name,
        description,
        price,
        image,
    }
    fetch('/api/seller/upload', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(createdUser => {
        console.log(createdUser)
        window.location.href = "http://localhost:3000/profile-seller"
    })
})