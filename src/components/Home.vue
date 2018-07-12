<template>
  <div class="hello">
    <p><em>{{ msg }}</em></p>
    <h2>{{ text1 }}</h2>
    <p>{{ text2 }}</p>
    <p><em>{{ msg2 }}</em></p>
    <hr>
    <p v-if="delayedText.length > 0">{{ delayedText }}</p>
    <p><em>{{ msg3 }}</em></p>
    <hr>
    <div v-for="post of posts">
      <h2>{{post.title}}</h2>
      <p>{{post.data | twoSentences}}</p>
      <router-link :to="{ name: 'character', params: { name: post.title } }">>See full bio</router-link>
      <p><em>(delay: {{ post.delay }}ms)</em></p>
      <hr>
    </div>
    <div class="errors" v-if="errors.length > 0">
      <h3>Javascript Errors, if any:</h3>
      <ul>
        <li v-for="error of errors">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  filters: {
    twoSentences: function (text) {
      let tmp = text.replace('a.k.a.', 'AKA').split('. ', 3)
      tmp.pop()
      return tmp.join('. ') + '.'
    }
  },
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
      title: 'Reactive SEO experiment with Vue.js (rendered title)',
      description: 'is is a reactive SEO experiment to test Search Engine\'s indexing capabilities with front-end Javascript frameworks, in this case Vue.js (rendered description)',
      delay: 300,
      msg: 'Text below the above line is rendered by Vue.js reactively, but is rendered immediately, without REST calls. Here\'s a description of the novel:',
      msg2: 'Text below the following line is rendered by Vue.js reactively, and is shown after a delay of 300 ms',
      msg3: 'Text below the following line is rendered by Vue.js reactively, and comes from a REST service. Each character bio comes from a separate web service call, and each is delayed by a number of milliseconds. The delay of each REST call is detailed after  each text.',
      text1: 'Infinite Jest',
      text2: 'Infinite Jest (1996) is a novel written by David Foster Wallace. The lengthy and complex work takes place in a semi-parodic future version of North America. The novel touches on the topics of tennis; substance addiction and recovery programs; depression; child abuse; family relationships; advertising and popular entertainment; film theory; and Quebec separatism.',
      text3: 'The novel derives its name in part from a line in Hamlet, in which Hamlet refers to the skull of Yorick, the court jester: "Alas, poor Yorick! I knew him, Horatio: a fellow of infinite jest, of most excellent fancy: he hath borne me on his back a thousand times; and now, how abhorred in my imagination it is!"',
      delayedText: '',
      errors: [],
      services: [
        {
          name: 'James',
          url: '/james',
          delay: 0
        },
        {
          name: 'Avril',
          url: '/avril',
          delay: 300
        },
        {
          name: 'Hal',
          url: '/hal',
          delay: 600
        },
        {
          name: 'Mario',
          url: '/mario',
          delay: 900
        },
        {
          name: 'Orin',
          url: '/orin',
          delay: 1200
        },
        {
          name: 'Pemulis',
          url: '/pemulis',
          delay: 1500
        },
        {
          name: 'Stice',
          url: '/stice',
          delay: 1800
        },
        {
          name: 'Wayne',
          url: '/wayne',
          delay: 2100
        },
        {
          name: 'Gately',
          url: '/gately',
          delay: 2400
        },
        {
          name: 'Joelle',
          url: '/joelle',
          delay: 2700
        }
      ],
      posts: []
    }
  },
  methods: {
    addDelayedText () {
      this.delayedText = this.text3
    }
  },
  created () {
    for (let service in this.services) {
      // console.log(service)
      axios.get('https://hcetest.getsandbox.com' + this.services[service].url)

      .then(response => {
        // JSON responses are automatically parsed.
        console.log(response.data)
        this.posts.push(
          {
            title: this.services[service].name,
            delay: this.services[service].delay,
            data: response.data.status
          }
        )
        // console.log(this.posts)
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
    window.setTimeout(this.addDelayedText, this.delay)

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
