var currentImageIndex = 0;
var images = document.querySelectorAll('.gallery-image');
var dots = document.querySelectorAll('.nav-dot');

function showImage(index) {
    images.forEach(function(img, i) {
        if (i === index) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
    dots.forEach(function(dot, i) {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    showImage(currentImageIndex);
}

function goToImage(index) {
    currentImageIndex = index;
    showImage(currentImageIndex);
}

function toggleRoomDetails() {
    var card = document.getElementById('roomDetailsCard');
    var overlay = document.getElementById('modalOverlay');
    
    if (card.classList.contains('show')) {
        card.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    } else {
        card.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}
