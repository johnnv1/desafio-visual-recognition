<template>
  <div class="container">
    <div class="wrapper">
      <div class="wrapper-card">
        <div class="container-card-error" v-if="hasError">
          <span>{{errorMessage}}</span>
        </div>
        <div class="container-card" v-if="!hasError">
          <div class="title">
            <div>
              <span class="text">{{name}}</span>
            </div>
          </div>
          <div class="image">
            <img :src="imageUrl" />
          </div>
          <div class="info">
            <div>
              <span class="text">Semelhança: {{score}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper wrapper-button">
      <Button :title="buttonTitle" :clickAction="goHome"/>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Card',
  props: ['data'],
  data() {
    return {
      buttonTitle: 'Tentar Novamente',
      score: 0,
      name: '',
      imageUrl: '',
      hasError: false,
      errorMessage: '',
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    },
  },
  created() {
    if (!this.data) {
      this.goHome();
      return;
    }

    const {
      score,
      imagePath,
      status,
    } = this.data;

    if (status !== 200) {
      this.hasError = true;
      this.errorMessage = (status === 404) ? 'Match não encontrado!.' : 'Algo de errado..';
      return;
    }

    const name = this.data.class;
    if (!name || !score || !imagePath) {
      this.hasError = true;
      return;
    }

    this.name = name;
    this.score = (score * 100).toFixed(2);
    this.imageUrl = imagePath;
  },
  components: {
    Button,
  },
};
</script>

<style scoped>

  @import url("../colors.css");

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(84, 204, 227, 0.4);
    }
    70% {
      box-shadow: 0 0 0 20px rgb(84, 204, 227, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(84, 204, 227, 0);
    }
  }

  @keyframes pulse-error {
    0% {
      box-shadow: 0 0 0 0 rgb(244, 66, 95, 0.4);
    }
    70% {
      box-shadow: 0 0 0 20px rgb(244, 66, 95, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(244, 66, 95, 0);
    }
  }

  .container {
    display: flex;
    height: 100vh;
    align-items: center;
  }

  .container-card-error {
    color: #f4425f;
    width: 80%;
    height: 60%;
    text-align: center;
    border: #f4425f solid 1px;
    border-radius: 4%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    animation: pulse-error 2s infinite;
  }

  .container-card-error span {
    font-size: 1.3em
  }

  .wrapper {
    width: 50%;
    height: 100%;
  }

  .wrapper-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .wrapper-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .container-button {
    width: 100% !important;
  }

  .container-card {
    width: 80%;
    height: 60%;
    text-align: center;
    border: var(--light-green) solid 1px;
    border-radius: 4%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    animation: pulse 2s infinite;
  }

  .text {
    color: var(--light-green);
    font-size: 1em;
  }


  .container-card .image img {
    border-radius: 50%;
    border: var(--light-green) solid 1px;
    object-fit: cover;
    width: 40vh;
    height: 40vh;
  }

  @media screen and (orientation: portrait) {
    .container {
      display: block;
      height: 97vh;
      margin-top: 3vh;
    }

    .container-card-error span {
      font-size: 2.5em
    }

    .wrapper {
      width: 100%;
      height: 70%;
    }

    .wrapper-button {
      height: 20%;
    }

    .text {
      font-size: 2em;
    }

    .container-card .image img  {
      width: 30vh;
      height: 30vh;
    }
  }

</style>


