<style rel="stylesheet/scss" lang="scss" scoped>
    .progress_div{
        border-style: solid;
        border-width: 1px;
        width: 100%;
        height: 383px;
        padding: 24px 34px 34px 34px;
        .title{
            font-size: 44px;
            line-height: 44px;
            text-align: right;
            span{
                margin: 0 32px;
            }
        }
        .mid{
            position: relative;
            height: 179px;
            padding-bottom: 20px;
            padding-top: 33px;
            display: flex;
            flex-direction: row;
            .item{
                flex: 1;
                display: flex;
                flex-direction:column;
            }
            .flex{
                flex: 1;
                display: flex;
            }
            .center{
                justify-content: center;
                align-items: center;
            }
            .font1{
                font-size: 36px;
            }
            .font2{
                font-size: 43px;
            }
            .bottom{
                justify-content: flex-end;
                align-items: flex-end;
            }
            .bfb{
                text-align: right;
                font-size:86px;
                line-height: 86px;
                /*align-self:flex-end;*/
                color: #212121;
                font-weight: 900;
            }
        }
        .bar{
            height: 106px;
        }
    }
</style>
<template>
    <div class="progress_div" :class="[options.border]">
        <div class="title">
            共<span :class="[options.textcolor]">{{prodata.total}}</span>{{options.title}}
        </div>
        <div class=" mid">
            <div class="item font1">
                <div class="flex center">{{options.desc[0]}}</div>
                <div class="flex center">{{options.desc[1]}}</div>
            </div>
            <div class="item font2">
                <div class="flex center" :class="[options.textcolor]">{{options.type == 1 ? prodata.completed : prodata.already }}</div>
                <div class="flex center" :class="[options.textcolor]">{{options.type == 1 ? prodata.completed : prodata.distributioning }}</div>
            </div>
            <div class="item font1" >
                <div class="flex center" v-show="options.type == 2">{{options.desc[2]}}</div>
                <div class="flex center" v-show="options.type == 2">{{options.desc[3]}}</div>
            </div>
            <div class="item font2">
                <div class="flex center" :class="[options.textcolor]"  v-show="options.type == 2">{{prodata.tranning}}</div>
                <div class="flex center" :class="[options.textcolor]"  v-show="options.type == 2">{{prodata.distribution}}</div>
            </div>
            <div class="item bfb bottom">
                {{prodata.percent}}%
            </div>
        </div>
        <div class="bar">
            <Progressbar :width="prodata.percent" :barcolor="options.barcolor" :bordercolor="options.border"></Progressbar>
        </div>
    </div>
</template>
<script>
    import Progressbar from './progressbar.vue';
    export default{
        props:[
            "options",
            "prodata"
        ],
        data () {
            return {

            }
        }
        ,
        components: {
            Progressbar
        }
    }
</script>