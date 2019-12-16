<template>
    <div class="oh-input">
        <div class="clear">
            <oh-button circle icon="close" v-show="showClear"></oh-button>
        </div>
        <div class="input-item" :class="[{inputFocus:currentFocus},{large:large}]">
            <div class="input-icon" v-if="icon" @click="clear('')">
                <i class="font-icons">{{icon}}</i>
            </div>
            <input :type="type" :placeholder="label"
                   :value="val"
                   :readonly="readonly"
                   @focus="handleToFocus"
                   @blur="handleToBlur"
                   @input="handleToInput($event)"
                   @change="handleToChange($event)"
                   v-focus="autoFocus"
            >
        </div>
    </div>
</template>

<script>
    export default {
        name: "oh-input",
        props: {
            label: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: "text"
            },
            large: {
                type: Boolean,
                default: false
            },
            disable: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            icon: {},
            autoFocus: {
                type: Boolean,
                default: false
            },
            val:{}
        },
        model:{
            prop:['val'],
            event:'input'
        },
        data() {
            return {
                currentFocus: false,
                fieldFilled: false,
                showClear: false
            }
        },
        directives: {
            focus: {
                inserted: (el, binding) => {
                    if (binding.value) {
                        setTimeout(() => {
                            el.focus()
                        }, 200)
                    } else {

                    }
                }
            }
        },
        methods: {
            handleToInput(e) {
                this.showClear = true
                this.$emit('input', e.target.value)
            },
            handleToChange(e) {
                this.$emit('change', e.target.value)
            },
            handleToBlur(e) {
                this.currentFocus = false
                this.showClear = false
                this.$emit('blur', e.target.value)
            },
            handleToFocus(e) {
                this.currentFocus = true
                this.$emit('focus', e.target.value)
            },
            clear(e) {
                this.$emit('clear', e.target.value)
            }
        }
    }
</script>

<style lang="scss">
    .oh-input {
        position: relative;
        width: 100%;
        height: 40px;


        .clear {
            position: absolute;
            transform: scale(.7);
            right: -8px;
            top: 3px;

            .oh-button {
                // color: #ddd;
            }

        }

        .input-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 40px;

            .input-icon {
                height: 40px;
                line-height: 34px;
                color: #666;
                font-size: 22px;
                margin-right: 16px;
            }

            input {
                border: none;
                outline: none;
                background: transparent;
                width: 100%;
                height: 40px;
                font-size: 14px;
                color: #333;
                border-bottom: 1px solid #f1f1f1;

                &::-webkit-input-placeholder {
                    color: #999;
                }
            }

            &::after {
                position: absolute;
                content: '';
                width: 100%;
                height: 2px;
                @include background_theme($background-theme1);
                left: 0;
                bottom: -1px;
                transform: scale(0);
                transform-origin: center;
                transition: all ease .4s;
            }


        }

        .large {
            height: 48px;

            &::after {
                bottom: -8px;
            }

            input {
                font-size: 20px;
                font-weight: 400;
                height: 48px;
                line-height: 48px;
            }
        }

        .inputFocus {
            &::after {
                transform: scale(1);
            }
        }
    }

</style>
