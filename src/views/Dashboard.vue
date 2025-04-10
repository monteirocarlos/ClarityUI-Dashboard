<template>
  <div class="dashboard-content">
    <div class="main-header-actions">
      <div class="entries-dropdown">
        <span>Show</span>
        <select v-model="perPage" @change="updatePagination">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>entries</span>
      </div>
      <button class="add-customer-btn" @click="openAddModal">
        <i class="fa fa-plus"></i> Add Customer
      </button>
    </div>

    <div v-if="loading" class="loading-message">
      <i class="fa fa-spinner fa-spin"></i> Loading data...
    </div>

    <div v-else-if="error" class="error-message">
      <i class="fa fa-exclamation-triangle"></i> {{ error }}
      <button @click="fetchData" class="retry-btn">
        <i class="fa fa-sync-alt"></i> Try again
      </button>
    </div>

    <div v-else class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th @click="sortBy('trackingId')">Tracking ID</th>
            <th>Product</th>
            <th @click="sortBy('customer')" class="sortable">
              Customer
              <span class="sort-icon">
                <img width="7" src="@/assets/img/arrow.png" alt="Arrow" />
              </span>
            </th>
            <th @click="sortBy('date')" class="sortable">
              Date
              <span class="sort-icon">
                <img width="7" src="@/assets/img/arrow.png" alt="Arrow" />
              </span>
            </th>
            <th @click="sortBy('amount')" class="sortable">
              Amount
              <span class="sort-icon">
                <img width="7" src="@/assets/img/arrow.png" alt="Arrow" />
              </span>
            </th>
            <th>Payment Mode</th>
            <th @click="sortBy('status')" class="sortable">
              Status
              <span class="sort-icon">
                <img width="7" src="@/assets/img/arrow.png" alt="Arrow" />
              </span>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sortedItems" :key="index">
            <td data-label="Tracking ID">{{ item.trackingId }}</td>
            <td data-label="Product">{{ item.product }}</td>
            <td data-label="Customer">{{ item.customer }}</td>
            <td data-label="Date">{{ item.date }}</td>
            <td data-label="Amount">{{ item.amount }}</td>
            <td data-label="Payment Mode">{{ item.paymentMode }}</td>
            <td
              data-label="Status"
              :class="['status', item.status.toLowerCase()]"
            >
              {{ item.status }}
            </td>
            <td data-label="Action" class="actions">
              <a href="#" @click.prevent="editItem(item)"
                ><i class="fa fa-edit"></i
              ></a>
              <a class="trash" href="#" @click.prevent="deleteItem(item.id)"
                ><i class="fa fa-trash"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <div class="page-numbers">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>

    <!-- Modal de Edição/Adição -->
    <EditModal
      v-if="showEditModal"
      :show="showEditModal"
      :item="currentItem"
      :mode="modalMode"
      @close="showEditModal = false"
      @save="handleSave"
    />

    <!-- Modal de Exclusão -->
    <DeleteModal
      v-if="showDeleteModal"
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import axios from "axios";
import EditModal from "@/components/EditModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "DashboardView",
  components: {
    EditModal,
    DeleteModal,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      items: [],
      loading: false,
      error: null,
      showEditModal: false,
      showDeleteModal: false,
      currentItem: null,
      modalMode: "edit",
      itemToDelete: null,
      sortColumn: "",
      sortDirection: "asc",
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    sortedItems() {
      if (!this.sortColumn) return this.paginatedItems;

      return [...this.paginatedItems].sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === "desc") modifier = -1;

        // Tratamento especial para valores monetários
        if (this.sortColumn === "amount") {
          const valA = parseFloat(a[this.sortColumn].replace(/[^0-9.-]+/g, ""));
          const valB = parseFloat(b[this.sortColumn].replace(/[^0-9.-]+/g, ""));
          return (valA - valB) * modifier;
        }

        // Tratamento especial para datas
        if (this.sortColumn === "date") {
          const dateA = this.parseDate(a[this.sortColumn]);
          const dateB = this.parseDate(b[this.sortColumn]);
          return (dateA - dateB) * modifier;
        }

        // Ordenação padrão para strings
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.items.slice(start, start + parseInt(this.perPage));
    },
    totalPages() {
      return Math.ceil(this.items.length / this.perPage);
    },
  },
  methods: {
    parseDate(dateStr) {
      const [day, month, year] = dateStr.split("/");
      return new Date(`${year}-${month}-${day}`);
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column;
        this.sortDirection = "asc";
      }
    },
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:3000/products");
        if (response.data && Array.isArray(response.data)) {
          this.items = response.data;
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        this.error = "Failed to load data. Please try again.";
        console.error("Error fetching data:", err);
      } finally {
        this.loading = false;
      }
    },
    editItem(item) {
      this.currentItem = { ...item };
      this.modalMode = "edit";
      this.showEditModal = true;
    },
    openAddModal() {
      this.currentItem = {
        id: null,
        trackingId: `#${Math.floor(10000 + Math.random() * 90000)}`,
        product: "",
        customer: "",
        date: new Date().toLocaleDateString("en-GB"),
        amount: "",
        paymentMode: "Transfer Bank",
        status: "process",
      };
      this.modalMode = "add";
      this.showEditModal = true;
    },
    handleSave(updatedItem) {
      if (this.modalMode === "edit") {
        const index = this.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          this.items.splice(index, 1, updatedItem);
        }
      } else {
        updatedItem.id = this.items.length
          ? Math.max(...this.items.map((item) => item.id)) + 1
          : 1;
        this.items.unshift(updatedItem);
      }
      this.showEditModal = false;
    },
    deleteItem(id) {
      this.itemToDelete = id;
      this.showDeleteModal = true;
    },
    confirmDelete() {
      this.items = this.items.filter((item) => item.id !== this.itemToDelete);
      this.showDeleteModal = false;

      if (this.paginatedItems.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    },
    updatePagination() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
/* Estilos anteriores mantidos */
.sortable {
  cursor: pointer;
  position: relative;
  padding-right: 20px;
}

.sortable:hover {
  background-color: #f1f3f9;
}

.sort-icon {
  position: absolute;
  right: 5px;
  font-size: 12px;
}

/* Outros estilos permanecem iguais */
.dashboard-content {
  padding: 20px 0;
  background-color: #fff;
  min-height: 100vh;
}

.main-header-actions {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.entries-dropdown {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #5a5c69;
}

.entries-dropdown select {
  margin: 0 10px;
  padding: 5px;
  border-radius: 8px;
  font-size: 14px;
  color: #000;
  background-color: #e0e0e0;
  border: none;
}

.add-customer-btn {
  background-color: #624de3;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.add-customer-btn:hover {
  background-color: #705deb;
  transition: 0.3s;
}

.loading-message,
.error-message {
  padding: 20px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
}

.retry-btn {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #624de3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.table-container {
  overflow-x: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  height: 30px;
}

.data-table th {
  background-color: #fff;
  font-weight: bold;
  color: #5a5c69;
}

.data-table tr:hover {
  background-color: #f7f6fe;
  transition: 0.3s;
}

.status {
  text-transform: capitalize;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
}

.status.delivered {
  background-color: #d4edda;
  color: #155724;
  padding: 0 10px;
  position: relative;
  top: 12px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status.process {
  background-color: #fff3cd;
  color: #856404;
  padding: 0 10px;
  position: relative;
  top: 12px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status.canceled {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0 10px;
  position: relative;
  top: 12px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions a {
  color: #624de3;
  font-size: 16px;
  margin: 0 5px;
}

.actions .trash {
  color: #a30d11;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0 0;
  align-items: center;
  gap: 5px;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #624de3;
  color: white;
  border-color: #624de3;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.data-table tr {
  background-color: #f7f6fe;
}

tr:nth-child(even) {
  background-color: #fff;
}

.data-table thead tr {
  background-color: #fff;
}

@media (max-width: 768px) {
  .main-header-actions {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .data-table thead {
    display: none;
  }

  .data-table tr {
    display: block;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
  }

  .data-table td {
    display: flex;
    justify-content: space-between;
    text-align: right;
    padding-left: 50%;
    position: relative;
    border-bottom: none;
  }

  .data-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 15px;
    font-weight: bold;
    color: #5a5c69;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }

  .page-numbers {
    flex-wrap: wrap;
    justify-content: center;
  }

  .status.delivered {
    background-color: #d4edda;
    color: #155724;
    padding: 5px 10px;
    position: relative;
    top: 10px;
    font-weight: normal;
  }

  .status.process {
    background-color: #fff3cd;
    color: #856404;
    padding: 5px 10px;
    position: relative;
    top: 10px;
    font-weight: normal;
  }

  .status.canceled {
    background-color: #f8d7da;
    color: #721c24;
    padding: 5px 10px;
    position: relative;
    top: 10px;
    font-weight: normal;
  }

  .status.delivered,
  .status.process,
  .status.canceled {
    margin-bottom: 30px;
  }
}
</style>
