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
  metaInfo () {
    return {
      title: this.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.description }
      ]
    }
  },
  data () {
    return {
      post: {
        title: '',
        data: ''
      },
      title: 'Character Bio',
      description: 'This is a character bio for the Reactive SEO experiment project ',
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
      this.title = 'Character Bio for ' + this.post.title
      this.description = 'This is the character Bio for ' + this.post.title + ' - ' + this.post.data.substr(0, 100) + '...'
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
