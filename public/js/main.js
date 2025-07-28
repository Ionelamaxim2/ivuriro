let currentSlide = 0;

function scrollResults(direction) {
  const track = document.querySelector(".results-grid");
  const card = document.querySelector(".result-card");

  if (!track || !card) return;

  const cardWidth = card.offsetWidth + 20;
  track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
}

function filterResultsGallery(category, event) {
  const cards = document.querySelectorAll(".result-card-gallery3");
  const buttons = document.querySelectorAll(".filter-btn-gallery3");

  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach((card) => {
    if (category === "all" || card.classList.contains(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function showSlide(index) {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");

  if (!track || slides.length === 0) return;

  const totalSlides = slides.length;

  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  const offset = -currentSlide * 100;
  track.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768 && document.querySelector(".carousel-track")) {
    showSlide(currentSlide);
  }

  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-nav");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  const cookiePopup = document.getElementById("cookiePopup");
  const allowBtn = document.querySelector(".acceptButton");
  const declineBtn = document.querySelector(".declineButton");
  const openPolicy = document.getElementById("openPolicy");
  const cookieModal = document.getElementById("cookieModal");
  const closeModal = document.getElementById("closeModal");

  if (cookiePopup && !localStorage.getItem("cookieConsent")) {
    cookiePopup.style.display = "flex";
  } else if (cookiePopup) {
    cookiePopup.style.display = "none";
  }

  allowBtn?.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    cookiePopup.style.display = "none";
  });

  declineBtn?.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined");
    cookiePopup.style.display = "none";
  });

  openPolicy?.addEventListener("click", (e) => {
    e.preventDefault();
    cookieModal.style.display = "flex";
  });

  closeModal?.addEventListener("click", () => {
    cookieModal.style.display = "none";
  });

  const openPrivacy = document.getElementById("openPrivacy6");
  const openTerms = document.getElementById("openTerms6");
  const privacyModal = document.getElementById("privacyModal6");
  const termsModal = document.getElementById("termsModal6");

  openPrivacy?.addEventListener("click", (e) => {
    e.preventDefault();
    privacyModal.style.display = "flex";
  });

  openTerms?.addEventListener("click", (e) => {
    e.preventDefault();
    termsModal.style.display = "flex";
  });

  document.querySelectorAll(".closeModalBtn6").forEach((btn) => {
    btn.addEventListener("click", () => {
      privacyModal && (privacyModal.style.display = "none");
      termsModal && (termsModal.style.display = "none");
    });
  });

  document.querySelectorAll(".modalOverlay6").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const message = this.message.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s()-]{7,15}$/;

    let errors = [];

    if (name.length < 2) {
      errors.push("Name must be at least 2 characters.");
    }

    if (!emailRegex.test(email)) {
      errors.push("Enter a valid email address.");
    }

    if (phone && !phoneRegex.test(phone)) {
      errors.push("Enter a valid phone number.");
    }

    if (message.length < 10) {
      errors.push("Message must be at least 10 characters.");
    }

    if (errors.length > 0) {
      e.preventDefault();
      alert(errors.join("\n"));
    }
  });
const successCard = document.querySelector(".card8");
const errorCard = document.querySelector(".card8.error8");
const form = document.querySelector(".contact-form");
const submitBtn = form?.querySelector("button[type='submit']");

if (successCard || errorCard) {
  if (submitBtn) submitBtn.style.display = "none";

  setTimeout(() => {
    if (successCard) successCard.style.display = "none";
    if (errorCard) errorCard.style.display = "none";
    if (submitBtn) submitBtn.style.display = "inline-block";
  }, 5000);
}

const cards = document.querySelectorAll(".tilt-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
});
