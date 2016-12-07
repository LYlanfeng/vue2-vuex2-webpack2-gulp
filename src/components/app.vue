<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<template>
    <div class="container">
        <div class="content">
            <div class="cs-table">
                <div class="cs-table-cell pro-div" @click="test2()">
                    <Myprogress :prodata="dishes_cooking" :options="options.op1" ></Myprogress>
                </div>
                <div class="cs-table-cell pro-jg">
                </div>
                <div class="cs-table-cell pro-div" >
                    <Myprogress :prodata="dishes_dutch" :options="options.op2" ></Myprogress>
                </div>
            </div>
            <div class="cs-table">
                <div class="cs-table-cell pro-div" >
                    <Myprogress :prodata="dishes_split" :options="options.op3" ></Myprogress>
                </div>
                <div class="cs-table-cell pro-jg">
                </div>
                <div class="cs-table-cell pro-div" >
                    <Myprogress :prodata="dishes_transport" :options="options.op4" ></Myprogress>
                </div>
            </div>
        </div>
        <Myfooter :warnings="warnings"></Myfooter>
    </div>
</template>
<script type="text/ecmascript-6">
    import Myfooter from './footer.vue';
    import Myprogress from './progress.vue';
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data () {
            return {
                ws:null,
                options:{
                    op1:{
                        type:1,
                        title:"菜品制作",
                        border:"border-blue",
                        textcolor:"text-blue",
                        barcolor:"bar-bg-blue",
                        desc:[
                            "已制作","待制作"
                        ]
                    },
                    op2:{
                        type:1,
                        title:"菜品分装",
                        border:"border-gree",
                        textcolor:"text-gree",
                        barcolor:"bar-bg-gree",
                        desc:[
                            "已分装","待分装"
                        ]
                    },
                    op3:{
                        type:1,
                        title:"装箱",
                        border:"border-orange",
                        textcolor:"text-orange",
                        barcolor:"bar-bg-orange",
                        desc:[
                            "已装箱","待装箱"
                        ]
                    },
                    op4:{
                        type:2,
                        title:"运输配送",
                        border:"border-red",
                        textcolor:"text-red",
                        barcolor:"bar-bg-red",
                        desc:[
                            "待运输","配送中","运输中","配送完成"
                        ]
                    },
                }
            }
        },
//        computed: mapGetters([
//            'dishes_cooking',
//            'dishes_dutch',
//            'dishes_split',
//            'dishes_transport',
//            'warnings'
//        ]),
        computed: {
            ...mapGetters([
                'dishes_cooking',
                'dishes_dutch',
                'dishes_split',
                'dishes_transport',
                'warnings'
            ])
        },
        methods: {
            test2(){
                var dishes_cooking ={
                    total: 100,
                    cooked: 20,
                    completed: 20,
                    already: 80,
                    percent: 20
                }
                this.$store.dispatch('makefood',dishes_cooking);
            }
        },
        mounted(){
            this.ws = new WebSocket("ws://localhost:8080");
            this.ws.onopen = function(){
                console.log("open");
            };
            this.ws.onmessage = function(evt)
            {
                console.log(evt.data)
            };
            this.ws.onclose = function(evt)
            {
                console.log("onclose");
            };
            this.ws.onerror = function(evt)
            {
                console.log("onerror");
            };
        },
        destroyed(){
            this.ws.close("1000", "");
        },
        components: {
            Myprogress,
            Myfooter
        }
    }
</script>