<template>
    <div class="oh-dialog-wrapper">
        <transition name="fadeIn">
            <div class="oh-dialog" v-if="visible">
                <div class="dialog-header">
                    <slot class="header-extra" name="extra"></slot>
                    <oh-button circle icon="close" @click="close"></oh-button>
                </div>
                <slot></slot>
                <slot class="dialog-footer" name="footer"></slot>
            </div>
        </transition>
        <div class="mask" @click="close" v-if="visible"></div>
    </div>
</template>

<script>
    export default {
        name: "oh-dialog",
        props: {
            visible: {
                type: Boolean,
                default: true
            }
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
        .oh-dialog {
            position: absolute;
            left: 30%;
            top: 25vh;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, .1);
            box-sizing: border-box;
            width: 40%;
            padding: 16px 16px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);
            z-index: 1000;

            .dialog-header {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 16px;
            }

            .dialog-footer {
                display: flex;
                justify-content: flex-end;
            }
        }
        .mask{
            position: absolute;
            width: 100%;
            height: 100vh;
            left: 0;
            top:0;
            background: rgba(0,0,0,.5);
            z-index: 999;
        }
    }


</style>
