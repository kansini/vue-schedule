<template>
    <div id="home">
        <schedule/>
        <theme />
    </div>
</template>

<script>
    import schedule from '@/components/schedule'

    export default {
        name: 'home',
        components: {
            schedule
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
