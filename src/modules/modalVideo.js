export const initModalVideo = () =>{
    const modal = document.getElementById('modal-video');
    const botonConocerMas = document.querySelector('.hero button');
    const botonCerrar = document.querySelector('.modal__cerrar');

    //abrimos el modal
    botonConocerMas.addEventListener('click',() =>{
        modal.style.display = 'flex';
    });

    //cerramos el modal
    botonCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    //cerrar al hacer click fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            const video = modal.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
};