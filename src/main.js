
import { initArtistCards } from "./modules/tarjetasArtistas";
import { initModalVideo } from "./modules/modalVideo";
import { initHeaderMenu } from "./modules/headerMenu";
import { initModal } from "./modules/modalManager";
import { renderActividades } from "./modules/renderActividades.js";

document.addEventListener("DOMContentLoaded", () => {
  initArtistCards();
  initModalVideo();
  initHeaderMenu();

  renderActividades();
  initModal();
});
