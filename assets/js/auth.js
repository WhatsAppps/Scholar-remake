document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const indexPage = document.getElementById('index-page');

    const goToSignup = document.getElementById('go-to-signup');
    const goToLogin = document.getElementById('go-to-login');
    const goToIndex = document.getElementById('go-to-index');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const userEmailElement = document.getElementById('user-email');
    const logoutButton = document.getElementById('logout-btn');

    const signupNav = document.getElementById('signup-nav');
    const profileNav = document.getElementById('profile-nav');
    const userProfileName = document.getElementById('user-profile-name');

    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownToggle = document.getElementById('dropdown-toggle');

    // Fungsi untuk menampilkan pesan error
    const showError = (element, message) => {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        element.parentElement.appendChild(errorElement);

        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    };

    // Navigasi ke halaman signup
    if (goToSignup) {
        goToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginPage) loginPage.style.display = 'none';
            if (signupPage) signupPage.style.display = 'block';
        });
    }

    // Navigasi ke halaman login
    if (goToLogin) {
        goToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupPage) signupPage.style.display = 'none';
            if (loginPage) loginPage.style.display = 'block';
        });
    }

    // Penanganan form signup
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('signup-email')?.value.trim();
            const password = document.getElementById('signup-password')?.value.trim();
            const confirmPassword = document.getElementById('signup-confirm-password')?.value.trim();

            // Validasi email
            if (!email) {
                showError(signupForm, 'Email is required.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(signupForm, 'Please enter a valid email address.');
                return;
            }

            // Validasi password
            if (!password) {
                showError(signupForm, 'Password is required.');
                return;
            }
            if (password.length < 6) {
                showError(signupForm, 'Password must be at least 6 characters.');
                return;
            }

            // Validasi konfirmasi password
            if (password !== confirmPassword) {
                showError(signupForm, 'Passwords do not match!');
                return;
            }

            // Simpan data pengguna di localStorage (simulasi penyimpanan lokal)
            try {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);
                alert('Signup successful!');
                // Alihkan ke halaman login setelah signup
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        });
    }

    // Penanganan form login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email')?.value.trim();
            const password = document.getElementById('login-password')?.value.trim();

            // Validasi email
            if (!email) {
                showError(loginForm, 'Email is required.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(loginForm, 'Please enter a valid email address.');
                return;
            }

            // Validasi password
            if (!password) {
                showError(loginForm, 'Password is required.');
                return;
            }

            // Cek kecocokan dengan data yang disimpan di localStorage
            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email !== storedEmail || password !== storedPassword) {
                showError(loginForm, 'Invalid email or password.');
                return;
            }

            alert('Login successful!');
            // Redirect ke halaman index.html
            window.location.href = 'index.html';
        });
    }

    // Menampilkan profil email pengguna di index.html
    if (indexPage) {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            // Jika pengguna sudah login, tampilkan email mereka di profil
            if (userEmailElement) userEmailElement.textContent = `Email: ${storedEmail}`;
        } else {
            // Jika belum login, alihkan ke halaman login
            window.location.href = 'login.html';
        }
    }

    // Tombol logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Hapus data login dari localStorage
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
            // Redirect ke halaman login
            window.location.href = 'login.html';
        });
    }

    // Mengubah elemen navigasi sesuai status login
    const updateNavigation = () => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            // Jika pengguna sudah login, tampilkan profile dan logout
            signupNav.style.display = 'none'; // Sembunyikan tombol signup
            profileNav.style.display = 'block'; // Tampilkan tombol profile
            // Set nama pengguna di profil
            userProfileName.textContent = `Hello, ${storedEmail}`;
        } else {
            // Jika belum login, tampilkan tombol signup
            signupNav.style.display = 'block';
            profileNav.style.display = 'none';
        }
    };

    // Panggil fungsi updateNavigation untuk mengubah tampilan menu
    updateNavigation();

    // Menangani klik dropdown untuk toggle menu
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle tampilan dropdown
            dropdownMenu.style.display = (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') ? 'block' : 'none';
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsData = [
        {
            text: "“Please tell your friends or colleagues about our website. Anyone can access and enjoy our services for free. Thank you for visiting!”",
            category: "Full Stack Master",
            name: "Damian",
            image: "assets/images/testimonial-author.jpg",
        },
    ];

    const carousel = document.getElementById('testimonials-carousel');
    const testimonialForm = document.getElementById('testimonial-form');

    // Fungsi untuk membuat elemen testimonial
    const createTestimonialItem = (testimonial) => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
            <p>${testimonial.text}</p>
            <div class="author">
                <h4>${testimonial.name}</h4>
            </div>
        `;

        // Menambahkan styling untuk latar belakang
        div.style.backgroundColor = '#926dced0';  // Menambahkan warna latar belakang
        div.style.borderRadius = '10px';  // Menambahkan border-radius agar lebih halus
        div.style.padding = '20px';  // Memberikan jarak di dalam elemen

        return div;
    };

    // Fungsi untuk memuat testimonial ke dalam carousel
    const loadTestimonials = () => {
        carousel.innerHTML = '';  // Menghapus semua testimonial sebelumnya
        testimonialsData.forEach((testimonial) => {
            const testimonialItem = createTestimonialItem(testimonial);
            carousel.appendChild(testimonialItem);
        });

        // Mengaktifkan carousel (opsional jika menggunakan OwlCarousel)
        if (typeof jQuery !== 'undefined' && typeof jQuery.fn.owlCarousel !== 'undefined') {
            jQuery('#testimonials-carousel').owlCarousel({
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 5000,
                dots: true,
            });
        }
    };

    // Memuat testimonial awal
    loadTestimonials();

    // Event listener untuk form testimonial
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ambil nilai input dan log hasilnya
        const name = document.getElementById('names').value.trim();
        const message = document.getElementById('messages').value.trim();

        console.log("Names:", name);       // Debugging nilai name
        console.log("Messages:", message);  // Debugging nilai message

        // Jika nilai input kosong
        if (!name || !message) {
            alert('All fields are required!');
            return;
        }

        // Menambahkan tanda petik di sekitar message dan category
        const newTestimonial = {
            text: `"${message}"`,    // Menambahkan tanda petik di sekitar message 
            name: name,
        };

        testimonialsData.push(newTestimonial); // Tambahkan testimonial ke data
        loadTestimonials(); // Refresh carousel dengan testimonial baru
        testimonialForm.reset(); // Reset form
        alert('Thank you for your testimonial!');
    });
});
