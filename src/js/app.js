// Lógica de la calculadora de diluciones: C1 * V1 = C2 * V2
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const c1 = parseFloat(document.getElementById("c1").value);
  const c2 = parseFloat(document.getElementById("c2").value);
  const v2 = parseFloat(document.getElementById("v2").value);

  if (c1 <= 0) {
    resultado.textContent = "C₁ debe ser mayor que 0 mol/L.";
    return;
  }

  if (c2 > c1) {
    resultado.textContent = "C₂ no puede ser mayor que C₁: una dilución solo reduce la concentración.";
    return;
  }

  const v1 = (c2 * v2) / c1;
  const disolvente = v2 - v1;

  resultado.textContent =
    "V₁ = " + v1.toFixed(2) + " mL de solución concentrada. " +
    "Agrega " + disolvente.toFixed(2) + " mL de disolvente.";
});