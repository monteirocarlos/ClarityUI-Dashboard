document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");

  hamburger.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  const menuItems = document.querySelectorAll(".sidebar-nav a");
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  });

  const entriesDropdown = document.querySelector(
    ".main-content .entries-dropdown select"
  );
  if (entriesDropdown) {
    entriesDropdown.addEventListener("change", function () {
      console.log("Showing " + this.value + " entries.");
    });
  }

  const addCustomerBtn = document.querySelector(
    ".main-content .add-customer-btn"
  );
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", function () {
      console.log("Add Customer button clicked.");
    });
  }

  const paginationButtons = document.querySelectorAll(".pagination button");
  paginationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log('Pagination button "' + this.textContent + '" clicked.');
    });
  });

  const submenuLinks = document.querySelectorAll(".sidebar-nav li > a + ul");
  submenuLinks.forEach((submenu) => {
    const parentLi = submenu.parentNode;
    const mainLink = parentLi.querySelector("> a");
    if (mainLink) {
      mainLink.addEventListener("click", function (event) {
        event.preventDefault();
        submenu.style.display =
          submenu.style.display === "block" ? "none" : "block";
        parentLi.classList.toggle("active");
      });
    }
  });

  const dashboardLink = document.querySelector('.sidebar-nav li a[href="#"]');
  if (dashboardLink && dashboardLink.textContent.trim() === "Dashboard") {
    dashboardLink.parentNode.classList.add("active");
  }

  const editButtons = document.querySelectorAll(".actions a:first-child");
  const editModal = document.getElementById("editModal");

  function openEditModal(row) {
    const cells = row.querySelectorAll("td");

    document.getElementById("modalProduct").textContent = cells[1].textContent;
    document.getElementById("modalCustomer").textContent = cells[2].textContent;
    document.getElementById("modalDate").textContent = cells[3].textContent;

    let amount = cells[4].textContent.trim();
    if (!amount.startsWith("$")) {
      amount = "$" + amount;
    }
    document.getElementById("modalAmount").textContent = amount;

    document.getElementById("modalPaymentMode").textContent =
      cells[5].textContent;

    const statusClass = cells[6].className.includes("delivered")
      ? "delivered"
      : cells[6].className.includes("process")
      ? "process"
      : "canceled";
    editModal.querySelector("select").value = statusClass;

    editModal.currentRow = row;

    editModal.classList.add("active");
  }

  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const row = this.closest("tr");
      openEditModal(row);
    });
  });

  editModal.querySelector(".cancel-btn").addEventListener("click", function () {
    editModal.classList.remove("active");
  });

  editModal.addEventListener("click", function (e) {
    if (e.target === editModal) {
      editModal.classList.remove("active");
    }
  });

  editModal.querySelector(".apply-btn").addEventListener("click", function () {
    const row = editModal.currentRow;
    if (row) {
      const statusSelect = editModal.querySelector("select");
      const statusCell = row.querySelector(".status");

      statusCell.className = "status " + statusSelect.value;

      statusCell.textContent =
        statusSelect.value.charAt(0).toUpperCase() +
        statusSelect.value.slice(1);
    }

    editModal.classList.remove("active");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && editModal.classList.contains("active")) {
      editModal.classList.remove("active");
    }
  });
});
