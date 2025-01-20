<script lang="ts">
  import Modal from './Modal.svelte';
  import { db } from '../lib/db';
  
  export let show = false;
  
  let stock = {
    name: '',
    quantity: 0,
    unit: '',
    unitPrice: 0
  };
  
  function handleClose() {
    show = false;
    // Reset form
    stock = {
      name: '',
      quantity: 0,
      unit: '',
      unitPrice: 0
    };
  }
  
  async function handleSubmit() {
    if (!stock.name || stock.quantity <= 0 || !stock.unit || stock.unitPrice <= 0) {
      return;
    }
    
    try {
      await db.addStock(stock);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding stock:', error);
      alert('Failed to add stock');
    }
  }
</script>

<Modal {show} title="Add New Stock" on:close={handleClose}>
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Item Name</label>
      <input
        type="text"
        id="name"
        bind:value={stock.name}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
      <input
        type="number"
        id="quantity"
        bind:value={stock.quantity}
        min="0"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="unit" class="block text-sm font-medium text-gray-700">Unit</label>
      <input
        type="text"
        id="unit"
        bind:value={stock.unit}
        placeholder="e.g., kg, pcs"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="unitPrice" class="block text-sm font-medium text-gray-700">Unit Price</label>
      <input
        type="number"
        id="unitPrice"
        bind:value={stock.unitPrice}
        min="0"
        step="0.01"
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
      Save
    </button>
  </div>
</Modal>