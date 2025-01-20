<script lang="ts">
  import Modal from './Modal.svelte';
  import { db } from '../lib/db';
  
  export let show = false;
  
  let purchase = {
    dealerName: '',
    items: [{ name: '', quantity: 0, price: 0, total: 0 }]
  };
  
  function calculateTotal(item: any) {
    item.total = item.quantity * item.price;
    return item.total;
  }
  
  function addItem() {
    purchase.items = [...purchase.items, { name: '', quantity: 0, price: 0, total: 0 }];
  }
  
  function removeItem(index: number) {
    purchase.items = purchase.items.filter((_, i) => i !== index);
  }
  
  function handleClose() {
    show = false;
    purchase = {
      dealerName: '',
      items: [{ name: '', quantity: 0, price: 0, total: 0 }]
    };
  }
  
  function handleSubmit() {
    const total = purchase.items.reduce((sum, item) => sum + item.total, 0);
    db.addPurchase({
      ...purchase,
      date: new Date().toISOString(),
      total
    });
    handleClose();
  }
</script>

<Modal {show} title="Add New Purchase" on:close={handleClose} size="lg">
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
      <label for="dealerName" class="block text-sm font-medium text-gray-700">Dealer Name</label>
      <input
        type="text"
        id="dealerName"
        bind:value={purchase.dealerName}
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
      
      {#each purchase.items as item, index}
        <div class="grid grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Item</label>
            <input
              type="text"
              bind:value={item.name}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
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