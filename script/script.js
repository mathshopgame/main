var total = 0;
let trocomais = Math.floor(Math.random() * 350);

document.addEventListener("DOMContentLoaded", () => {
  exibirMostrinhoAtual();
  compras();
  initializeCalculator();
});

function updateTotal() {
  document.getElementById("total").innerText = total.toFixed(2);
}

function scanItem(name, price) {
  total += price;
  alert(`Você escaneou: ${name} - R$ ${price.toFixed(2)}`);
  updateTotal();
}

function checkout() {
  if (total === 0) {
    alert("Nenhum item escaneado.");
    return; // Sai da função se nenhum item foi escaneado
  }
  alert(`Você deu o troco certo`);
  total = 0;
  updateTotal();
}

function troco() {
  const playerInput = document.getElementById("player-input");
  const monsterText = document.getElementById("texto");
  const trocoValor = parseFloat(playerInput.value);

  if (trocoValor === parseFloat(trocomais.toFixed(2))) {
    checkout();
    trocomais = Math.floor(Math.random() * 350);
    compras();
  } else {
    monsterText.textContent = `Meu troco está errado!`;
  }
  playerInput.value = ''; // Limpa o input após verificar o troco
}

function compras() {
  exibirMostrinhoAtual();
  const items = [
    "Maçã",
    "Pão",
    "Leite",
    "Água",
    "Bolacha Recheada",
    "Empanado de Frango",
    "Café Torrado",
    "Farinha de Trigo",
    "Sardinha em Lata",
    "Ervilha em Conserva",
    "Papel Higiênico",
    "Extrato de Tomate",
    "Gatorade",
    "Açúcar",
    "Arroz",
    "Cebola",
  ];

  let itemCount = 0;
  const maxItems = Math.floor(Math.random() * items.length) + 1; // Garante pelo menos 1 item
  const uniqueItems = [...new Set(items)];
  console.log("Troco correto:", trocomais); // Mostra o troco correto no console

  function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * uniqueItems.length);
    return uniqueItems[randomIndex];
  }

  function updateMonsterText() {
    const monsterText = document.getElementById("texto");
    if (itemCount < maxItems) {
      const randomItem = getRandomItem();
      console.log(itemCount + 1, randomItem, maxItems);
      monsterText.textContent = `Eu quero ${randomItem}!`;
      itemCount++;
    } else if (total > 0 && itemCount === maxItems) {
      const dinheiro = parseFloat((total + trocomais).toFixed(2));
      monsterText.textContent = `Não quero mais nada!, aqui está o dinheiro R$ ${dinheiro}`;
    }
  }

  updateMonsterText(); // Chama a função imediatamente para exibir o primeiro item
  const intervalId = setInterval(updateMonsterText, 6500);

  // Limpa o intervalo quando a função checkout é chamada
  const checkoutButton = document.querySelector(".checkout"); // Use a classe "checkout"
  checkoutButton.addEventListener("click", () => {
    clearInterval(intervalId);
  });
}

const imagensMostrinhos = [
  "imgs/red.png",
  "imgs/black.png",
  "imgs/blue.png",
  "imgs/green.png",
  "imgs/purple.png",
];

let indiceMostrinhoAtual = 0;

function exibirMostrinhoAtual() {
  const mostrinhoContainer = document.getElementById("mostrinho-container");
  mostrinhoContainer.innerHTML = "";

  const img = document.createElement("img");
  img.src = imagensMostrinhos[indiceMostrinhoAtual];
  img.alt = "Monstrinho"; // Adiciona um atributo alt para a imagem
  mostrinhoContainer.appendChild(img);

  indiceMostrinhoAtual = (indiceMostrinhoAtual + 1) % imagensMostrinhos.length;
}

function initializeCalculator() {
  const toggleButton = document.getElementById("toggleCalculator"); // Obtém o botão pela ID
  const calculator = document.getElementById("calculadora");

  toggleButton.addEventListener("click", () => {
    calculator.style.display = calculator.style.display === "none" ? "block" : "none";
  });
}

const display = document.getElementById("display");

window.appendToDisplay = (input) => {
  display.value += input;
};

window.limparTela = () => {
  display.value = "";
};

window.calcular = () => {
  try {
    display.value = eval(display.value).toFixed(2);
  } catch (error) {
    display.value = "ERRO";
  }
};