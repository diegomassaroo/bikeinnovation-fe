<script setup>
const time = ref('');

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  time.value = `${hours}:${minutes}`;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000); // Update every second
});
</script>

<template>
  <div>
    <p>{{ time }}</p>
  </div>
</template>
