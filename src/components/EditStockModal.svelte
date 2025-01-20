<script lang="ts">
  import Modal from './Modal.svelte';
  import { db } from '../lib/db';
  
  export let show = false;
  export let stockId: number | null = null;
  
  let stock = {
    id: null,
    name: '',
    quantity: 0,
    unit: '',
    unitPrice: 0
  };
  
  $: if (stockId) {
    const stockData = db.getStocks().find(s => s.id === stockId);
    if (stockData) {
      stock = { ...stockData };
    }
  }
  
  function handleClose() {
    show = false;
    stockId = null;
  }
  
  function handleSubmit() {
    if (stock.id) {
      db.updateStock(stock.id, stock);
      handleClose();
      window.location.reload(); // Refresh to show updated data
    }
  }
</script>

<Modal {show} title="Edit Stock" on:close={handleClose}>
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="edit-name" class="block text-sm font-medium text-gray-700">Item Name</label>
      <input
        type="text"
        id="edit-name"
        bind:value={stock.name}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="edit-quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
      <input
        type="number"
        id="edit-quantity"
        bind:value={stock.quantity}
        min="0"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="edit-unit" class="block text-sm font-medium text-gray-700">Unit</label>
      <input
        type="text"
        id="edit-unit"
        bind:value={stock.unit}
        placeholder="e.g., kg, pcs"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="edit-unitPrice" class="block text-sm font-medium text-gray-700">Unit Price</label>
      <input
        type="number"
        id="edit-unitPrice"
        bind:value={stock.unitPrice}
        min="0"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
  </form>
  
  <div slot="actions">
    <button 
      class="btn btn-secondary mr-3"
      on:click={handleClose}
    >
      Cancel
    </button>
    <button 
      class="btn btn-primary"
      on:click={handleSubmit}
    >
      Save Changes
    </button>
  </div>
</Modal>