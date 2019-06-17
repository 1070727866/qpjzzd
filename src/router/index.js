import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import Kkpy from '../components/kkpy/kkpy';
import AlarmMessageStatistics from '../components/alarmMessageStatistics/alarmMessageStatistics';
import PeopleAndCarBk from '../components/peopleAndCarBk/peopleAndCarBk';
import Shouye from '../components/shouye/shouye';
import AlarmCar from '../components/alarmCarSearchResult/alarmCarSearchResult';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/home',
          name: 'menu',
          component: Home
        },
        {
          path: '/alarmMessageStatisticsCar',
          name: 'alarmMessageStatisticsCar',
          component: AlarmMessageStatistics
        },
        {
          path: '/alarmMessageStatisticsPeople',
          name: 'alarmMessageStatisticsPeople',
          component: AlarmMessageStatistics
        },
        {
          path: '/alarmMessageStatisticsPhone',
          name: 'alarmMessageStatisticsPhone',
          component: AlarmMessageStatistics
        },
        {
          path: '/peopleBk',
          name: 'peopleBk',
          component: PeopleAndCarBk
        },
        {
          path: '/carBk',
          name: 'carBk',
          component: PeopleAndCarBk
        },
        {
          path: '/kkpy',
          name: 'kkpy',
          component: Kkpy
        },
        {
          path: '/shouye',
          name: 'shouye',
          component: Shouye
        },
        {
          path: '/AlarmCar',
          name: 'AlarmCar',
          component: AlarmCar
        }
      ]
    }
  ]
})
