 // Mobile Menu Functions
        const sideMenu = document.getElementById('SideMenu');
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const closeMenuButton = document.getElementById('closeMenuButton');
        
        function openMenu() {
            sideMenu.style.right = '0';
        }
        
        function closeMenu() {
            sideMenu.style.right = '-16rem';
        }
        
        mobileMenuButton.addEventListener('click', openMenu);
        closeMenuButton.addEventListener('click', closeMenu);
        
        // Close menu when clicking on links
        document.querySelectorAll('#SideMenu a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Dark Mode Toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
        
        darkModeToggle.addEventListener('click', toggleTheme);
        
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        }

        // Contact Form Handling
        document.addEventListener('DOMContentLoaded', function () {
            const contactForm = document.getElementById('contactForm');
            const resultDiv = document.getElementById('result');
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            const submitIcon = document.getElementById('submitIcon');

            contactForm.addEventListener('submit', async function (e) {
                e.preventDefault(); // Prevent default submission

                // Validate form
                if (!validateForm()) return;

                // Show loading state
                submitBtn.disabled = true;
                submitText.textContent = 'Sending...';
                submitIcon.innerHTML = `
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                `;

                try {
                    const formData = new FormData(contactForm);
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.success) {
                        resultDiv.innerHTML = `
                            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative dark:bg-green-900 dark:border-green-700 dark:text-green-200">
                                <strong class="font-bold">Success!</strong>
                                <span class="block sm:inline">Message sent! I'll get back to you soon.</span>
                            </div>
                        `;
                        contactForm.reset(); // Clear form
                    } else {
                        throw new Error(result.message || "Submission failed");
                    }
                } catch (error) {
                    resultDiv.innerHTML = `
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-700 dark:text-red-200">
                            <strong class="font-bold">Error!</strong>
                            <span class="block sm:inline">Failed to send message. Try emailing me at <a href="mailto:fadywageih14@gmail.com" class="underline">fadywageih14@gmail.com</a></span>
                        </div>
                    `;
                } finally {
                    resultDiv.classList.remove('hidden');
                    submitBtn.disabled = false;
                    submitText.textContent = 'Submit now';
                    submitIcon.innerHTML = `<img src="./images/right-arrow-white.png" alt="" class="w-4">`;

                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        resultDiv.classList.add('hidden');
                    }, 5000);
                }
            });

            function validateForm() {
                const name = document.querySelector('input[name="name"]').value.trim();
                const email = document.querySelector('input[name="email"]').value.trim();
                const message = document.querySelector('textarea[name="message"]').value.trim();

                if (!name || !email || !message) {
                    alert('Please fill all fields');
                    return false;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email');
                    return false;
                }

                return true;
            }
        });