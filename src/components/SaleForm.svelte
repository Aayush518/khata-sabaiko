<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { prisma } from '../lib/db';
  
  export let customers = [];
  export let stocks = [];
  
  let selectedCustomer = '';
  let items = [{ stockId: '', quantity: 1, price: 0 }];
  let loading = false;
  let error = '';
  
  const dispatch = createEventDispatcher();
  
  function addItem() {
    items = [...items, { stockId: '', quantity: 1, price: 0 }];
  }
  
  function removeItem(index: number) {
    items = items.filter((_, i) => i !== index);
  }
  
  function calculateTotal(item) {
    return item.quantity * item.price;
  }
  
  function calculateGrandTotal() {
    return items.reduce((sum, item) => sum + calculateTotal(item), 0);
  }
  
  async function handleSubmit() {
    if (!selectedCustomer) {
      error = 'Please select a customer';
      return;
    }
    
    if (items.some(item => !item.stockId || item.quantity < 1 || item.price < 0)) {
      error = 'Please fill all item details correctly';
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: selectedCustomer,
          items: items.map(item => ({
            stockId: item.stockId,
            quantity: Number(item.quantity),
            price: Number(item.price)
          }))
        })
      });
      
      if (!response.ok) throw new Error('Failed to create sale');
      
      const sale = await response.json();
      dispatch('success', sale);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6 dark:bg-dark-surface p-6 rounded-lg">
  {#if error}
    <div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
      {error}
    </div>
  {/if}
  
  <div>
    <label for="customer" class="block text-sm font-medium dark:text-dark-text">
      Customer
    </label>
    <select
      id="customer"
      bind:value={selectedCustomer}
      class="mt-1 block w-full rounded-md dark:bg-dark-bg dark:text-dark-text dark:border-dark-border"
      required
    >
      <option value="">Select Customer</option>
      {#each customers as customer}
        <option value={customer.id}>{customer.name}</option>
      {/each}
    </select>
  </div>
  
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium dark:text-dark-text">Items</h3>
      <button
        type="button"
        class="btn btn-secondary dark:bg-dark-surface dark:text-dark-text"
        on:click={addItem}
      >
        Add Item
      </button>
    </div>
    
    {#each items as item, index}
      <div class="grid grid-cols-4 gap-4 p-4 border rounded-lg dark:border-dark-border">
        <div>
          <label class="block text-sm font-medium dark:text-dark-text">Item</label>
          <select
            bind:value={item.stockId}
            class="mt-1 block w-full rounded-md dark:bg-dark-bg dark:text-dark-text dark:border-dark-border"
            required
          >
            <option value="">Select Item</option>
            {#each stocks as stock}
              <option value={stock.id}>{stock.name} ({stock.quantity} {stock.unit})</option>
            {/each}
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium dark:text-dark-text">Quantity</label>
          <input
            type="number"
            bind:value={item.quantity}
            min="1"
            class="mt-1 block w-full rounded-md dark:bg-dark-bg dark:text-dark-text dark:border-dark-border"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium dark:text-dark-text">Price</label>
          <input
            type="number"
            bind:value={item.price}
            min="0"
            step="0.01"
            class="mt-1 block w-full rounded-md dark:bg-dark-bg dark:text-dark-text dark:border-dark-border"
            required
          />
        </div>
        
        <div class="flex items-end">
          {#if index > 0}
            <button
              type="button"
              class="btn btn-danger dark:bg-red-900 dark:text-red-100"
              on:click={() => removeItem(index)}
            >
              Remove
            </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  
  <div class="flex justify-between items-center pt-4 border-t dark:border-dark-border">
    <div class="text-lg font-medium dark:text-dark-text">
      Total: रू {calculateGrandTotal().toLocaleString()}
    </div>
    
    <div class="space-x-4">
      <button
        type="button"
        class="btn btn-secondary dark:bg-dark-surface dark:text-dark-text"
        on:click={() => dispatch('cancel')}
        disabled={loading}
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Sale'}
      </button>
    </div>
  </div>
</form>