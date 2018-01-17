
let otherSelect = document.getElementById('title');

const newTextField = document.createElement('input');
newTextField.id = 'other-title';
newTextField.type = 'textfield';
newTextField.placeholder = "Your Job Role";
otherSelect.parentNode.append(newTextField);

const shirtColorMenu = document.getElementById('colors-js-puns');
const shirtColors = document.querySelector("select[id='color']");
const color = shirtColors.children;
const shirtStyleMenu = document.querySelector('select[name="user_design"]');

// function to put focus on an element on the form
function getFocus(id) {
	document.getElementById(id).focus();
}

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

classList.addEventListener('change', () => {
    const box = event.target;
    const boxChecked = box.checked;
    const time = box.parentElement.className; 
    for (let i = 0; i < classesByTime[time].length; i++) {
        classesByTime[time][i].disabled = (boxChecked && classesByTime[time][i] !== box);
    }
});



//call the function on the #name id to put focus on the first text input
getFocus('name');