<script lang="ts">
  import Modal from './Modal.svelte';
  
  export let show = false;
  
  let dealer = {
    name: '',
    address: '',
    contact: ''
  };
  
  function handleClose() {
    show = false;
  }
  
  function handleSubmit() {
    // Add dealer logic here
    handleClose();
  }
</script>

<Modal {show} title="Add New Dealer" on:close={handleClose}>
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        bind:value={dealer.name}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
      <input
        type="text"
        id="address"
        bind:value={dealer.address}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        required
      />
    </div>
    
    <div>
      <label for="contact" class="block text-sm font-medium text-gray-700">Contact</label>
      <input
        type="text"
        id="contact"
        bind:value={dealer.contact}
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