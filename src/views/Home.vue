<template>
    <div id="home">
        <schedule/>
        <theme />
    </div>
</template>

<script>
    import schedule from '@/components/schedule'
    import theme from '@/components/theme'

    export default {
        name: 'home',
        components: {
            schedule,
            theme
        }
    }
</script>

<style lang="scss" scoped>
    #home {
        width: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
