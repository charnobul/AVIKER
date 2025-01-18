import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCP7tSUVqBWJCaAXVguwRluRxgxDnirdmA",
    authDomain: "jdfsjnfjcdshjfcbh.firebaseapp.com",
    projectId: "jdfsjnfjcdshjfcbh",
    storageBucket: "jdfsjnfjcdshjfcbh.firebasestorage.app",
    messagingSenderId: "848070443991",
    appId: "1:848070443991:web:6b60eab40fa314db390192",
    measurementId: "G-68JLRVYVP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

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
            const newReviewRef = push(ref(database, 'reviews'));
            newReviewRef.set({
                rating: selectedRating,
                text: reviewText
            });
            review.value = '';
            stars.forEach(s => s.classList.remove('selected'));
            selectedRating = 0;
            alert('Ваш отзыв был отправлен!');
        } else {
            alert('Пожалуйста, выберите оценку и оставьте отзыв.');
        }
    });

    onChildAdded(ref(database, 'reviews'), (snapshot) => {
        const reviewData = snapshot.val();
        const reviewItem = document.createElement('li');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `<strong>Оценка: ${reviewData.rating}</strong><p>${reviewData.text}</p>`;
        reviewsList.appendChild(reviewItem);
    });
});
