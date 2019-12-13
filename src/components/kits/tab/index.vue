<template>
    <div class="oh-tab">
        <div class="oh-tab-item" v-for="(item,index) in tabs"
             :class="[{current:index == active},{notCurrent:index != active}]"
             :key="index"
             @click="handleToTab(index)">
            {{item}}
        </div>
    </div>

</template>

<script>
    export default {
        name: "oh-tab",
        props:['active','tabs'],
        methods:{
            handleToTab(index){
                this.$emit('click',index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .oh-tab {
        display: flex;

        .oh-tab-item {
            width: 64px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            //color: #999;
            font-weight: 300;
            @include border_theme($border_theme1);
            border: 1px solid;
            box-sizing: border-box;
            transition: all ease .6s;
            cursor: pointer;

            &:not(:nth-child(1)) {
                margin-left: -1px;
            }

            &:nth-child(1) {
                border-radius: 6px 0 0 6px;
            }

            &:nth-last-child(1) {
                border-radius: 0 6px 6px 0;
            }
        }

        .notCurrent {
            @include listInfo_icon_theme($header-color-theme1);

            &:hover {
                @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
            }
        }

        .current {
            @include border_theme($border_theme1);
            @include background_theme($background-theme1);
            color: #fff;
            box-sizing: border-box;
        }
    }


</style>
