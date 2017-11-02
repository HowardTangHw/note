<template>
    <div class='secDiv' v-loading='loading'>
        <div v-for='item of articleLists'>
            <router-link :to='{name: "UserRoute",params:{name: item.author.loginname}}'><img :src='item.author.avatar_url' :title='item.author.loginname'></router-link>
            <div class='textDiv'>
                <router-link :to='{name:"ArticleRoute",params:{id:item.id}}'>{{item.title}}</router-link>
                <div class='stuff'>
                    <span>回复：{{item.reply_count}}</span>
                    <span>创建于：{{dealTime(item.create_at)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MainSection',
  data() {
    return {
      loading: true
    };
  },
  created() {
    let scrollH = this.$store.state.scrollH;
    if (scrollH) window.scrollTo(0, scrollH);
    this.getData();
  },
  watch: {
    articleLists(val) {
      if (val) {
        this.loading = false;
      }
    }
  },
  computed: {
    articleLists() {
      return this.$store.state.articleLists;
    }
  },
  methods: {
    scrollMethod() {
      const sumH = document.body.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH = document.documentElement.scrollTop || document.body.scrollTop;
      if (viewH + scrollH >= sumH) {
        this.getData();
      }
    },
    getData() {
      this.$store.dispatch('getArticleLists');
    },
    dealTime(time) {
      return String(time).match(/.{10}/)[0];
    }
  },
  mounted() {
    window.addEventListener('scroll', this._.debounce(this.scrollMethod, 300));
  },
  beforeRouteLeave(to, from, next) {
    const scrollH = document.documentElement.scrollTop || document.body.scrollTop;
    this.$store.commit('changeScrollH', scrollH);
    next();
  }
};
</script>

<style scoped>
.secDiv {
  width: 60%;
  background: #f9fafc;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  font-size: 22px;
  padding: 2rem;
}
a {
  text-decoration: none;
}
.secDiv > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
  border-bottom: 2px solid #c0ccda;
  padding-bottom: 1rem;
}

.secDiv > div img {
  width: 4rem;
  height: 4rem;
  margin-right: 2rem;
}
.secDiv > div img {
  width: 4rem;
  height: 4rem;
  margin-right: 2rem;
}
.textDiv {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}
.textDiv a {
  color: black;
  font-size: 25px;
}
.textDiv a:visited {
  color: grey;
}
.textDiv a:visited {
  color: grey;
}
.stuff {
  font-size: 17px;
  margin-top: 1rem;
  color: #8492a6;
}
.stuff span:first-child {
  margin-right: 2rem;
}
</style>