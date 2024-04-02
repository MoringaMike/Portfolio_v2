// Sticky Navigation
const navbar = document.querySelector('.navbar');
const navbarOffsetTop = navbar.offsetTop;
const mediaQuery = window.matchMedia('(max-width: 768px)');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > navbarOffsetTop) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

function handleMediaQueryChange(mediaQuery) {
  if (mediaQuery.matches) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
}

mediaQuery.addListener(handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);

// Scroll Down Button
const scrollDownButton = document.querySelector('.scroll-down-button');

scrollDownButton.addEventListener('click', () => {
  const nextSection = document.querySelector('#about');
  nextSection.scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > navbarOffsetTop) {
    scrollDownButton.classList.add('hidden'); // Added missing "DownButton" to the variable name
  } else {
    scrollDownButton.classList.remove('hidden'); // Added missing "DownButton" to the variable name
  }
});

// Smooth Scrolling
const navLinks = document.querySelectorAll('.navbar-links a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// Responsive Navigation
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  toggleButton.classList.toggle('active');
});

// Form Submission
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const name = nameInput.value;
  const email = emailInput.value;

  // Perform form validation
  if (name.trim() === '' || email.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }

  // Send form data to the server
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);

  fetch('submit-form.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      nameInput.value = '';
      emailInput.value = '';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
});