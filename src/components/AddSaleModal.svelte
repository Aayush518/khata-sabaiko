<script lang="ts">
  import Modal from './Modal.svelte';
  import { db } from '../lib/db';
  
  export let show = false;
  
  let sale = {
    customerName: '',
    items: [{ name: '', quantity: 0, price: 0, total: 0 }]
  };
  
  let stocks = db.getStocks();
  
  function calculateTotal(item: any) {
    item.total = item.quantity * item.price;
    return item.total;
  }
  
  function addItem() {
    sale.items = [...sale.items, { name: '', quantity: 0, price: 0, total: 0 }];
  }
  
  function removeItem(index: number) {
    sale.items = sale.items.filter((_, i) => i !== index);
  }
  
  function handleClose() {
    show = false;
    sale = {
      customerName: '',
      items: [{ name: '', quantity: 0, price: 0, total: 0 }]
    };
  }
  
  function handleSubmit() {
    const total = sale.items.reduce((sum, item) => sum + item.total, 0);
    db.addSale({
      ...sale,
      date: new Date().toISOString(),
      total
    });
    handleClose();
  }
</script>

<Modal {show} title="Add New Sale" on:close={handleClose} size="lg">
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
      <label for="customerName" class="block text-sm font-medium text-gray-700">Customer Name</label>
      <input
        type="text"
        id="customerName"
        bind:value={sale.customerName}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium">Items</h3>
        <button
          type="button"
          class="btn btn-secondary"
          on:click={addItem}
        >
          Add Item
        </button>
      </div>
      
      {#each sale.items as item, index}
        <div class="grid grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Item</label>
            <select
              bind:value={item.name}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Select Item</option>
              {#each stocks as stock}
                <option value={stock.name}>{stock.name}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              bind:value={item.quantity}
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
              on:input={() => calculateTotal(item)}
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              bind:value={item.price}
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
              on:input={() => calculateTotal(item)}
            />
          </div>
          
          <div class="flex items-end">
            {#if index > 0}
              <button
                type="button"
                class="btn btn-danger"
                on:click={() => removeItem(index)}
              >
                Remove
              </button>
            {/if}
          </div>
        </div>
      {/each}
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