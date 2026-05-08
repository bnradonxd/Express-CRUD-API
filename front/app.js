const itemForm = document.getElementById("item-form");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const itemList = document.getElementById("item-list");
const addButton = document.getElementById("add-button");

// stats
const statCount = document.getElementById("stat-count");
const statTotal = document.getElementById("stat-total");

// barrita de error
const errorBar = document.getElementById("error-bar");
const errorMsg = document.getElementById("error-msg");
const errorClose = document.getElementById("error-close");

// ptos de estado
const statusDots = [document.getElementById("status-dot")];
const statusTexts = [document.getElementById("status-text")];

// estado vacío
const emptyState = document.getElementById("empty-state");

const API = "https://express-crud-api-bnradon.onrender.com/items";

let lastDataJSON = "";

let itemsData = [];
let editingID = null;

function setStatus(online) {
  statusDots.forEach((dot) => {
    dot.classList.toggle("online", online);
    dot.classList.toggle("offline", !online);
  });
  statusTexts.forEach(
    (el) => (el.textContent = online ? "API online" : "API no disponible :("),
  );
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorBar.classList.add("visible");
}

function hideError() {
  errorBar.classList.remove("visible");
}

errorClose.addEventListener("click", hideError);

function updateStats() {
  statCount.textContent = itemsData.length;
  const sum = itemsData.reduce((acc, item) => acc + Number(item.price), 0);
  statTotal.textContent = "$" + sum.toLocaleString("es-CO");
}

// ------ Render ------

function renderItems(items) {
  if (items.length === 0) {
    itemList.innerHTML = "";
    emptyState.classList.add("visible");
    updateStats();
    return;
  }

  emptyState.classList.remove("visible");

  itemList.innerHTML = items
    .map(
      (item, i) => `
    <tr>
      <td>${i + 1}</td>

<td class="item-name">
  <div class="product-main">
    <strong>${item.name}</strong>

    ${
      item.ai?.category
        ? `<span class="ai-category">${item.ai.category}</span>`
        : ""
    }

    ${
      item.ai?.shortSummary
        ? `<p class="ai-summary">${item.ai.shortSummary}</p>`
        : ""
    }

    ${
      Array.isArray(item.ai?.tags)
        ? `
          <div class="ai-tags">
            ${item.ai.tags
              .map((tag) => `<span class="tag-pill">${tag}</span>`)
              .join("")}
          </div>
        `
        : ""
    }

    ${
      item.automation?.status === "processing"
        ? `<span class="ai-status processing">Procesando datos de IA...</span>`
        : item.automation?.status === "completed"
        
          ? `<span class="ai-status completed">AI Info</span>`
          : ""
    }
  </div>
</td>
      <td class="item-price">$${Number(item.price).toLocaleString("es-CO")}</td>
      <td>
        <div class="actions">
          <button class="btn-edit"   data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" type="button">Editar</button>
          <button class="btn-delete" data-id="${item.id}" type="button">Eliminar</button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");

  itemList.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", () => deleteItem(btn.dataset.id));
  });

  itemList.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", () =>
      startEdit(btn.dataset.id, btn.dataset.name, Number(btn.dataset.price)),
    );
  });

  updateStats();
}


// ------ Método GET ------

async function loadItems() {

  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("respuesta no ok");
    }

    const data = await res.json();

    const newDataJSON = JSON.stringify(data);

    if (newDataJSON !== lastDataJSON) {

      lastDataJSON = newDataJSON;
      itemsData = data;
      renderItems(itemsData);
    }

    setStatus(true);

  } catch (err) {

    console.error("ERROR:", err);
    setStatus(false);
    showError("No se pudo conectar al servidor");
  }
}

loadItems();

setInterval(loadItems, 5000);

// ------ Método POST ------

async function addItem(name, price) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    const data = await res.json();
    itemsData.push(data);
    renderItems(itemsData);
    hideError();
  } catch (err) {
    console.error("Error al agregar ítem:", err);
    showError("Error al agregar ítems, no estás conectado al servidor");
  }
}

// ------ Método DELETE ------

async function deleteItem(id) {
  try {
    // Confirmación para eliminar
    if (confirm("Seguro de que quieres eliminar este producto?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      itemsData = itemsData.filter((item) => item.id !== id);
      renderItems(itemsData);
      hideError();
      alert("Eliminado correctamente");
    } else {
      return;
    }
  } catch (error) {
    console.error("Error al eliminar ítem:", error);
    showError("Error al eliminar ítem, no estás conectado al servidor.");
  }
}

// ------ Modo Editar Producto------

function startEdit(id, name, price) {
  editingID = id;
  itemName.value = name;
  itemPrice.value = price;
  addButton.textContent = "Actualizar";
  itemName.focus();
}

// ------ Método PUT ------

async function updateItem(id, name, price) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    const updatedItem = await res.json();
    itemsData = itemsData.map((item) => (item.id === id ? updatedItem : item));
    renderItems(itemsData);
    hideError();
  } catch (error) {
    console.error("Error al actualizar ítem:", error);
    showError("Error al actualizar ítem, no estás conectado al servidor.");
  }
}

// ------ Función agregar datos ------

itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = itemName.value.trim();
  const price = Number(itemPrice.value);

  if (editingID !== null) {
    await updateItem(editingID, name, price);
    editingID = null;
    addButton.textContent = "+ Agregar";
  } else {
    await addItem(name, price);
  }

  itemName.value = "";
  itemPrice.value = "";
});
