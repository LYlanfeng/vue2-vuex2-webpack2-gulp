/**
 * Created by lanfeng on 2016/12/2.
 */
import Vue from 'vue';
import App from './../components/app.vue';
import store from './../store';


new Vue({
    el: '#app',
    // render: h => h(App),
    store,
    components: {
        App
    },
});