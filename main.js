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

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic Validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

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
        alert("❌ Error: " + (result.message || "Something went wrong."));
      }
    } catch (error) {
      alert("❌ Network error. Please try again.");
    }
  });
});
