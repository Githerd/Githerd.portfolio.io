document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

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
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById("register-form");
    const feedbackDiv = document.getElementById("feedback");

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

        axios.post("https://reqres.in/api/register", {
            email: formData.email,
            password: formData.password,
        })
        .then((response) => {
            feedbackDiv.textContent = `Registration Successful! ${JSON.stringify(response.data)}`;
        })
        .catch((error) => {
            feedbackDiv.textContent = `Registration Failed! ${error.response?.data?.error || error.message}`;
        });
    });

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function() {
            const postButton = document.createElement("button");
            postButton.textContent = "Simulate Registration (POST)";
            document.body.appendChild(postButton);

            postButton.addEventListener("click", () => {
                axios.post("https://reqres.in/api/register", {
                    email: "eve.holt@reqres.in",
                    password: "pistol",
                })
                .then((response) => {
                    feedbackDiv.textContent = `Simulated Registration Successful! ${JSON.stringify(response.data)}`;
                })
                .catch((error) => {
                    feedbackDiv.textContent = `Simulated Registration Failed! ${error.response?.data?.error || error.message}`;
                });
            });
        });
    });

    changeBackgroundColor();
    initializeSolarSystem();
});

function changeBackgroundColor() {
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;

    const randomInterval = Math.floor(Math.random() * 4000) + 1000;
    setTimeout(changeBackgroundColor, randomInterval);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initializeSolarSystem() {
    const skills = ["HTML", "CSS", "JavaScript", "Python", "Flask"];
    const sun = document.getElementById('sun');

    skills.forEach((skill, index) => {
        const orbit = document.createElement('div');
        orbit.className = `orbit orbit-${index + 1}`;

        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.textContent = skill;

        orbit.appendChild(skillElement);
        sun.appendChild(orbit);
    });

    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, index) => {
        orbit.style.animationDuration = `${10 + index * 2}s`;
    });
}
