<template>
    <div class="product-list-wrapper">
        <el-row :gutter="20" class="product-row">
            <el-col :span="4" :xs="12" :sm="6" :md="6" v-for="(product, index) in productList" :key="product.id">
                <products />
                <el-divider style="border-style: none;" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
const productList = [
    { name: "Shirt", id: 1, price: 29.99 },
    { name: "Hat", id: 2, price: 14.50 },
    { name: "Jeans", id: 3, price: 59.95 },
    { name: "Shoes", id: 4, price: 74.88 },
    { name: "Jacket", id: 5, price: 99.00 },
    { name: "Jacket", id: 6, price: 99.00 },
    { name: "Jacket", id: 7, price: 99.00 },
    { name: "Jacket", id: 8, price: 99.00 },
    { name: "Jacket", id: 9, price: 99.00 },
    { name: "Jacket", id: 10, price: 99.00 },
    { name: "Jacket", id: 11, price: 99.00 },
]
</script>

<style lang="scss" scoped>
.product-row {
    margin-bottom: 20px;
}
.product-list-wrapper {
    padding: 3rem 8rem;
}
</style>