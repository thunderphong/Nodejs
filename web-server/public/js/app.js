console.log('client side js is loaded');

const form = document.querySelector('form');
const input = document.querySelector('input');
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = input.value;
    result1.textContent = 'Loading...';
    result2.textContent = 'Loading...';

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location))
    .then(res => 
        res.json().then(data => {
            if (data.error) {
                result1.textContent = data.error;
                result2.textContent = '';  
            } else {
                result1.textContent = data.data;
                result2.textContent = data.location;
            }
            
        })
    )
    .catch(err => console.error(err));
})

