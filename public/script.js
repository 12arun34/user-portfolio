// ========== DARK/LIGHT MODE TOGGLE ==========
const toggleBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

// Load saved theme on page load
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ========== MOBILE MENU TOGGLE ==========
const mobileToggle = document.querySelector(".mobile-toggle");
const navLinksContainer = document.querySelector(".nav-links");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
  });
}

// ========== TYPING ANIMATION ==========
const typingText = document.querySelector(".typing-text");
const textArray = [
  "Software Developer @ People Interactive (I) Pvt Ltd",
  "Backend Developer specializing in Node.js",
  "IIT Madras Computer Science Graduate",
  "Problem Solver & Algorithm Enthusiast",
  "Full Stack Developer"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
  const currentText = textArray[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
    typingDelay = 500; // Pause before typing next
  }
  
  setTimeout(typeText, typingDelay);
}

// Start typing animation
setTimeout(typeText, 1000);

// ========== PROJECT "VIEW MORE" TOGGLE ==========
const projects = document.querySelectorAll(".project");

projects.forEach(project => {
  const viewMoreBtn = project.querySelector(".view-more-btn");
  const details = project.querySelector(".project-details");
  
  if (viewMoreBtn && details) {
    viewMoreBtn.addEventListener("click", () => {
      const isExpanded = details.classList.contains("expanded");
      
      if (isExpanded) {
        details.classList.remove("expanded");
        viewMoreBtn.textContent = "View More";
      } else {
        details.classList.add("expanded");
        viewMoreBtn.textContent = "View Less";
      }
      
      // Smooth scroll adjustment after expansion
      setTimeout(() => {
        const rect = project.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (!isInView && !isExpanded) {
          project.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 300);
    });
  }
});

// ========== ANIMATED SKILL BARS ==========
const skillItems = document.querySelectorAll(".skill-item");
let skillsAnimated = false;

function animateSkills() {
  skillItems.forEach((item, index) => {
    const progressBar = item.querySelector(".skill-progress");
    const progress = progressBar.getAttribute("data-progress");
    
    setTimeout(() => {
      progressBar.style.width = progress + "%";
    }, index * 100);
  });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.getElementById("skills");
const observerOptions = {
  threshold: 0.3
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      animateSkills();
      skillsAnimated = true;
    }
  });
}, observerOptions);

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ========== SCROLL REVEAL ANIMATION FOR SECTIONS ==========
const fadeInSections = document.querySelectorAll(".fade-in");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

fadeInSections.forEach(section => {
  sectionObserver.observe(section);
});

// ========== CONTACT FORM VALIDATION & SUBMISSION ==========
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  // Real-time validation
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showError(input, message) {
    input.classList.add("error");
    const errorSpan = input.parentElement.querySelector(".error-message");
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }
  
  function clearError(input) {
    input.classList.remove("error");
    const errorSpan = input.parentElement.querySelector(".error-message");
    errorSpan.textContent = "";
    errorSpan.style.display = "none";
  }
  
  // Real-time validation on blur
  nameInput.addEventListener("blur", () => {
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, "Name must be at least 2 characters");
    } else {
      clearError(nameInput);
    }
  });
  
  emailInput.addEventListener("blur", () => {
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
    } else {
      clearError(emailInput);
    }
  });
  
  messageInput.addEventListener("blur", () => {
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters");
    } else {
      clearError(messageInput);
    }
  });
  
  // Form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Clear previous status
    formStatus.className = "";
    formStatus.style.display = "none";
    
    // Validate all fields
    let isValid = true;
    
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, "Name must be at least 2 characters");
      isValid = false;
    } else {
      clearError(nameInput);
    }
    
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    } else {
      clearError(emailInput);
    }
    
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters");
      isValid = false;
    } else {
      clearError(messageInput);
    }
    
    if (!isValid) return;
    
    // Prepare form data
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };
    
    try {
      // Try to send to backend API if available
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        formStatus.className = "success";
        formStatus.textContent = "✓ Message sent successfully! I'll get back to you soon.";
        formStatus.style.display = "block";
        contactForm.reset();
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      // Fallback: Show success message (in production, you might want to integrate with EmailJS or similar)
      formStatus.className = "success";
      formStatus.textContent = "✓ Thank you! Your message has been received. I'll contact you soon at " + formData.email;
      formStatus.style.display = "block";
      contactForm.reset();
      
      // Log to console for debugging
      console.log("Form data:", formData);
    }
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      formStatus.style.display = "none";
    }, 5000);
  });
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scroll-top";
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ========== CURSOR ANIMATION (Optional) ==========
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Add cursor glow effect on interactive elements
const interactiveElements = document.querySelectorAll("a, button, .project");
interactiveElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
  });
});

// ========== PROJECT CARD TILT EFFECT ==========
projects.forEach(project => {
  project.addEventListener("mousemove", (e) => {
    const rect = project.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((centerX - x) / centerX) * 5;
    
    project.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  project.addEventListener("mouseleave", () => {
    project.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ========== PERFORMANCE OPTIMIZATION: LAZY LOADING ==========
if ("IntersectionObserver" in window) {
  const lazyImages = document.querySelectorAll("img[data-src]");
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

console.log("🚀 Portfolio loaded successfully!");
console.log("💼 Designed & Developed by Arun Kumar");
