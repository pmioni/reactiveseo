<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {
    console.log('App created')
  }
}
</script>

<style>
#app {
}
</style>
