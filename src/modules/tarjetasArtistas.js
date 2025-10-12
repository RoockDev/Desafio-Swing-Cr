export const initArtistCards = () =>{
    const artistCards = document.querySelectorAll('.artistas-principales__contenedor figure');

    artistCards.forEach(card => {
        const video = card.querySelector('video');

        card.addEventListener('mouseenter', () =>{
            video.play();
        });

        card.addEventListener('mouseleave', () =>{
            video.pause();
            video.currentTime = 0;
        });
    });
};