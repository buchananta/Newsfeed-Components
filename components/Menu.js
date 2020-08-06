import gsap from 'gsap';
// This is the data we will be using, study it but don't change anything, yet.

let menuItems = [
  'Students',
  'Faculty',
  "What's New",
  'Tech Trends',
  'Music',
  'Log Out'
];

/* 
  Step 1: Write a component called 'menuMaker' to create a menu like the markup below:

  <div class="menu">
    <ul>
      {each menu item as an <li>}
    </ul>
  </div>

  The 'menuMaker' takes an array of menu items as its only argument.

  Step 2: Inside the function, iterate over the array creating a list item <li> element for each item in the array.
  Add those items to the <ul>

  Step 3: Still inside your function, select from the DOM the menu button (the element with a class of 'menu-button').

  Step 4: Add a click event listener to the menu button. When clicked it should toggle the class 'menu--open' on div.menu (your div with a 'menu' class).

  Step 5: Don't forget to return your div.menu.

  Step 6: Use 'menuMaker' to create a menu using the 'menuItems' array, and append the returned menu to the header.
*/

function transform(item, tag) {
  const result = document.createElement(tag);
  result.textContent = item;
  return result;
}
function menuMaker(menuItems) {
  const menu = document.createElement('div');
  menu.className = "menu";
  const ulist = document.createElement('ul');
  menu.appendChild(ulist);
  menuItems.forEach(item => ulist.appendChild(transform(item, 'li')));
  //add event listener to menubutton
  const menuBtn = document.querySelector('.menu-button');
  menuBtn.addEventListener('click', () => {
    const menu = document.querySelector('.menu')
    let menuAnimation = new gsap.timeline({paused:true});
    menuAnimation.fromTo(menu, {height: '0vh'}, {height: '100vh', duration: 1});
    if (!menu.classList.contains('menu--open')) {
      menu.classList.add('menu--open');
      menuAnimation.play();
    } else {
      //I could NOT get this to work, until I added the 1..
      //and that's because, I'm actually making a _new_ _event_ 
      //_every_ click!!!! ugh.
      menuAnimation.reverse(1);
      setTimeout(() => menu.classList.remove('menu--open'), 999);
    }
  })
  return menu;
}

const header = document.querySelector('.header');
header.appendChild(menuMaker(menuItems));
