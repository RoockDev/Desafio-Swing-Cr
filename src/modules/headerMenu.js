export const initHeaderMenu = () =>{
    const toggle = document.querySelector('.header__menu-toggle');
    const mainNav = document.getElementById('main-nav');

    toggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}