<template>
  <div class="home">
    <game/>
  </div>
</template>

<script>
// @ is an alias to /src
import game from '@/components/game/Game.vue'

export default {
  name: 'Home',
  components: {
    game
  }
}
</script>
