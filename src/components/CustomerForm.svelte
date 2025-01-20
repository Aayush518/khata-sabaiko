<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { db } from '../lib/db';
  
  export let customer = {
    name: '',
    address: '',
    contact: ''
  };
  
  const dispatch = createEventDispatcher();
  
  function handleSubmit() {
    if (customer.id) {
      db.updateCustomer(customer.id, customer);
    } else {
      db.addCustomer(customer);
    }
    dispatch('submit', customer);
    
    // Refresh the page to show updated data
    window.location.reload();
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      id="name"
      bind:value={customer.name}
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      required
    />
  </div>
  
  <div>
    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
    <input
      type="text"
      id="address"
      bind:value={customer.address}
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      required
    />
  </div>
  
  <div>
    <label for="contact" class="block text-sm font-medium text-gray-700">Contact</label>
    <input
      type="text"
      id="contact"
      bind:value={customer.contact}
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      required
    />
  </div>
  
  <button
    type="submit"
    class="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
  >
    Save
  </button>
</form>