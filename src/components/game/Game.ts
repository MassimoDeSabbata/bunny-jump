import { Component, Vue } from 'vue-property-decorator';
import { PlatformBasePropriety } from '@/constants/PlatformBasePropriety';

@Component
export default class Game extends Vue {
  gamerBottomPosition: any = 0;
  plaftormsArray: any[] = [];
  gameEnded: any = false;
  platformIndex: any = 0;
  platformSpawnElapsedTime: any = 0;
  gamerImageCounter = 1;
  currentScore: any = 0;
  maxScore: any = 0;

  created() {
    this.listenToKeyPressSpace();
    this.startPlatformLoop();
  }

  restartGame() {
    
    if(this.gameEnded === false){
      return;
    }
    this.plaftormsArray = [];
    this.gamerBottomPosition = 0;
    this.gameEnded = false;
    this.platformIndex = 0;
    this.platformSpawnElapsedTime = 0;
    this.gamerImageCounter = 1;
    this.currentScore = 0;
    this.startPlatformLoop();
  }

  playerJump() {
    if (this.gamerBottomPosition != 0) {
      return;
    }
    this.playerGoesUp();
  }

  async playerGoesUp() {
    while (this.gamerBottomPosition < 100) {
      this.gamerBottomPosition += this.getPlayerGoesUpDelta();
      await this.delay(1);
    }
    this.playerGoesDown();
  }

  async playerGoesDown() {
    while (this.gamerBottomPosition >= 1) {
      this.gamerBottomPosition -= this.getPlayerGoesDownDelta();
      await this.delay(1);
    }
    this.gamerBottomPosition = 0;
  }

  getPlayerGoesUpDelta() {
    return this.getPlayerDelta(100 - this.gamerBottomPosition);
  }

  getPlayerGoesDownDelta() {
    return this.getPlayerDelta(this.gamerBottomPosition);
  }

  getPlayerDelta(position: any) {
    const delta = position / 20;
    if (delta >= 1) {
      return delta;
    }
    return 1;
  }

  listenToKeyPressSpace() {
    window.addEventListener('keydown', (e) => {
      if (e.key == ' ') {
        this.playerJump();
      }
    });
  }

  async startPlatformLoop() {
    while (!this.gameEnded) {
      this.spawnPlatform();
      this.moveAndCheckPlatformsForDelation();
      this.updateGamerImage();
      this.updateGamerScore();
      await this.delay(30);
    }
  }

  updateGamerImage() {
    if (this.gamerImageCounter === 6) {
      this.gamerImageCounter = 1;
      return;
    }
    this.gamerImageCounter += 1;
  }

  updateGamerScore() {
    if (this.gamerImageCounter) {
      this.currentScore += 1;
    }
  }

  isGamerClassActive(classNumber: any) {
    if (this.gamerBottomPosition !== 0) {
      if (classNumber === 'jump') {
        return true;
      }
      return false;
    }
    if (classNumber === this.gamerImageCounter) {
      return true;
    }
    return false;
  }

  moveAndCheckPlatformsForDelation() {
    const newPlatformsArray: any[] = new Array<any>();
    for (let platformsIndex = 0; platformsIndex < this.plaftormsArray.length; platformsIndex++) {
      this.plaftormsArray[platformsIndex].platformLeftPosition = this.plaftormsArray[platformsIndex].platformLeftPosition - 1;
      this.plaftormsArray[platformsIndex].platformId = this.getPlatformIndex();
      if (this.plaftormsArray[platformsIndex].platformLeftPosition > 0) {
        newPlatformsArray.push(this.plaftormsArray[platformsIndex]);
      }
      this.detectCollision(this.plaftormsArray[platformsIndex]);
    }
    this.plaftormsArray = newPlatformsArray;
  }

  getPlatformIndex() {
    if (this.platformIndex > 200) {
      this.platformIndex = 0;
    }
    this.platformIndex += 1;
    return this.platformIndex;
  }

  spawnPlatform() {
    const randomNumber = this.generateRandomBetween(1, 100);
    if (randomNumber > 96 && this.platformSpawnElapsedTime > 20) {
      this.addPlatformToArray();
      this.platformSpawnElapsedTime = 0;
    }
    this.platformSpawnElapsedTime += 1;
  }

  addPlatformToArray() {
    const newPlatform = { ...PlatformBasePropriety };
    newPlatform.platformId = this.getPlatformIndex();
    this.plaftormsArray.push(newPlatform);
  }

  detectCollision(platform: any) {
    if (platform.platformLeftPosition === 2 && this.gamerBottomPosition < platform.platformHeight) {
      this.endGame();
    }
  }

  endGame() {
    this.gameEnded = true;
    if (this.currentScore > this.maxScore) {
      this.maxScore = this.currentScore;
    }
  }

  /**
   * Generates a random number between the max and the min one.
   * @param min number
   * @param max number
   */
  generateRandomBetween(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
