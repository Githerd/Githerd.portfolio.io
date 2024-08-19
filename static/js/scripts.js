document.addEventListener("DOMContentLoaded", () => {
    // Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    const feedbackDiv = document.getElementById("feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                message: document.getElementById("message").value.trim()
            };

            if (!formData.name || !formData.email || !formData.message) {
                feedbackDiv.textContent = "All fields are required.";
                feedbackDiv.style.color = "red";
                return;
            }

            axios.post(contactForm.action, formData)
                .then(response => {
                    feedbackDiv.textContent = "Your message has been sent successfully!";
                    feedbackDiv.style.color = "green";
                    contactForm.reset();
                })
                .catch(error => {
                    feedbackDiv.textContent = `Failed to send message: ${error.response?.data?.error || error.message}`;
                    feedbackDiv.style.color = "red";
                });
        });
    }

    // Initialize flip effects
    initializeFlipEffects();

    // Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const loginUrl = "{{ url_for('auth.login') }}";

            fetch(loginUrl, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "{{ url_for('main.home') }}";
                } else {
                    alert('Login failed!');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Color changing and project display logic
    const btn = document.getElementById("btn");
    const colorSpan = document.querySelector(".color");
    const projectDisplay = document.getElementById('project-display');
    const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A6",
  "#FF9900", "#FFCC00", "#669900", "#00FFCC", "#FF0066",
  "#FF6600", "#FF3399", "#33FFCC", "#0066FF", "#99FF33",
  "#FF3333", "#3333FF", "#33FF33", "#9933FF", "#FF3366",
  "#33CCFF", "#FF6633", "#66FF33", "#3399FF", "#FF9933",
  "#9933CC", "#33FF99", "#FF99CC", "#3366FF", "#FF33FF"
];


    if (btn && projectDisplay) {
        const projects = [
            {
                title: "Project One",
                description: "A comedy website using HTML and CSS",
                technologies: "Git, Github, HTML and CSS",
                link: "https://github.com/Githerd/Githerd.github.io"
            },
            {
                title: "Project Two",
                description: "A comedy website using HTML, CSS, and Javascript",
                technologies: "Git, Github, HTML, CSS, and JavaScript",
                link: "https://github.com/Githerd/Githerd.javascript.io"
            },
             {
                title: "Project Three",
                description: "A comedy website using HTML, CSS, Javascript, and Flask",
                technologies: "Git, Visual Studio Code, Render, Github, HTML, CSS, Javascript, and Flask",
                link: "https://githerd-render1-io.onrender.com"
            }
        ];

        let currentProjectIndex = 0;

        function displayProject(index) {
            const project = projects[index];
            projectDisplay.innerHTML = `
                <h2>${project.title}</h2>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Technologies:</strong> ${project.technologies}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
        }

        function getRandomColor() {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return colors[randomIndex];
        }

        btn.addEventListener("click", () => {
            const randomColor = getRandomColor();
            document.body.style.backgroundColor = randomColor;
            if (colorSpan) {
                colorSpan.textContent = randomColor;
            }

            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            displayProject(currentProjectIndex);
        });

        displayProject(currentProjectIndex);

        const initialColor = getRandomColor();
        document.body.style.backgroundColor = initialColor;
        if (colorSpan) {
            colorSpan.textContent = initialColor;
        }
    }

    // Register Form Submission
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        const feedbackDiv = document.getElementById("feedback");

        const getButton = document.createElement("button");
        getButton.textContent = "Fetch Users (GET)";
        document.body.appendChild(getButton);

        getButton.addEventListener("click", () => {
            axios
                .get("https://reqres.in/api/users?page=2")
                .then((response) => {
                    feedbackDiv.textContent = `Fetched Users: ${JSON.stringify(response.data)}`;
                    console.log(response.data);
                })
                .catch((error) => {
                    feedbackDiv.textContent = `Error Fetching Users: ${error.message}`;
                    console.error(error);
                });
        });

        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                confirmPassword: document.getElementById("confirm-password").value
            };

            if (formData.password !== formData.confirmPassword) {
                feedbackDiv.textContent = "Passwords do not match!";
                feedbackDiv.style.color = "red";
                return;
            }

            axios
                .post("https://reqres.in/api/register", {
                    email: formData.email,
                    password: formData.password,
                })
                .then((response) => {
                    feedbackDiv.textContent = `Registration Successful! ${JSON.stringify(response.data)}`;
                    feedbackDiv.style.color = "green";
                    console.log(response.data);
                })
                .catch((error) => {
                    feedbackDiv.textContent = `Registration Failed! ${error.response?.data?.error || error.message}`;
                    feedbackDiv.style.color = "red";
                    console.error(error);
                });
        });

        const postButton = document.createElement("button");
        postButton.textContent = "Simulate Registration (POST)";
        document.body.appendChild(postButton);

        postButton.addEventListener("click", () => {
            axios
                .post("https://reqres.in/api/register", {
                    email: "eve.holt@reqres.in",
                    password: "pistol",
                })
                .then((response) => {
                    feedbackDiv.textContent = `Simulated Registration Successful! ${JSON.stringify(response.data)}`;
                    feedbackDiv.style.color = "green";
                    console.log(response.data);
                })
                .catch((error) => {
                    feedbackDiv.textContent = `Simulated Registration Failed! ${error.response?.data?.error || error.message}`;
                    feedbackDiv.style.color = "red";
                    console.error(error);
                });
        });
    }

    // Sun and Orbits Animation
    const sun = document.getElementById('sun');
    if (sun) {
        console.log("Sun element found:", sun);
    } else {
        console.error("Sun element not found!");
    }

    const orbits = document.querySelectorAll('.orbit');
    if (orbits.length > 0) {
        console.log("Orbits found:", orbits.length);
    } else {
        console.error("No orbits found!");
    }

    orbits.forEach((orbit, index) => {
        console.log(`Setting animation delay for orbit ${index + 1}`);
        orbit.style.animationDelay = `${index * 2}s`;
    });

    // Form Submission Balloon Animation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.textContent = '🎈';
            document.body.appendChild(balloon);

            const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
            const rect = submitButton.getBoundingClientRect();
            balloon.style.left = `${rect.left + window.scrollX}px`;
            balloon.style.top = `${rect.top + window.scrollY}px`;

            setTimeout(() => {
                balloon.remove();
            }, 5000);
        });
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        backToTopBtn.style.position = "fixed";
        backToTopBtn.style.bottom = "20px";
        backToTopBtn.style.left = "20px";  // Adjusting to the left

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });
    }

    // Show or hide the back-to-top button on load
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }
});

// Flip Effects Initialization Function
function initializeFlipEffects() {
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        container.addEventListener('click', () => {
            container.classList.toggle('flip');
        });
    });
}

// Background Color Change Function
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomColor();

    const randomInterval = Math.floor(Math.random() * 2000) + 1000;

    setTimeout(changeBackgroundColor, randomInterval);
}

window.onload = function() {
    changeBackgroundColor();
};
