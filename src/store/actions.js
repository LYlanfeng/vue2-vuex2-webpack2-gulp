/**
 * Created by lanfeng on 2016/12/6.
 */
import * as types from './mutation-types'
export const queryAll = function ({ commit },data) {
    commit(types.queryAll, data);
}
export const makefood = function ({ commit },data) {
    commit(types.makefood, data);
}
export const balefood = function ({ commit },data) {
    commit(types.balefood, data);
}
export const packfood = function ({ commit },data) {
    commit(types.packfood, data);
}
export const tranportfood = function ({ commit },data) {
    commit(types.tranportfood, data);
}
export const abnormal = function ({ commit },data) {
    commit(types.abnormal, data);
}