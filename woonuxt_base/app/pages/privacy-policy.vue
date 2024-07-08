<script setup>
const { data } = await useAsyncGql("getPage", {uri: "privacy-policy"});
console.log(data);
</script>

<template>
    <div><p>{{ data }}</p></div>
</template>