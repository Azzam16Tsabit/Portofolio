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
    if (project === 'barrier-gate') {
      window.location.href = 'barrier-gate.html';
    } else if (project === 'iot-hydroponic') {
      window.location.href = 'iot-hydroponic.html';
    } else if (project === 'tahfizh-leadership') {
      window.location.href = 'tahfizh-leadership.html';
    } else if (project === 'kti') {
      window.location.href = 'kti.html';
    }
  });
});

// Script untuk galeri carousel
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.gallery-slider');
  const images = slider.querySelectorAll('img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelector('.gallery-indicators');
  let currentIndex = 0;

  // Buat indikator titik
  images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('indicator');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(dot);
  });

  const dots = indicators.querySelectorAll('.indicator');

  // Fungsi untuk mendeteksi orientasi dan set style gambar
  function setImageOrientation(img) {
    img.onload = function() {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      if (aspectRatio > 1) {
        // Landscape: gunakan cover
        img.style.objectFit = 'cover';
        img.style.backgroundColor = 'transparent'; // Tidak perlu background hitam
      } else {
        // Portrait: gunakan contain dan background hitam
        img.style.objectFit = 'contain';
        img.style.backgroundColor = '#000'; // Hitamkan sisi kanan-kiri
      }
    };
    // Jika gambar sudah loaded, panggil langsung
    if (img.complete) img.onload();
  }

  // Terapkan pada semua gambar
  images.forEach(setImageOrientation);

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
  });

  // Auto-slide opsional (hapus jika tidak diinginkan)
  setInterval(() => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
  }, 5000); // Ganti setiap 5 detik
});

// Script untuk modal gambar penuh
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const closeBtn = document.querySelector('.modal-close');
  const images = document.querySelectorAll('.gallery-slider img');

  // Fungsi buka modal
  images.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'flex'; // Tampilkan modal
      modalImg.src = this.src; // Set gambar modal ke gambar yang diklik
      modalImg.alt = this.alt;
    });
  });

  // Fungsi tutup modal
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Tutup modal jika klik di luar gambar
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Tutup modal dengan tombol Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });
});

// Fungsi untuk Ikon Kirim Pesan Sticky
document.addEventListener('DOMContentLoaded', function() {
  const messageIcon = document.getElementById('message-icon');
  const socialPopup = document.getElementById('social-popup');
  let isDragging = false;
  let offsetX, offsetY;

  // Fungsi untuk menampilkan popup
  function showPopup() {
    socialPopup.classList.add('show');
  }

  // Fungsi untuk menyembunyikan popup
  function hidePopup() {
    socialPopup.classList.remove('show');
  }

  // Event untuk desktop (hover)
  messageIcon.addEventListener('mouseenter', showPopup);
  messageIcon.addEventListener('mouseleave', function() {
    // Sembunyikan hanya jika tidak hover di popup
    setTimeout(() => {
      if (!socialPopup.matches(':hover')) {
        hidePopup();
      }
    }, 100);
  });

  socialPopup.addEventListener('mouseleave', hidePopup);

  // Event untuk mobile (tap)
  messageIcon.addEventListener('touchstart', function(e) {
    e.preventDefault();
    showPopup();
  });

  // Sembunyikan popup saat tap di luar
  document.addEventListener('touchstart', function(e) {
    if (!messageIcon.contains(e.target) && !socialPopup.contains(e.target)) {
      hidePopup();
    }
  });

  // Draggable untuk desktop (mouse)
  messageIcon.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - messageIcon.offsetLeft;
    offsetY = e.clientY - messageIcon.offsetTop;
    messageIcon.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      messageIcon.style.left = (e.clientX - offsetX) + 'px';
      messageIcon.style.top = (e.clientY - offsetY) + 'px';
      messageIcon.style.right = 'auto'; // Reset posisi default
      messageIcon.style.bottom = 'auto';
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    messageIcon.style.cursor = 'pointer';
  });

  // Draggable untuk mobile (touch)
  messageIcon.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      const touch = e.touches[0];
      offsetX = touch.clientX - messageIcon.offsetLeft;
      offsetY = touch.clientY - messageIcon.offsetTop;
    }
  });

  document.addEventListener('touchmove', function(e) {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      messageIcon.style.left = (touch.clientX - offsetX) + 'px';
      messageIcon.style.top = (touch.clientY - offsetTop) + 'px';
      messageIcon.style.right = 'auto';
      messageIcon.style.bottom = 'auto';
    }
  });

  document.addEventListener('touchend', function() {
    isDragging = false;
  });
});