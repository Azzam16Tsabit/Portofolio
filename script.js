console.log("Portfolio loaded");

// Toggle Night/Light Mode dengan icon dan ganti gambar
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');
const profileImg = document.getElementById('profile-img');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLightMode = document.body.classList.contains('light-mode');
  icon.className = isLightMode ? 'fas fa-sun' : 'fas fa-moon';
  profileImg.src = isLightMode ? 'assets/profile1.jpg' : 'assets/profile.jpg';
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

// Load saved theme, icon, dan gambar on page load
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    icon.className = 'fas fa-sun';
    profileImg.src = 'assets/profile1.jpg';
  } else {
    icon.className = 'fas fa-moon';
    profileImg.src = 'assets/profile.jpg';
  }
});

// Event listeners for view buttons: redirect ke page baru
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const project = e.target.getAttribute('data-project');
    if (project === 'scada') {
      window.location.href = 'scada.html';
    } else if (project === 'remote') {
      window.location.href = 'remote.html';
    }
  });
});