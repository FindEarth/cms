<script>

  export default ({
    props: {
      limitToReach: {
        type: Number,
        required: true
      },
      animationDuration: {
        type: Number,
        default: 1000,
        required: false
      }
    },

    data() {

      return {
        counter: 0
      };
    },

    mounted() {
      this.transitionCounter();
    },

    methods: {
      transitionCounter() {
        const intervalTime = this.limitToReach / this.animationDuration;
        const interval = setInterval(() => {
          this.counter += intervalTime;
          if (this.counter >= this.limitToReach) {
            clearInterval(interval);
            this.counter = this.limitToReach;
          }
        }, 1);
      }
    },
    computed: {
      showCounter() {
        return parseInt(this.counter, 10);
      }
    }
  });
</script>

<template lang='pug'>
  span {{ showCounter }}
</template>
