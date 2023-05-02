import { GENRES } from "./genres";
import { PLATAFORMS } from "./plataforms";

const IconFolder = "icons/imgs/"

// Función para reemplazar los iconos del html con el icono correspondiente
let createSingleIcon = (iconName, slug) => {
    console.log("aAAAAAAAAAAAAAAAAAAAAAAA");
    // Crear contenedor del icono
    let iconContainer = document.createElement("div");
    iconContainer.className = "icon bg-white h-16 w-16 m-2";

    // Crear imagen
    let iconImage = document.createElement("img")
    iconImage.src = IconFolder + slug + ".svg";
    iconImage.title = iconName;
    iconContainer.appendChild(iconImage);

    return iconContainer;
}

/*
export function loadIcons() {
    // Recorrer las plataformas
    for (let key in Object.entries(PLATAFORMS)) {
        var htmlIcon = document.getElementsByClassName("icon-"+PLATAFORMS[key]["slug"]);
        console.log("icon-"+PLATAFORMS[key]["slug"]);
        [].slice.call(htmlIcon).forEach(function (div) {
            console.log("div");
            div.replaceWith(createSingleIcon(PLATAFORMS[key]["name"], PLATAFORMS[key]["slug"]));
        });
    }
    // Recorrer los generos
    for (let key in Object.entries(GENRES)) {
        let htmlIcon = document.getElementsByClassName(key["slug"]);
        [].slice.call(htmlIcon).forEach(function (div) {
            div.replaceWith(createSingleIcon(key["name"], key["slug"]));
        });
    }
}
*/