<template>
    <div id="home">
        <schedule/>
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
        //width: 82%;
        //float: right;
        //margin: 0 auto;
    }
</style>
