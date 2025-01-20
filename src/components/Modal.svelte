<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  export let show = false;
  export let title: string;
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  const dispatch = createEventDispatcher();
  
  function close() {
    dispatch('close');
  }

  function handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      close();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };
</script>

{#if show}
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    transition:fade={{ duration: 200 }}
  >
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        on:click={close}
        transition:fade={{ duration: 200 }}
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full {sizes[size]} sm:align-middle"
        transition:fly={{ y: 20, duration: 200 }}
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                {title}
              </h3>
              <div class="mt-4">
                <slot />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
{/if}