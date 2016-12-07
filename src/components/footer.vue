<style rel="stylesheet/scss" lang="scss" scoped>
    .footer {
        position: relative;
        width: 100%;
        height: 154px;
        padding: 18px;
        background: #FC6012;
        color: #FFFFFF;
        font-size: 42px;
        line-height: 102px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        & > div {
            text-align: center;
            img {
                display: block;
            }
        }
        .bgcolor {
            background: #FFFFFF;
        }
        .left {
            flex: 6;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-right: 48px;
            padding-left: 20px;
            align-items: center;
            background: #FFFFFF;
            color: #353535;
        }
        .right {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            padding: 0 20px;
        }
        .font-color{
            color: #FF8F1F;
            font-size: 43px;
        }
    }
</style>
<template>
    <div class="footer">
        <div class="left">
            <div><img src="../images/error.png"/></div>
            <div>制作</div>
            <div class="font-color">{{warnings.cook_warnning}}</div>
            <div>分装</div>
            <div class="font-color">{{warnings.duth_warnning}}</div>
            <div>装箱</div>
            <div class="font-color">{{warnings.split_warnning}}</div>
            <div>运输</div>
            <div class="font-color">{{warnings.tran_warnning}}</div>
            <div>配送</div>
            <div class="font-color">{{warnings.distribution_warnning}}</div>
            <div><img src="../images/cd.png"/></div>
            <div class="font-color">{{warnings.total}}</div>
        </div>
        <div class="right">
            <div></div>
            <div>{{time}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            "warnings"
        ],
        data () {
            return {
                time:"00:00:00",
                si:null
            }
        },
        mounted(){
            var that = this;
            this.si = setInterval(function () {
                var temp = new Date();
                var desc = (temp.getHours() <10 ? "0"+temp.getHours():temp.getHours())+":"+(temp.getMinutes() <10 ? "0"+temp.getMinutes():temp.getMinutes())+":"+(temp.getSeconds() <10 ? "0"+temp.getSeconds():temp.getSeconds());
                that.time = desc;
            },1000);
        },
        destroyed(){
            clearInterval(this.si);
        }
    }
</script>