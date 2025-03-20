document.addEventListener("DOMContentLoaded", function () {
    fetchInventory();

    document.getElementById("inventoryForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let id = document.getElementById("itemId").value;
        let name = document.getElementById("itemName").value;
        let quantity = document.getElementById("itemQuantity").value;
        let action = id ? "update" : "create";

        fetch("InventoryServlet", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=${action}&id=${id}&name=${name}&quantity=${quantity}`
        }).then(() => {
            fetchInventory();
            document.getElementById("inventoryForm").reset();
        });
    });
});

function fetchInventory() {
    fetch("InventoryServlet").then(response => response.json()).then(data => {
        let tbody = document.getElementById("inventoryTableBody");
        tbody.innerHTML = "";
        data.forEach(item => {
            let row = `<tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>
                    <button onclick="editItem(${item.id}, '${item.name}', ${item.quantity})">Edit</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    });
}

function editItem(id, name, quantity) {
    document.getElementById("itemId").value = id;
    document.getElementById("itemName").value = name;
    document.getElementById("itemQuantity").value = quantity;
}

function deleteItem(id) {
    fetch("InventoryServlet", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=delete&id=${id}`
    }).then(() => fetchInventory());
}
