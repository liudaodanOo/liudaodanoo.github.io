<script setup>
import { ref } from 'vue';

const videoRef = ref(void 0);

console.log('videoRef', videoRef);
</script>

<video ref="videoRef" src="/docs/pdd/jiaocheng.mp4" controls autoplay></video>
