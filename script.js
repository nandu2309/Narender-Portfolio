const words = ["MIS Executive", "Google Sheet Automator", "Front-end Developer", "Freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const span = document.querySelector(".typing-text span");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    span.textContent = currentWord.substring(0, charIndex);

    let typingSpeed = 70;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);


//Resume
const openModalBtn = document.getElementById("openModalBtn");
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("resumeModal");
  const viewer = document.getElementById("pdfViewer");
  const downloadBtn = document.getElementById("downloadBtn");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    loadPDF("resume.pdf");
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    viewer.innerHTML = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      viewer.innerHTML = "";
    }
  });

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "resume.pdf";
    link.download = "Narender Resume.pdf";
    link.click();
  });

  function loadPDF(url) {
    const pdfjsLib = window["pdfjs-dist/build/pdf"];
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    pdfjsLib.getDocument(url).promise.then(pdf => {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          viewer.appendChild(canvas);

          page.render({
            canvasContext: context,
            viewport: viewport
          });
        });
      }
    });
  }



//Nav bar
const header = document.querySelector("header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY === 0) {
    // Page top pe ho — navbar show ho
    header.classList.add("show");
  } else if (currentScrollY > lastScrollY) {
    // Scrolling down — navbar hide ho
    header.classList.remove("show");
  } else if (currentScrollY < lastScrollY) {
    // Scrolling up — navbar show ho
    header.classList.add("show");
  }

  lastScrollY = currentScrollY;
});

// By default navbar should be visible on page load
window.addEventListener("load", () => {
  header.classList.add("show");
});


  //Bugger
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', (e) => {
  e.stopPropagation(); // burger click pe event body tak na jaye
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Nav ke andar click hone par menu close na ho
nav.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Body ke kisi bhi khaali jagah pe click ho to menu band ho jaye
document.addEventListener('click', () => {
  burger.classList.remove('open');
  nav.classList.remove('open');
});


//Project video auto push
document.querySelectorAll('.video-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const videoSrc = this.getAttribute('data-video');
      const modal = document.getElementById('video-modal');
      const video = document.getElementById('modal-video');

      video.src = videoSrc;
      modal.style.display = 'flex';
      video.play();
    });
  });

  // Close modal on clicking X
  document.querySelector('.video-modal-close').addEventListener('click', function () {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');

    video.pause();
    video.src = '';
    modal.style.display = 'none';
  });

  // Close modal on clicking outside video
  window.addEventListener('click', function (e) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    if (e.target === modal) {
      video.pause();
      video.src = '';
      modal.style.display = 'none';
    }
  });



  /*close icon*/
  
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeBtn = document.querySelector('.video-modal-close');
    const videoButtons = document.querySelectorAll('.video-btn');

    videoButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const videoSrc = this.getAttribute('data-video');
        modalVideo.src = videoSrc;
        modal.style.display = 'flex';
        modalVideo.play();
      });
    });

    closeBtn.addEventListener('click', function () {
      modalVideo.pause();
      modalVideo.currentTime = 0;
      modalVideo.src = '';
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.src = '';
        modal.style.display = 'none';
      }
    });
  });


  AOS.init({
    duration: 1000, // animation duration (ms)
    once: false      // animation only once when scrolled into view
  });


  //email
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById("contactForm");

    // Send form data via fetch
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
        .then((response) => {
            if (response.ok) {
                // Show success popup
                document.getElementById("successPopup").style.display = "flex";

                // Clear the form
                form.reset();

                // Hide the popup after 3 seconds
                setTimeout(() => {
                    document.getElementById("successPopup").style.display = "none";
                }, 3000);
            } else {
                alert("Failed to submit form. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Failed to submit form. Please try again.");
        });

    return false;
}