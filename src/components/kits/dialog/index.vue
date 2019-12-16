<template>
    <div class="oh-dialog-wrapper">
        <transition :name="ani">
            <div class="oh-dialog" v-if="visible" :style="{width:width}">
                <div class="dialog-header">
                    <div class="header-title">{{title}}</div>
                    <div class="header-options">
                        <slot class="header-extra" name="extra"></slot>
                        <oh-button circle icon="close" @click="close" style="margin-left: 8px"></oh-button>
                    </div>
                </div>
                <div class="dialog-content">
                    <slot></slot>
                </div>
                <slot class="dialog-footer" name="footer"></slot>
            </div>
        </transition>
        <div class="mask" @click="close" v-if="visible && closeOnClick"></div>
        <div class="mask" v-if="visible  && !closeOnClick"></div>
    </div>
</template>

<script>
    export default {
        name: "oh-dialog",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            closeOnClick: {
                type: Boolean,
                default: true
            },
            ani: {
                type: String,
                default: "fadeIn"
            },
            width: {
                type: String,
                default: "50%"
            },
            title: {
                type: String,
                default: ""
            },

        },
        methods: {
            close() {
                this.$emit('update:visible', false)
            }
        }
    }
</script>

<style lang="scss">
    .oh-dialog-wrapper {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1000;

        .oh-dialog {
            position: relative;
            margin: 25vh auto 0;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, .1);
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);
            z-index: 999;
            overflow: hidden;


            .dialog-header {
                padding: 8px 8px 8px 24px;
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                @include header_theme($header-color-theme1);
                .oh-button{
                    color: #fff;
                    &:hover{
                        background: rgba(255,255,255,.2);
                    }
                }
                .header-title{
                    height: 40px;
                    line-height: 40px;
                    width: 50%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 20px;
                    font-weight: 600;
                    color: #fff;
                }
                .header-options{
                    display: flex;
                    justify-content: flex-end;
                }
            }
            .dialog-content{
                padding: 8px 24px 0 24px;
                box-sizing: border-box;
            }
            .dialog-footer {
                display: flex;
                justify-content: flex-end;
                padding:16px 24px;
                box-sizing: border-box;
            }
        }

        .mask {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(255, 255, 255, .6);
        }
    }


</style>
