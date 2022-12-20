<script>
  export let index = 0;
  console.log('zzh temst compoentn', $$slots, $$props);
</script>
<div>hello {index}
  <slot />
</div>