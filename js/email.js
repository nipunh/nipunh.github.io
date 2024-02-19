(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: vars.EMAILJS_PUBLICKEY,
    });
})();

//  Getting elements
const form = document.getElementById('contact__form');
const userName = document.getElementById('user_name');
const userEmail = document.getElementById('user_email');
const userMessage = document.getElementById('user_message');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false

function validateForm() {
    // Using Contraint API
    isValid = form.checkValidity();
    // Style main message for an error
    if(isValid === false) {
        messageContainer.style.display = 'inline';
        message.textContent ="Please fil out all the fields";
        message.style.color = 'text-color';
    } else if(isValid === true) {
        messageContainer.style.display = 'inline';
        message.textContent ="Your message is being sent";
        message.style.color = 'text-color';
    }
}

 function processFormData(e) {
    e.preventDefault()
    
    // Validating form 
    validateForm();

    // Sending the formdata
    if(isValid === true) {
    emailjs.send(vars.SERVICE_ID, vars.TEMPLATE_ID, {
        name : "Nipun Hedaoo",
        from_name: userName.value,
        email: userEmail.value,
        message: userMessage.value,
    })
    .then(function(response){
        message.textContent ="Thank you very much we will reply to you as soon as possible";
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
        console.log('SUCCES', response.status, response.text);
       form.reset();
    }, function(error){
        console.log("FAILED", error);
    })
    }
 }
 
 //  Add eventlisteners
form.addEventListener('submit', processFormData);
