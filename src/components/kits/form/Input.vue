<template>
    <div class="oh-input">
        <div class="clear" v-if="clearable">
            <oh-button circle icon="close" v-if="showClear" @click="clear"></oh-button>
        </div>
        <div class="input-item" :class="[{inputFocus:currentFocus},{large:large}]" v-if="type != 'textarea'">
            <input :type="type" :placeholder="placeholder"
                   :value="val"
                   :readonly="readonly"
                   :disabled="disabled"
                   @focus="handleToFocus"
                   @blur="handleToBlur"
                   @input="handleToInput($event)"
                   @change="handleToChange($event)"
                   v-focus="autoFocus"
                   :class="{disabled:disabled}"
            >
        </div>
        <div class="textarea-item" :class="{inputFocus:currentFocus}" v-else>
              <textarea rows="10"
                        :placeholder="placeholder"
                        :value="val"
                        :readonly="readonly"
                        :disabled="disabled"
                        @focus="handleToFocus"
                        @blur="handleToBlur"
                        @input="handleToInput($event)"
                        @change="handleToChange($event)"
                        v-focus="autoFocus"
                        :class="{disabled:disabled}"
              >
            </textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "oh-input",
        props: {
            placeholder: {
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
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            autoFocus: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: false
            },
            val: {}
        },
        model: {
            prop: ['val'],
            event: 'input'
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
                this.showClearBtn()
            },
            handleToChange(e) {
                this.$emit('change', e.target.value)
                this.showClearBtn()
            },
            handleToBlur() {
                this.currentFocus = false
                this.showClear = false
                this.$emit('blur')
            },
            handleToFocus() {
                this.currentFocus = true
                this.$emit('focus')
                this.showClearBtn()
            },
            clear() {
                this.$emit('input', '');
                this.$emit('change', '');
                this.showClear = false
                // this.$emit('clear');
            },
            showClearBtn() {
                this.$nextTick(() => {
                    if (this.val) {
                        this.showClear = true
                    } else {
                        this.showClear = false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .oh-input {
        position: relative;
        width: 100%;
        //height: 40px;


        .clear {
            position: absolute;
            transform: scale(.7);
            right: -8px;
            top: 2px;
            opacity: .5;

            .oh-button {
                // color: #ddd;
            }

        }

        .input-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 40px;


            input {
                border: none;
                outline: none;
                background: transparent;
                width: 100%;
                height: 40px;
                font-size: 14px;
                color: #333;
                padding-right: 16px;
                box-sizing: border-box;
                border-bottom: 1px solid #f1f1f1;

                &::-webkit-input-placeholder {
                    color: #999;
                }
            }

            .disabled {
                color: #ccc;
                background: #fafafa;
                border-bottom: 1px solid #fafafa;
                cursor: not-allowed;
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
                transition: all ease .3s;
            }
        }

        .textarea-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 64px;


            textarea {
                border: none;
                outline: none;
                background: transparent;
                width: 100%;
                height: 64px;
                font-size: 14px;
                color: #333;
                padding: 8px 16px 0 0;
                box-sizing: border-box;
                border-bottom: 1px solid #f1f1f1;

                &::-webkit-input-placeholder {
                    color: #999;
                }
            }


            .disabled {
                color: #ccc;
                background: #fafafa;
                border-bottom: 1px solid #fafafa;
                cursor: not-allowed;
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
                transition: all ease .3s;
            }


        }


        .large {
            //height: 48px;

            &::after {
                // bottom: -8px;
            }

            input {
                font-size: 20px;
                font-weight: 400;
                // height: 48px;
                // line-height: 48px;
            }
        }

        .inputFocus {
            &::after {
                transform: scale(1);
            }
        }
    }

</style>
