
////FOCUS////

// function to put focus on an element on the form
function getFocus(id) {
	document.getElementById(id).focus();
}

////OTHER TEXT FIELD////

//variables used with the other textfield functionality
let otherSelect = document.getElementById('title');
const newTextField = document.createElement('input');
newTextField.id = 'other-title';
newTextField.type = 'textfield';
newTextField.placeholder = "Your Job Role";
otherSelect.parentNode.append(newTextField);

// hides text field until user checks 'other' from the dropdown menu
newTextField.style.display = 'none';	

// event listener to display the text field or keep it hidden if 'other' is not selected
otherSelect.addEventListener('change', (e) => {
	if (e.target.value === "other") {
		newTextField.style.display = '';	
	} else {
	 	newTextField.style.display = 'none';
	}
});

////SHIRT COLOR MENU////

// variables used with the colr options menu
const shirtColorMenu = document.getElementById('colors-js-puns');
const shirtColors = document.querySelector("select[id='color']");
const color = shirtColors.children;
const shirtStyleMenu = document.querySelector('select[name="user_design"]');
// Hides the color dropdown menu 
shirtColorMenu.style.display = 'none';

// displays the color dropdown menu is a style is selected
shirtStyleMenu.addEventListener('change', (e) => {
	shirtColorMenu.style.display = '';
	//loop through array of shirt colors to check for class and display matching elements
	if (e.target.value === "js puns") {
		for (let i = 0; i < color.length; i += 1) {
			if (color[i].className === "jspun") {
				color[0].selected = true;
				color[i].style.display = '';
			} else {
				color[i].style.display = 'none';
			}
		}
	} else if (e.target.value === "heart js") {
		for (let i = 0; i < color.length; i += 1) {
			if (color[i].className === "jsheart") {
				color[3].selected = true;
				color[i].style.display = '';
			} else {
				color[i].style.display = 'none';
			}
		}
	} else {
		shirtColorMenu.style.display = 'none';
	}
});

////CLASS CONFLICTS FUNCTION////

const classList = document.querySelector('.activities');
const classes = classList.children;

// arrays for classes at the same time
const classTimes = ['tue-morning', 'tue-afternoon', 'wed-morning', 'wed-afternoon', 'main'];
const classesByTime = {};
for (let i in classTimes) {
    classesByTime[classTimes[i]] = [];
}

// loop to separate classes into arrays
for (let i = 0; i < classes.length; i += 1) {
    const time = classes[i].className;
    if (classesByTime[time]) { 
    	classesByTime[time].push(classes[i].firstElementChild); 
    }
}

// disable checkboxes with the same class
classList.addEventListener('change', () => {
    const box = event.target;
    const boxChecked = box.checked;
    const time = box.parentElement.className; 
    for (let i = 0; i < classesByTime[time].length; i++) {
        classesByTime[time][i].disabled = (boxChecked && classesByTime[time][i] !== box);
    }
});

////PRICE SPAN////

// function to total the cost of classes
let conPrice = 0;
let shopPrice = 0;
const totalLabel = document.createElement('span');
function totalCost(conPrice, shopPrice) {
	const totalPrice = conPrice + shopPrice;
	totalLabel.innerText = '';
	totalLabel.innerText = 'Total Due: $' + totalPrice;
	classList.appendChild(totalLabel);
}

// event listener to show the total price as the boxes are checked
classList.addEventListener('change', () => {
	const box = event.target;
	const boxChecked = box.checked;
	for (let i = 2; i < classes.length; i ++) {
		if (classes[1].firstElementChild === box) {
			if (boxChecked) {
				conPrice = 200;
			} else {
				conPrice = 0;
			}
		} else if (classes[i].firstElementChild === box) {
			if (boxChecked) {
				shopPrice += 100;
			} else {
				shopPrice -= 100;
			}
		}
	}
	totalCost(conPrice, shopPrice);
});

////PAYMENT OPTIONS////

const paymentType = document.querySelector('select[id="payment"]');

const creditCard = document.querySelector('.credit-card');
const creditNumber = document.querySelector('#cc-num');
const creditZip = document.querySelector('#zip');
const creditCVV = document.querySelector('#cvv');

const payPal = document.querySelector('.paypal');
const bitcoin = document.querySelector('.bitcoin');

// function to make credit card the default payment option
function defaultPayment() {
	const selection = paymentType.children;
	selection[1].selected = true;
	payPal.style.display = 'none';
	bitcoin.style.display ='none';
}

// changes the payment type based on selection
paymentType.addEventListener('change', () => {
	const payment = event.target;
	if (payment.value === 'credit card') {
		creditCard.style.display = '';
		payPal.style.display = 'none';
		bitcoin.style.display ='none';
	}else if (payment.value === 'paypal') {
		creditCard.style.display = 'none';
		payPal.style.display = '';
		bitcoin.style.display ='none';
	} else if (payment.value === 'bitcoin') {
		creditCard.style.display = 'none';
		payPal.style.display = 'none';
		bitcoin.style.display ='';
	}
});

////FORM VALIDATION////

const submitButton = document.querySelector('button');
const nameInput = document.querySelector('#name');
const emailLabel = document.querySelector('.email');
const emailInput = document.querySelector('#mail');
const errorAlert = document.querySelector('.formError');

// checks for errors on the entire form
submitButton.addEventListener('click', (e) => {
	const name = nameInput.value;
	const email = emailInput.value;
	const creditNum = creditNumber.value;
	const cvvNum = creditCVV.value;
	const zipNum = creditZip.value;

	if (name === '') {
		nameInput.className = 'error';
		e.preventDefault();
	} else {
		nameInput.className = '';
	}
	if (email === '') {
		emailInput.className = 'error';
		e.preventDefault();
	} else {
		emailInput.className = '';
	}
	if (conPrice + shopPrice < 1) {
		e.preventDefault();
		alertMessage(errorAlert, 'Please choose at least one');
	} else {
		removeErrorMsg(errorAlert);
	}
	if (paymentType.value === 'credit card') {
		if (isNaN(creditNum) || creditNum.length < 13 || creditNum.length > 16) {
			e.preventDefault();
			creditNumber.className = 'error';
		} else {
			creditNumber.className = '';
		}
		if (isNaN(zipNum) || zipNum.length !== 5) {
			e.preventDefault();
			creditZip.className = 'error';
		} else {
			creditZip.className = '';
		}
		if (isNaN(cvvNum) || cvvNum.length !== 3) {
			e.preventDefault();
			creditCVV.className = 'error';
		} else {
			creditCVV.className = '';
		}
	}
});

// alert message shown if field not complete
function alertMessage(n, text) {
	const errorMsg = document.createElement('span');
	if (n.firstElementChild) {
		n.firstElementChild.remove();
	}
	errorMsg.className = 'error-Message'
	errorMsg.innerText = text;
	n.appendChild(errorMsg);
}

//removes error message when field is completed
function removeErrorMsg(n) {
	if (n.firstElementChild) {
		n.firstElementChild.remove();
	}
}

// checks for valid email
emailInput.addEventListener('keyup', () => {
	const mail = emailInput.value;
	if (mail.indexOf('@') === -1 || mail.indexOf('.') === -1) {
		emailInput.style.background = 'tomato';
		alertMessage(emailLabel, 'Please enter email in the correct format');
	} else {
		emailInput.style.background = '';
		removeErrorMsg(emailLabel);
	}
});

//call the function on the #name id to put focus on the first text input
getFocus('name');

// call to set the default payment method to credit card
defaultPayment();














