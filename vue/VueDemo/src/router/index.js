import Vue from 'vue';
import Router from 'vue-router';
import MainSec from '@/components/MainSec';
import ArticleCom from '@/components/ArticleCom';
import SideSec from '@/components/SideSec';
import UserCom from '@/components/UserCom';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RootPath',
      components: {
        main: MainSec
      },
      beforeRouteLeave(to, from, next) {
        console.log('123123');
      }
    },
    {
      path: '/topic/:id',
      name: 'ArticleRoute',
      components: {
        main: ArticleCom,
        side: SideSec,
        center: UserCom
      }
    },
    {
      path: '/user/:name',
      name: 'UserRoute',
      components: {
        main: UserCom
      }
    },
    //增加重定向
    {
      path: '/user/:name',
      redirect: '/user:name'
    }
  ]
});
