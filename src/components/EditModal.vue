<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <h3>Status:</h3>
        <select v-model="localItem.status" class="status-select">
          <option value="delivered">Delivered</option>
          <option value="process">Process</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" @click="close">Cancel</button>
        <button class="apply-btn" @click="save">Apply</button>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-container">
      <button class="close-btn" @click="close">&times;</button>

      <div class="modal-body">
        <div class="modal-row">
          <div class="modal-field">
            <label>Status:</label>
            <select v-model="localItem.status" class="status-select">
              <option value="delivered">Delivered</option>
              <option value="process">Process</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label>Product:</label>
            <input v-model="localItem.product" class="field-value" />
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label>Customer:</label>
            <input v-model="localItem.customer" class="field-value" />
          </div>
        </div>

        <div class="inline-fields">
          <div class="modal-field">
            <label>Date:</label>
            <input v-model="localItem.date" class="field-value" />
          </div>
          <div class="modal-field">
            <label>Amount:</label>
            <input v-model="localItem.amount" class="field-value" />
          </div>
        </div>

        <div class="modal-row">
          <div class="modal-field">
            <label>Payment Mode:</label>
            <select v-model="localItem.paymentMode" class="field-value">
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="close">Cancel</button>
        <button class="apply-btn" @click="save">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditModal",
  props: {
    show: Boolean,
    item: Object,
    mode: {
      type: String,
      default: "edit",
    },
  },
  data() {
    return {
      localItem: { ...this.item },
    };
  },
  watch: {
    item(newVal) {
      this.localItem = { ...newVal };
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save", { ...this.localItem });
    },
  },
};
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  z-index: 20;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #7566db;
}

.close-btn:hover {
  background-color: #f8f9fa;
  color: #495057;
  transition: 0.3s;
}

.modal-header {
  padding-right: 40px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #EEF1FF;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  margin: auto;
}

.modal-header {
  padding: 20px 20px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e3e6f0;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
}

.modal-header h3 {
  margin: 0;
  margin-right: 10px;
  font-size: 16px;
  color: #5a5c69;
  white-space: nowrap;
}

.status-select {
  padding: 5px 10px;
  border: 1px solid #e1e5fe;
  border-radius: 4px;
  font-size: 14px;
  color: #252d59;
  width: 100%;
  background-color: #eef1ff;
  height: 40px;
}

.modal-body {
  padding: 15px 20px;
}

.modal-row {
  margin-bottom: 15px;
}

.modal-field {
  display: flex;
  flex-direction: column;
}

.modal-field label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #252d59;
  font-weight: 600;
}

.field-value {
  padding: 8px 12px;
  border: 1px solid #e1e5fe;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  color: #252d59;
  height: 40px;
  background-color: #eef1ff;
}

.inline-fields {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.inline-fields .modal-field {
  flex: 1;
}

.modal-footer {
  padding: 15px 20px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
}

.cancel-btn,
.apply-btn {
  padding: 15px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  margin: 0 5px;
}

.cancel-btn {
  background-color: #f8f9fc;
  border: 1px solid #d1d3e2;
  color: #5a5c69;
}

.cancel-btn:hover {
  background-color: #edf2f7;
}

.apply-btn {
  background-color: #624de3;
  color: white;
  border: none;
}

.apply-btn:hover {
  background-color: #705deb;
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
    align-items: flex-start;
  }

  .modal-container {
    max-height: calc(100vh - 20px);
  }

  .inline-fields {
    flex-direction: column;
    gap: 10px;
  }

  .modal-header {
    padding: 15px 15px 10px;
  }

  .modal-body {
    padding: 10px 15px;
  }

  .modal-footer {
    padding: 10px 15px;
  }

  .cancel-btn,
  .apply-btn {
    padding: 8px 12px;
  }
}
</style>
