<script setup>
const props = defineProps({
  video: { type: String },
});
</script>

<template>
  <div>
    <video width="320" height="240" autoplay muted>
      <source :src="props.video" type="video/mp4" />
    </video>
  </div>
</template>
