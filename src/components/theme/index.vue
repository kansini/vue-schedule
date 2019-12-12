<template>
    <transition name="scaleIn">
        <div class="themeSelector-modal" v-show="isShow">
            <div class="themeSelector-modal-header">
                您已经选择<span>{{currentThemeName}}</span>
            </div>
            <ul>
                <li v-for="(item,index) in themes" @click="changeTheme(index,item.themeCode)">
                    <el-tooltip :content="item.themeName" placement="top">
                        <div :class="{active:currentThemeIndex == index}"></div>
                    </el-tooltip>
                </li>
            </ul>
            <div class="btn-group-center">
                <el-button type="primary" icon="el-icon-check" @click="confirm(false)">确定</el-button>
                <el-button @click="initTheme('theme1')" icon="el-icon-refresh-right">重置</el-button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'ThemeSelector',
        data() {
            return {
                currentThemeIndex: 0,
                currentThemeName: "theme1",
                themes: [{
                    themeName: "极客科技蓝",
                    themeCode: "theme1"
                },
                    {
                        themeName: "炽热海棠红",
                        themeCode: "theme2"
                    },
                    {
                        themeName: "复古墨池金",
                        themeCode: "theme3"
                    },
                    {
                        themeName: "活力珊瑚橙",
                        themeCode: "theme4"
                    },
                    {
                        themeName: "风雅橄榄棕",
                        themeCode: "theme5"
                    },
                    {
                        themeName: "盎然韶华绿",
                        themeCode: "theme6"
                    },
                    {
                        themeName: "云谲星空紫",
                        themeCode: "theme7"
                    }
                ]
            }
        },
        computed: {
            isShow: {
                get() {
                    return this.$store.state.theme.showThemeSelector
                },
                set() {

                }
            }
        },
        created() {
            this.initTheme()
        },
        methods: {
            initTheme() {
                let themeIndex = parseInt(localStorage.getItem('themeIndex') || 0);
                let themeName = localStorage.getItem('themeName') || this.themes[themeIndex].themeName;
                this.currentThemeIndex = themeIndex;
                this.currentThemeName = themeName;
                window.document.documentElement.setAttribute('data-theme', this.themes[themeIndex].themeCode)
            },
            changeTheme(index, theme) {
                this.currentThemeIndex = index
                this.currentThemeName = this.themes[index].themeName
                window.document.documentElement.setAttribute('data-theme', theme)
            },
            confirm(showThemeSelector) {
                this.$store.commit('theme/SET_THEME_SELECTOR', {showThemeSelector})
				window.localStorage.setItem('themeIndex', this.currentThemeIndex);
				window.localStorage.setItem('themeName', this.currentThemeName);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .themeSelector-modal {
        position: absolute;
        background: rgba(255, 255, 255, .9);
        width: 400px;
        height: 280px;
        top: calc(50% - 200px);
        left: calc(50% - 200px);
        border-radius: 12px;
        padding: 24px;
        box-sizing: border-box;
        color: rgba(255, 255, 255, .6);
        box-shadow: 0 0 80px 0 rgba(0, 0, 0, .2);
        z-index: 999;

        .themeSelector-modal-header {
            text-align: center;
            font-size: 20px;
            color: #000;
            font-weight: bold;
            padding-bottom: 16px;
            border-bottom: 1px solid #e8e8e8;

            span {
                @include listInfo_icon_theme($header-color-theme1);
            }
        }

        ul {
            display: flex;
            justify-content: space-between;
            padding: 40px 0;
            width: 100%;

            .active {
                position: relative;
                color: #fff;
                border-radius: 12px;

                &::before {
                    position: absolute;
                    font-family: 'Material Icons';
                    content: 'check';
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    text-align: center;
                }
            }

            li {
                // width: 64px;
                // margin-right: 16px;

                div {
                    width: 40px;
                    height: 40px;
                    background: $header-color-theme1;
                    cursor: pointer;

                    border-radius: 40px;
                    opacity: .95;
                    transition: all ease .5s;

                    &:hover {
                        opacity: 1;
                    }
                }

                &:nth-last-child(1) {
                    margin-right: 0;
                }

                &:nth-child(2) div {
                    background-color: $header-color-theme2;
                }

                &:nth-child(3) div {
                    background-color: $header-color-theme3;
                }

                &:nth-child(4) div {
                    background-color: $header-color-theme4;
                }

                &:nth-child(5) div {
                    background-color: $header-color-theme5;
                }

                &:nth-child(6) div {
                    background-color: $header-color-theme6;
                }

                &:nth-child(7) div {
                    background-color: $header-color-theme7;
                }
            }
        }

    }

    .btn-group-center {
        position: absolute;
        left: 0;
        bottom: 16px;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }
</style>
