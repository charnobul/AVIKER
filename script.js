document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const review = document.getElementById('review');
    const submitButton = document.getElementById('submit');
    const reviewsList = document.getElementById('reviews-list');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });

    submitButton.addEventListener('click', () => {
        const reviewText = review.value;
        if (selectedRating && reviewText) {
            const reviewItem = document.createElement('li');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `<strong>Оценка: ${selectedRating}</strong><p>${reviewText}</p>`;
            reviewsList.appendChild(reviewItem);
            review.value = '';
            stars.forEach(s => s.classList.remove('selected'));
            selectedRating = 0;
            alert('Ваш отзыв был отправлен!');
            // Здесь можно добавить код для отправки данных на сервер
        } else {
            alert('Пожалуйста, выберите оценку и оставьте отзыв.');
        }
    });
});
