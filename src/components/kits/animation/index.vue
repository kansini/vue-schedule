<template>
    <div :id="id" :style="{width:width + 'px',height:height + 'px',background:background}"></div>
</template>

<script>
    import * as lottie from 'lottie-web'

    export default {
        name:'oh-animation',
        props: {
            id: {
                type: String,
                default: "demo"
            },
            path: {
                type: String,
                default: "./ani/calendar.json"
            },
            height: {
                type: Number,
                default: 128
            },
            width: {
                type: Number,
                default: 128
            },
            renderer: {
                type: String,
                default: 'svg'
            },
            background: {
                type: String,
                default: 'transparent'
            }

        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let cv = document.getElementById(this.id)
                lottie.loadAnimation({
                    container: cv, // the dom element that will contain the animation
                    renderer: this.renderer,
                    loop: true,
                    autoplay: true,
                    path: this.path // the path to the animation json
                })
            },
        }
    }
</script>
<style scoped lang="scss">
    #demo {
        width: 240px;
        height: 240px;
        margin: 24px auto;
    }
</style>
