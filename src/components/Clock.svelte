<script lang="ts">
  import { onMount } from 'svelte';
  import NepaliDate from 'nepali-date-converter';
  
  let time = new Date();
  let nepaliDate = new NepaliDate(time);
  
  function updateTime() {
    time = new Date();
    nepaliDate = new NepaliDate(time);
  }
  
  function formatTime(date: Date) {
    return date.toLocaleTimeString('ne-NP', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  }
  
  function formatNepaliDate(date: any) {
    return `${date.format('ddd, DD MMMM YYYY')}`;
  }
  
  onMount(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 inline-block">
  <div class="text-5xl font-bold text-primary-600 mb-2 font-mono">{formatTime(time)}</div>
  <div class="text-xl text-gray-600">{formatNepaliDate(nepaliDate)}</div>
</div>

<style>
  div {
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
  }
</style>