// a.js
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains('open');

        if (isOpen) {
            content.style.maxHeight = null;
            content.classList.remove('open');
        } else {
            document.querySelectorAll('.accordion-content.open').forEach(openContent => {
                openContent.style.maxHeight = null;
                openContent.classList.remove('open');
            });
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add('open');
        }
    });
});
