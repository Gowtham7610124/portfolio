document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollBtn");

  // Function to check if the user has scrolled enough to display the button
  function toggleScrollBtn() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  }

  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });

  // Function to scroll to the top of the page
  function scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  // Add scroll event listener to the window
  window.addEventListener("scroll", toggleScrollBtn);

  // Add click event listener to the scroll button
  scrollBtn.addEventListener("click", scrollToTop);

  // Initially hide the scroll button on page load
  toggleScrollBtn();
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize TypeIt
  new TypeIt("#typed-text", {
    speed: 200,
    waitUntilVisible: true,
    loop: true,
  })
    .type("web developer.")
    .pause(200)
    .delete(14)
    .type("Freelancer.")
    .delete(10)
    .pause(200)
    .delete(10)
    .type("Quick Leaner.") // Text to be typed
    .go(); // Start typing
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  function showError(el) {
    el.classList.remove("d-none");
  }

  function hideError(el) {
    el.classList.add("d-none");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let isValid = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Reset errors
    hideError(nameError);
    hideError(emailError);
    hideError(messageError);

    // Name validation
    if (!name) {
      showError(nameError);
      isValid = false;
    }

    // Email validation
    if (!email || !isValidEmail(email)) {
      showError(emailError);
      isValid = false;
    }

    // Message validation
    if (!message) {
      showError(messageError);
      isValid = false;
    }

    if (!isValid) return;

    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        successMessage.classList.remove("d-none");
        successMessage.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      alert("❌ Network error. Please try again.");
    }
  });
});
