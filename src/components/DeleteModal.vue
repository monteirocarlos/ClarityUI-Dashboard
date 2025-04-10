<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-container">
      <button class="close-btn" @click="close">&times;</button>

      <div class="modal-content">
        <img width="70" src="@/assets/img/alert.jpg" alt="Alert" />
        <h3 class="modal-title">Delete Order</h3>
        <p class="modal-message">
          <b>Are you sure you want to delete this order?</b>
        </p>
        <p class="modal-warning">This action cannot be undone.</p>

        <div class="modal-actions">
          <button class="cancel-btn" @click="close">Cancel</button>
          <button class="delete-btn" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: {
    show: Boolean,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirmDelete() {
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped>
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
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 24px;
  position: relative;
}

.close-btn {
  position: fixed;
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

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
}

.modal-message {
  font-size: 15px;
  color: #667085;
  margin-bottom: 8px;
  line-height: 1;
}

.modal-warning {
  font-size: 14px;
  margin-bottom: 24px;
  font-weight: 300;
  line-height: 1;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.cancel-btn,
.delete-btn {
  padding: 15px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
}

.cancel-btn {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.cancel-btn:hover {
  background-color: #edf2f7;
}

.delete-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #c53030;
}

@media (max-width: 480px) {
  .modal-container {
    width: 90%;
  }
}
</style>
