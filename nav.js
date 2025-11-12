// Mobile nav toggle + dropdown accessibility
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const body = document.body;

    if (toggle) {
        toggle.addEventListener('click', function () {
            const isOpen = body.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Dropdown accessibility + touch support
    const toggles = document.querySelectorAll('li.has-dropdown > a');

    function closeAllDropdowns() {
        document.querySelectorAll('li.has-dropdown.open').forEach(li => {
            li.classList.remove('open');
            const link = li.querySelector('a');
            if (link) link.setAttribute('aria-expanded', 'false');
        });
    }

    toggles.forEach(link => {
        const li = link.parentElement;
        link.setAttribute('aria-expanded', 'false');

        link.addEventListener('click', function (e) {
            e.preventDefault();
            const isOpen = li.classList.toggle('open');
            link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        link.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = li.classList.toggle('open');
                link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            } else if (e.key === 'Escape') {
                li.classList.remove('open');
                link.setAttribute('aria-expanded', 'false');
                link.focus();
            }
        });
    });

    // close when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('li.has-dropdown')) closeAllDropdowns();
        // close nav when clicking outside on mobile
        if (!e.target.closest('nav') && body.classList.contains('nav-open')) {
            body.classList.remove('nav-open');
            const toggleBtn = document.querySelector('.nav-toggle');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded','false');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
            if (body.classList.contains('nav-open')) {
                body.classList.remove('nav-open');
                const toggleBtn = document.querySelector('.nav-toggle');
                if (toggleBtn) {
                    toggleBtn.setAttribute('aria-expanded','false');
                    toggleBtn.focus();
                }
            }
        }
    });
});
