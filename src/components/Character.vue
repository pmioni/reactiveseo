<template>
  <div class="hello">
      <p>This is a character bio for character {{post.title}}:</p>
      <h2>{{post.title}}</h2>
      <p>{{post.data}}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Character',
  data () {
    return {
      post: {
        title: '',
        data: ''
      },
      delay: 300,
      errors: []
    }
  },
  created () {
    this.post.title = this.$route.params.name
    // console.log(service)
    axios.get('https://hcetest.getsandbox.com' + '/' + this.$route.params.name.toLowerCase())
    .then(response => {
      // JSON responses are automatically parsed.
      console.log(response.data)
      this.post.data = response.data.status
      // console.log(this.posts)
    })
    .catch(e => {
      this.errors.push(e)
    })

    // async / await version (created() becomes async created())
    //
    // try {
    //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //   this.posts = response.data
    // } catch (e) {
    //   this.errors.push(e)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
