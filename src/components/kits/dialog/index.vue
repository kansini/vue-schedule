<template>
    <div class="oh-dialog-wrapper">
        <transition :name="ani">
            <div class="oh-dialog" v-if="visible"
                 :style="[{width:width},{height:height},{left:`${left}px`},{top:`${top}px`}]">
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
                default: false
            },
            ani: {
                type: String,
                default: "fadeIn"
            },
            width: {
                type: String,
                default: "50%"
            },
            height: {
                type: String,
                default: "496"
            },
            left: {
                type: Number,
                default: 16
            },
            top: {
                type: Number,
                default: 16
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
            position: absolute;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, .1);
            box-sizing: border-box;
            background: rgba(255, 255, 255, .01);
            //background: rgba(255, 255, 255, .05);
            backdrop-filter: blur(12px);
            z-index: 999;
            //overflow: hidden;


            .dialog-header {
                padding: 8px 8px 8px 24px;
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                box-shadow: 0 2px 10px rgba(0, 0, 0, .04);
                //border-bottom: 1px solid #f1f1f1;
                // @include header_theme($header-color-theme1);

                .oh-button {
                    //   color: #fff;

                    &:hover {
                        //      background: rgba(255, 255, 255, .2);
                    }
                }

                .header-title {
                    height: 40px;
                    line-height: 40px;
                    width: 50%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 20px;
                    font-weight: 600;
                    @include listInfo_icon_theme($header-color-theme1);
                    //color: #333;
                }

                .header-options {
                    display: flex;
                    justify-content: flex-end;

                    .header-extra {
                        display: flex;
                        justify-content: flex-end;
                    }
                }
            }

            .dialog-content {
                padding: 16px 16px 0;
                box-sizing: border-box;
            }

            .dialog-footer {
                display: flex;
                justify-content: flex-end;
                padding: 16px 24px;
                box-sizing: border-box;
            }
        }

        .mask {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(255, 255, 255, .05);
            // backdrop-filter: blur(6px);
            transition: all ease .4s;
        }
    }


</style>
