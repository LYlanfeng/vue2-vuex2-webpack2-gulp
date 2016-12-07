<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<template>
    <div>
        <div>
            <h3>width is {{ count }}</h3>
        </div>
        <div>
            <!--<button @click='test'>Increment +1</button>-->
        </div>
    </div>
</template>
<script>
    import { incrementCounter } from '../store/actions';
    import { getWidth } from '../store/getters';
    export default{
        data () {
            return {
            }
        },
        vuex: {
            getters:{
                count: function (state) {
                    return state.count
                }
            },
            actions: {
                test: incrementCounter
            }
        }
    }
</script>