/**
 * Created by lanfeng on 2016/12/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'

// 告诉 vue “使用” store
Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态
const state = {
    // TODO: 放置初始状态
    dishes_cooking:{
        total:0,
        cooked:0,
        completed:0,
        already:0,
        percent:0
    },
    dishes_dutch:{
        total:0,
        ditched:0,
        completed:0,
        already:0,
        percent:0
    },
    dishes_split:{
        total:0,
        splited:0,
        completed:0,
        already:0,
        percent:0
    },
    dishes_transport:{
        total:0,
        already:0,
        tranning:0,
        distributioning:0,
        distribution:0,
        percent:0,
    },
    warnings:{
        cook_warnning:0,
        duth_warnning:0,
        split_warnning:0,
        tran_warnning:0,
        distribution_warnning:0,
        total:0
    }
}

const mutations = {
    [types.queryAll] (state,value) {
        state.dishes_cooking = value.dishes_cooking;
        state.dishes_dutch = value.dishes_dutch;
        state.dishes_split = value.dishes_split;
        state.dishes_transport = value.dishes_transport;
        state.warnings = value.warnings;
    },
    [types.makefood] (state,value) {
        state.dishes_cooking = value;
    },
    [types.balefood] (state,value) {
        state.dishes_dutch = value;
    },
    [types.packfood] (state,value) {
        state.dishes_split = value;
    },
    [types.tranportfood] (state,value) {
        state.dishes_transport = value;
    },
    [types.abnormal] (state,value) {
        state.warnings = value;
    }
}


// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})