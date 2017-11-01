# VueDemo

作者:[ShuiRong Lin](https://github.com/shuiRong/)

github:https://github.com/shuiRong/VueCnodeJS



##### 记录一下`处理文掉文章页两次相同xhr的问题和一个问题`

路由切换的时候`ArticleCom`获取到`${this.$route.path}` 参数,并进行请求,然后将值赋给父组件`this.$parent.authorName`,父组件进行`ref`赋值,再将`authorName`作为`name` 传给`SideSec`,然后就可以请求,然后就可以获取到信息了





改为了VueX的实现步骤:

首先是是定义vueX

结构:

```shell
- store
	- index.js
	- state.js
	- mutations.js
	- getters.js
	- actions.js
```

在index中输出vuex

```js
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})
```

state存放的是状态

```js
export default {
  articleLists: [],
  articleNumber: 0,
  article: { create_at: '2017-04-13', author: { loginname: 'undefined' } },
  articleAuthor: '',
  userInfo: {}
};
```

mutations 是唯一的改变状态的方法(commit 它)

```js
export default {
  addArticleLists(state, articleLists) {
    state.articleLists = articleLists;
  },
  addArticleNumber(state) {
    state.articleNumber += 10;
  },
  addArticle(state, article) {
    state.article = article;
  },
  addArticleAuthor(state, loginName) {
    state.articleAuthor = loginName;
  },
  addUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  }
};
```

getter 是类似于计算属性,用于存放属性,不用多次计算

```js
export default {
  getArticleLists: state => state.articleLists,
  getArticleNumber: state => state.articleNumber,
  getArticles: state => state.article,
  getArticleAuthor: state => state.articleAuthor,
  getUserInfo: state => state.userInfo
};
```

action用于处理异步(在这个demo用于发请求,然后获取数据,最后commit mutation将数据更新)

```js
import axios from 'axios';
export default {
  getArticleLists(context) {
    context.commit('addArticleNumber');
    let number = context.getters.getArticleNumber;
    axios
      .get('https://cnodejs.org/api/v1/topics', {
        page: 1,
        limit: number,
        mdrender: 'false'
      })
      .then(res => {
        context.commit('addArticleLists', res.data.data);
      })
      .catch(res => {
        console.log('MaiSec.vue: ', res);
      });
  },
  getArticle(context, url) {
    axios
      .get(url)
      .then(res => {
        if (res.data.success === true) {
          context.commit('addArticle', res.data.data);
          context.commit('addArticleAuthor', res.data.data.author.loginname);
        } else {
          console.log('Sorry, Something wrong happened when getting the remote data');
        }
      })
      .catch(res => {
        console.log('ArticleCom.vue: ', res);
      });
  },
  getUserInfo(context, url) {
    axios
      .get(url)
      .then(res => {
        context.commit('addUserInfo', res.data.data);
      })
      .catch(res => {
        console.log('SideSec.vue :', res);
      });
  }
};
```



在组件中使用vuex

首先根据页面==>定义url  发起请求(调用vuex的actions)` this.$store.dispatch('getArticleLists');`==>接口访问成功后,vuex的状态改变了,数据获取到了,然后在computed中`userInfo() {return this.$store.state.userInfo; }` 这样就可以将`vuex.state.userInfo`给到了组件中的`userInfo`



用户操作==>`vuex`发请求,获取数据==>返回到页面中==>渲染



ps:可是这个demo用上了getter 可是并没用上..还有应该加个缓存,用`localstorage`?





整个项目思路..

组件的划分(样式)=>页面划分(路由通讯)=>vuex结构(数据的结构)=>Vuex与组件之间数据的传递=>加上其他的axios啊,elementUI啊,underscore啊



vue+vue-router+vuex +axios+elementUi+UnderScore+localstorage