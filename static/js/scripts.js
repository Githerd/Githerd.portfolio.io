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

    
    initializeFlipEffects();


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


const colors = [
    "#000080", "#00008B", "#0000CD", "#0000FF", "#006400", "#008000", "#008080",
    "#FFFFF0", "#FFFFFF", "#191970", "#3D59AB", "#4169E1", "#4682B4", "#5F9EA0",
    "#6A5ACD", "#7B68EE", "#87CEEB", "#87CEFA", "#8A2BE2", "#8B008B", "#8B0000",
    "#8B4513", "#8FBC8F", "#9400D3", "#9932CC", "#9ACD32", "#A0522D", "#A52A2A",
    "#ADD8E6", "#B0C4DE", "#B0E0E6", "#B22222", "#BA55D3", "#BC8F8F", "#BDB76B",
    "#C71585", "#CD5C5C", "#CD853F", "#D2691E", "#D2B48C", "#DA70D6", "#DAA520",
    "#DB7093", "#DC143C", "#DCDCDC", "#DDA0DD", "#EE82EE", "#F08080", "#FA8072",
    "#FFA07A", "#FFA500", "#FFB6C1", "#FFC0CB", "#FFD700", "#FFE4B5", "#FFE4C4",
    "#FFE4E1", "#FFEBCD", "#FFEFD5", "#FFF0F5", "#FFF5EE", "#FFF8DC", "#FFFACD",
    "#FFFAF0", "#FFFAFA", "#FFFF00", "#FFFFE0", "#FFFFF0", "#FFFFFF", "#7FFFD4",
    "#76EE00", "#7CFC00", "#7FFF00", "#7FFFD4", "#800000", "#800080", "#808000",
    "#808080", "#87CEEB", "#87CEFA", "#8A2BE2", "#8B0000", "#8B008B", "#8B4513",
    "#8FBC8F", "#9400D3", "#9932CC", "#9ACD32", "#A0522D", "#A52A2A", "#A9A9A9",
    "#ADD8E6", "#ADFF2F", "#AFEEEE", "#B0C4DE", "#B0E0E6", "#B22222", "#BA55D3",
    "#BC8F8F", "#BDB76B", "#C0C0C0", "#C71585"
];


    const btn = document.getElementById("btn");
    const colorSpan = document.querySelector(".color");
    const projectDisplay = document.getElementById('project-display');

    if (btn && projectDisplay) {
        const projects = [
            {
                title: "Project One",
                description: "A comedy website using HTML and CSS",
                technologies: "Git, Github, HTML and CSS",
                link: "https://Githerd.github.io.git"
            },
            {
                title: "Project Two",
                description: "A comedy website using HTML and CSS and Javascript",
                technologies: "Git, Github, HTML, CSS and JavaScript",
                link: "https://Githerd.javascript.io.git"
            },
             {
                title: "Project Three",
                description: "A comedy website using HTML, CSS, javascript and Flask",
                technologies: "Git, Visual Studio Code, Render, Github, HTML, CSS, javascript and Flask",
                link: "https://Githerd.render.io.git"
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


    const registerForm = document.getElementById("register-form");

    if (registerForm) {
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
                return;
            }

            axios
                .post("https://reqres.in/api/register", {
                    email: formData.email,
                    password: formData.password,
                })
                .then((response) => {
                    feedbackDiv.textContent = `Registration Successful! ${JSON.stringify(response.data)}`;
                    console.log(response.data);
                })
                .catch((error) => {
                    feedbackDiv.textContent = `Registration Failed! ${error.response?.data?.error || error.message}`;
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
                    console.log(response.data);
                })
                .catch((error) => {
                    feedbackDiv.textContent = `Simulated Registration Failed! ${error.response?.data?.error || error.message}`;
                    console.error(error);
                });
        });
    }


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

            balloon.style.animation = 'float 5s linear infinite';

            setTimeout(() => {
                balloon.remove();
            }, 5000);
        });
    }


    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        backToTopBtn.style.position = "fixed";
        backToTopBtn.style.bottom = "20px";
        backToTopBtn.style.left = "20px";  // Positioning to the left

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


    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});


function initializeFlipEffects() {
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        container.addEventListener('click', () => {
            container.classList.toggle('flip');
        });
    });
}


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
    
    const randomInterval = Math.floor(Math.random() * 4000) + 1000;

    setTimeout(changeBackgroundColor, randomInterval);
}

window.onload = function() {
    changeBackgroundColor();
};
