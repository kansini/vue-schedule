<template>
    <div class="oh-switch">
        <div class="switch-label" :class="checked?'switch-on':''" v-if="label">{{label}}</div>
        <div class="switch-item">
            <input :id="id" type="checkbox" class="switch-input"
                   :true-value="activeValue"
                   :false-value="inactiveValue"
                   :disabled="disabled"
                   @change="handleToChange($event)"
                   :class="{disabled:disabled}"
            />
            <label :for="id"></label>
        </div>

    </div>
</template>

<script>
    export default {
        name: "oh-switch",
        props: {
            id: {
                type: String,
                default: 'switch'
            },
            label: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            activeValue: {
                type: [Boolean, String, Number],
                default: true
            },
            inactiveValue: {
                type: [Boolean, String, Number],
                default: false
            }
        },
        model: {
            prop: ['val'],
            event: 'change'
        },
        data() {
            return {
                checked: false
            }
        },
        methods: {
            handleToChange(e) {
                const val = this.checked ? this.inactiveValue : this.activeValue;
                this.$emit('input', val);
                this.$emit('change', val);
                this.$nextTick(() => {
                    this.checked = !this.checked;
                });
                console.log(val)
            },
            // toggleSwitch(e) {
            //     this.$emit('change', !this.checked)
            //     this.checked = !this.checked
            //     console.log(e.target.value)
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .oh-switch {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .switch-label {
            color: #999;
            font-size: 14px;
            margin-right: 16px;
            transition: all ease .4s;
        }

        .switch-on {
            @include listInfo_icon_theme($header-color-theme1);
        }

        .switch-item {
            height: 16px;
            width: 32px;

            .switch-input {
                display: none;
            }

            label {
                position: relative;
                display: block;
                height: 100%;
                width: 100%;
                cursor: pointer;
                border-radius: 16px;
                transition: all ease .6s;

                &::before {
                    position: absolute;
                    content: '';
                    left: 0;
                    top: 0;
                    border-radius: 16px;
                    height: 100%;
                    width: 16px;
                    background: #fff;
                    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
                    transition: all 0.2s ease;
                    z-index: 999;
                }

                &::after {
                    position: absolute;
                    content: '';
                    //display: block;
                    border-radius: 16px;
                    //height: 8px;
                    //width: 100%;
                    //left: 0;
                    //top:4px;
                    height: 100%;
                    width: 100%;
                    left: 0;
                    top:0;
                    background-color: #e8e8e8;
                    transition: all 0.4s ease;
                }


            }


            /*在label标签内容之前添加如下样式，形成一个未选中状态*/


            /*选中后，未选中样式消失*/
            #switch:checked ~ label::before {
                transform: translateX(16px);
                //@include background_theme($background-theme1);
                box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, 0.08);
            }

            /*选中后label的背景色改变*/
            #switch:checked ~ label::after {
                @include background_theme($background-theme1);
            }
        }


    }


</style>
