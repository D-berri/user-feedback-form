window.location.href = "index.html";
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedback-form');
    const fields = form.querySelectorAll('input, textarea');
    const feedbackDisplay = document.getElementById('feedback-display');

    // Character count
    fields.forEach(field => {
        field.addEventListener('input', function () {
            let countSpan = field.nextElementSibling;
            if (!countSpan || !countSpan.classList.contains('char-count')) {
                countSpan = document.createElement('span');
                countSpan.className = 'char-count';
                field.parentNode.insertBefore(countSpan, field.nextSibling);
            }
            countSpan.textContent = ` (${field.value.length} chars)`;
        });
    });

    // Tooltip display
    fields.forEach(field => {
        field.addEventListener('mouseover', function () {
            let tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = field.getAttribute('data-tooltip') || 'Enter your feedback';
            field.parentNode.appendChild(tooltip);
        });
        field.addEventListener('mouseout', function () {
            const tooltip = field.parentNode.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });

    // Form validation and submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;
        fields.forEach(field => {
            let msg = field.parentNode.querySelector('.validation-msg');
            if (!msg) {
                msg = document.createElement('span');
                msg.className = 'validation-msg';
                field.parentNode.appendChild(msg);
            }
            if (!field.value.trim()) {
                msg.textContent = 'This field is required.';
                valid = false;
            } else {
                msg.textContent = '';
            }
        });
        if (!valid) return;

        // Append feedback entry
        const entry = document.createElement('div');
        entry.className = 'feedback-entry';
        fields.forEach(field => {
            const p = document.createElement('p');
            p.textContent = `${field.name}: ${field.value}`;
            entry.appendChild(p);
        });
        feedbackDisplay.appendChild(entry);
        form.reset();
        fields.forEach(field => {
            const countSpan = field.parentNode.querySelector('.char-count');
            if (countSpan) countSpan.textContent = '';
        });
    });
});
form.addEventListener('input', function (e) {
    const field = e.target;
    if (field.matches('input, textarea')) {
        let countSpan = field.nextElementSibling;
        if (!countSpan || !countSpan.classList.contains('char-count')) {
            countSpan = document.createElement('span');
            countSpan.className = 'char-count';
            field.parentNode.insertBefore(countSpan, field.nextSibling);
        }
        countSpan.textContent = ` (${field.value.length} chars)`;
    }
});

form.addEventListener('mouseover', function (e) {
    const field = e.target;
    if (field.matches('input, textarea')) {
        let tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = field.getAttribute('data-tooltip') || 'Enter your feedback';
        field.parentNode.appendChild(tooltip);
    }
}, true);

form.addEventListener('mouseout', function (e) {
    const field = e.target;
    if (field.matches('input, textarea')) {
        const tooltip = field.parentNode.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    }
}, true);
document.body.addEventListener('click', function (e) {
    if (!form.contains(e.target)) {
        e.stopPropagation();
    }
}, true);