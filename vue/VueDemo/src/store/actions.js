import axios from 'axios';
export default {
  getArticleLists(context) {
    context.commit('addArticleNumber');
    let number = context.getters.getArticleNumber;
    axios
      .get('https://cnodejs.org/api/v1/topics', {
        params: {
          page: 1,
          limit: number,
          mdrender: 'false'
        }
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
