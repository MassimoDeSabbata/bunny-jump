<template>
  <div class="Game font-minecraft">
    <div class="row all-game-container">
      <div class="score-container cloud-image-bg col-12">
        <div class="row">
          <div class="col text-left score-content mt-5">
            <h3>Score: {{currentScore}}</h3>
          </div>
        </div>
        <div class="row">
          <div class="col text-left score-content mt-2">
            <h5>Max Score: {{maxScore}}</h5>
          </div>
        </div>

        <div class="row">
          <div class="col text-left score-content mt-2">
            <Button
              class="btn btn-lg transparent-button ml-5"
              v-if="gameEnded"
              v-on:click="restartGame"
            >Retry</Button>
          </div>
        </div>
      </div>
      <div class="col">
        <div
          class="gamer gamer-image-bg"
          v-bind:style="{ bottom: gamerBottomPosition + 'px' }"
          v-bind:class="{'gamer-image-bg-1' : isGamerClassActive(1), 'gamer-image-bg-2' : isGamerClassActive(2), 'gamer-image-bg-3' : isGamerClassActive(3), 'gamer-image-bg-4' : isGamerClassActive(4), 'gamer-image-bg-5' : isGamerClassActive(5), 'gamer-image-bg-6' : isGamerClassActive(6),  'gamer-image-bg-jump' : isGamerClassActive('jump')}"
          :key="gamerBottomPosition"
        ></div>
        <div v-for="platform in plaftormsArray" :key="platform.platformId">
          <div
            class="platform staccionata"
            v-bind:style="{ left: platform.platformLeftPosition + '%' }"
            :key="gamerBottomPosition"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Game.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.all-game-container {
  height: 95vh;
}

.score-container {
  /* position: absolute; */
  margin-left: 50px;
  height: 500px !important;
}

.gamer {
  /* height: 100px;
  width: 20px; */
  /* background-color: black; */
  position: absolute;
  left: 2%;
}

.platform {
  height: 50px;
  width: 20px;
  /* background-color: black; */
  position: absolute;
  bottom: 0px;
}

.cloud-image-bg {
  background-image: url("./../../assets/cloud.png");
  background-repeat: no-repeat;
  height: 132px;
  width: 84px;
}

.gamer-image-bg {
  background-repeat: no-repeat;
  height: 132px;
  width: 84px;
}

.transparent-button {
  color: black;
  background-color: transparent;
  border-color: transparent;
}

.staccionata {
  background-image: url("./../../assets/staccionata3.png");
  background-repeat: no-repeat;
  height: 50px;
  width: 10px;
}

.score-content {
  margin-left: 60px;
}

.gamer-image-bg-1 {
  background-image: url("./../../assets/run1.png");
}

.gamer-image-bg-2 {
  background-image: url("./../../assets/run2.png");
}

.gamer-image-bg-3 {
  background-image: url("./../../assets/run3.png");
}

.gamer-image-bg-4 {
  background-image: url("./../../assets/run4.png");
}

.gamer-image-bg-5 {
  background-image: url("./../../assets/run5.png");
  width: 84px;
}

.gamer-image-bg-6 {
  background-image: url("./../../assets/run6.png");
}

.gamer-image-bg-jump {
  background-image: url("./../../assets/jump.png");
}

@font-face {
  font-family: "Minecraft";
  src: url("./../../assets/font/Minecraft.ttf");
}

.font-minecraft {
  font-family: Minecraft;
}
</style>
