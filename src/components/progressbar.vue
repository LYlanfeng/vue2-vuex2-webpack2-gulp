<style rel="stylesheet/scss" lang="scss" scoped>
    .progressbar_div{
        border-style: solid;
        border-width: 1px;
        width: 100%;
        height: 100%;
        .bar{
            height: 100%;
        }
    }
    .animation{
        transition: width 1s;
        -moz-transition: width 1s;	/* Firefox 4 */
        -webkit-transition: width 1s;	/* Safari 和 Chrome */
        -o-transition: width 1s;
    }
</style>
<template>
    <div class="progressbar_div" :class="[bordercolor]">
        <div class="bar animation"  :class="[barcolor]" :style="{width: width + '%'}"></div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default{
        props:[
            "bordercolor",
            "barcolor",
            "width"
        ],
        data () {
            return {
            }
        }
    }
</script>