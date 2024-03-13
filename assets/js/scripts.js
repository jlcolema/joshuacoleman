/* https://www.slingacademy.com/article/javascript-get-the-width-height-of-the-window/#What_if_the_window_gets_resized_by_the_user */

const updateWindowDimensions = () => {

	const width = window.innerWidth;
	const height = window.innerHeight;

	// display the values
	document.getElementById('width').innerHTML = width;
	document.getElementById('height').innerHTML = height;

}

// call the function on page load
window.onload = updateWindowDimensions;

// listen on resize event
window.addEventListener('resize', updateWindowDimensions);
