<template>
    <div class="oh-form-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "form-item"
    }
</script>

<style lang="scss" scoped>
    .oh-form-item {
        width: 100%;
        display: flex;
        justify-content: space-around;
       &:not(:last-child){
           margin-bottom: 24px;
       }

        .oh-input:not(:last-child) {
            margin-right: 8px;
        }
    }
</style>
