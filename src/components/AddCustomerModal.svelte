<script lang="ts">
  import Modal from './Modal.svelte';
  import CustomerForm from './CustomerForm.svelte';
  import { db } from '../lib/db';
  
  export let show = false;
  
  function handleClose() {
    show = false;
  }
  
  async function handleSubmit(event: CustomEvent) {
    const customer = event.detail;
    try {
      await db.addCustomer(customer);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer');
    }
  }
</script>

<Modal {show} title="Add New Customer" on:close={handleClose}>
  <CustomerForm on:submit={handleSubmit} />
  
  <div slot="actions">
    <button 
      class="btn btn-secondary mr-3"
      on:click={handleClose}
    >
      Cancel
    </button>
  </div>
</Modal>