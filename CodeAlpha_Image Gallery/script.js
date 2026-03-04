// Select all gallery image elements
const images = document.querySelectorAll(".gallery-item");
// Select the lightbox container
const lightbox = document.getElementById("lightbox");
// Select the image element inside the lightbox
const lightboxImg = document.getElementById("lightbox-img");
// Select the close button
const closeBtn = document.querySelector(".close");
// Select the previous button
const prevBtn = document.querySelector(".prev");
// Select the next button
const nextBtn = document.querySelector(".next");
// Select all filter buttons for category filtering
const filterButtons = document.querySelectorAll(".filters button");

// Track the current image index displayed in the lightbox
let currentIndex = 0;

// Helper function to get only the images that are currently visible (not filtered out)
function getVisibleImages() {
  return Array.from(images).filter((img) => img.style.display !== "none");
}

function openLightboxAtIndex(index) {
  const visibleImages = getVisibleImages();
  if (!visibleImages.length) return;

  currentIndex = index;
  lightboxImg.src = visibleImages[currentIndex].src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

/* Open Lightbox */
images.forEach((img) => {
  img.addEventListener("click", () => {
    const visibleImages = getVisibleImages();
    const index = visibleImages.indexOf(img);
    if (index === -1) return;

    openLightboxAtIndex(index);
  });
});

/* Close Lightbox */
// Hide the lightbox when the close button is clicked
closeBtn.addEventListener("click", () => {
  closeLightbox();
});

// Navigate to the next image in the lightbox
nextBtn.addEventListener("click", () => {
  const visibleImages = getVisibleImages();
  if (!visibleImages.length) return;

  // Move to the next image, wrap around to the first if at the end
  currentIndex = (currentIndex + 1) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
});

// Navigate to the previous image in the lightbox
prevBtn.addEventListener("click", () => {
  const visibleImages = getVisibleImages();
  if (!visibleImages.length) return;

  // Move to the previous image, wrap around to the end if at the beginning
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
});

// Close when clicking outside the image
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    nextBtn.click();
  }

  if (event.key === "ArrowLeft") {
    prevBtn.click();
  }
});


/* Filter Images (Bonus) */
// Add click listeners to each filter button
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Get the category from the button's data attribute
    const category = btn.dataset.filter;

    // Show or hide images based on the selected category
    images.forEach((img) => {
      if (category === "all" || img.dataset.category === category) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });

    const visibleImages = getVisibleImages();
    if (lightbox.classList.contains("open") && !visibleImages.length) {
      closeLightbox();
      return;
    }

    if (lightbox.classList.contains("open")) {
      currentIndex = 0;
      lightboxImg.src = visibleImages[currentIndex].src;
    }
  });
});
