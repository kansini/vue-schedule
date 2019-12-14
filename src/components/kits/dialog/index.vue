<template>
    <div class="oh-dialog-wrapper" v-show="visible">
        <div class="oh-dialog" :class="{open:visible}">
            <div class="dialog-header" >
                <slot class="header-extra" name="extra"></slot>
                <oh-button circle icon="close" @click="close"></oh-button>
            </div>
            <slot></slot>
            <slot class="dialog-footer" name="footer"></slot>
        </div>
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

<style lang="scss" scoped>
    .oh-dialog-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        margin: 0;
        z-index: 999;
        overflow: hidden;
        background: rgba(0, 0, 0, .1);

        .oh-dialog {
            position: relative;
            margin: 25vh auto 0;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, .1);
            box-sizing: border-box;
            width: 40%;
            padding: 16px 16px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);

            .dialog-header {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 16px;

                .oh-button {

                }
            }

            .dialog-footer {
                display: flex;
                justify-content: flex-end;
            }
        }

        .open {
            animation: open linear .2s;
        }

        @keyframes open {
            from {
                opacity: 0;
                transform: scale(0);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    }
</style>
