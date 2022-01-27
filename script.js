
const form = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');

const validateText = (input) => {
  if(input.value.trim() === '') { 
    setError(input, 'Du måste ange ett namn')
    return false;
  }
  else if(input.value.trim().length < 2) {
    setError(input, 'Namnet måste innehålla minst två bokstäver')
    return false;
  }
  else {
    setSuccess(input)
    return true;
  }
}

const validateEmail = email => {
  let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if(email.value.trim() === '') {
    setError(email, 'Du måste ange en e-mejladress');
    return false;
  } 
  else if(!regEx.test(email.value)) {
    setError(email, 'E-mejladdressen är inte giltig');
    return false;
  }
  else {
    setSuccess(email)
    return true;
  }
}

const setError = (input, textMessage) => {
  const parent = input.parentElement;
  parent.classList.add('is-invalid');
  parent.classList.remove('is-valid');
  parent.querySelector('.invalid-input').innerText = textMessage;
}

const setSuccess = input => {
  const parent = input.parentElement;
  parent.classList.remove('is-invalid');
  parent.classList.add('is-valid');
}

const validate = input => {
  switch(input.type) {
    case 'text': return validateText(input)
    case 'email': return validateEmail(input)
    default:
      break;
  }
}

const output = document.querySelector('#users');
let users = []

const listUsers = () => {
  output.innerHTML = '';
  users.forEach(user => {
    output.innerHTML += `
      <div id="${user.id}" class="d-flex">
        <p class="h4">${user.Firstname} ${user.Lastname}</p>
        <p class="h6"><u>${user.email}</u></p>
        <br>
        <button type="button" class="btn btn-danger btn-sm ">Ändra</button>
      </div>
    `; 
  })
}

form.addEventListener('submit', e => {
  e.preventDefault();

  errors = []

  for(let i = 0; i < form.length; i++) {
    errors[i] = validate(form[i])
  }
  console.log(errors)

  if(!errors.includes(false)) {
    const user = {
      id: Date.now().toString(),
      Firstname : firstName.value,
      Lastname : lastName.value,
      email : email.value,
    }
  users.push(user);
  listUsers();
  firstName.value = '',
  lastName.value = '',
  email.value = ''
  console.log(user);
  }
})

output.addEventListener('click', e => {
  if(e.target.type === 'button') {
    users = users.filter(user => user.id !== e.target.parentNode.id);
    listUsers();
  }
})