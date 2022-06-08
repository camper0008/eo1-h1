"use strict";
const radius = document.getElementById("radius");
const mass = document.getElementById("mass");
const resultM = document.getElementById("result-m");
const resultKm = document.getElementById("result-km")
const button = document.getElementById("button");
const dropdown = document.getElementById("dropdown");

const planetStringToValues = (planet) => {
    const v = (mass, radius) => ({ mass, radius });
    switch (planet) {
        case 'jorden':
            return v(5.972e+24, 6371000);
        case 'mars':
            return v(6.39e+23, 3379500);
        case 'jupiter':
            return v(1.898e+27, 69911000);
        case 'solen':
            return v(1.989e+30, 696340000);
    }
    throw new Error("dropdown overflow :)");
}



button.addEventListener("click", () => {
    if (dropdown.value != "custom") {
        const planetValues = planetStringToValues(dropdown.value);
        mass.value = planetValues.mass;
        radius.value = planetValues.radius;
    }
    const result = Math.sqrt(6.67 * 10 ** -11 * mass.value * (1 / radius.value));
    resultM.innerText = result + " m/s";
    resultKm.innerText = result * 3.6 + " km/t";
})