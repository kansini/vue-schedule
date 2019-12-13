<template>
    <button :icon="icon" class="oh-button" :class="[{rotate:rotate},{flat:type == 'flat'},
    {primary:type == 'primary'},{circle:circle}]"
            @click="handleToClick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "oh-button",
        props: {
            icon: {
                type: String,
                default: ""
            },
            rotate: {
                type: Boolean,
                default: false
            },
            circle: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: ""
            }
        },

        methods: {
            handleToClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    button {
        border: none;
        outline: none;
    }

    .oh-button {
        position: relative;
        font-size: 14px;
        text-align: center;
        padding: 0 24px;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-radius: 4px;
        color: #333;
        transition: all linear .4s;
        cursor: pointer;

    }

    .oh-button + .oh-button {
        margin-left: 8px;
    }

    .circle {
        padding: 0;
        width: 40px;
        border-radius: 20px;

        &::before {
            content: attr(icon);
            font-family: 'Material Icons';
            font-size: 22px;
        }

        &:hover {
            transform: scale(1.1);
            @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
        }
    }

    .rotate {
        &:hover {
            transform: rotate(-360deg);
        }
    }

    .flat {
        @include listInfo_icon_theme($header-color-theme1);

        &:hover {
            @include dropMenu_theme($dropMenu-color-theme1, $dropMenu-bg-theme1);
        }

    }

    .primary {
        @include background_theme($background-theme1);
        color: #fff;

        &:hover {
             filter: brightness(1.1);
        }
    }

</style>
