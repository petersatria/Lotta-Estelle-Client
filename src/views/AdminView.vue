<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'
import { toast } from '../helpers/helper'
export default {
  data() {
    return {
      size: '',
      stock: 0
    }
  },
  computed: {
    ...mapState(useProductStore, ['products', 'sizeProducts'])
  },
  methods: {
    ...mapActions(useProductStore, [
      'fetchProducts',
      'createSizeProduct',
      'deleteSizeProduct',
      'fetchSizeProducts',
      'fetchProductById'
    ]),
    addSizeProductHandler(id) {
      const data = { size: this.size, stock: +this.stock, ProductId: id }
      if (this.stock <= 0) {
        toast('error', 'Stock must be greater than 0')
      } else {
        this.createSizeProduct(data)
      }
    },
    selectHandler(e) {
      this.size = e.target.value
    },
    sizeHandler(e) {
      this.stock = e.target.value
    },
    deleteSizeProductHandler(id) {
      let data = this.sizeProducts.find((e) => e.size == this.size && e.ProductId == id)
      if (!data) {
        toast('error', 'Size not found')
      } else {
        this.deleteSizeProduct(data.id)
      }
    },
    editProductHandler(id) {
      this.fetchProductById(id)
      this.$router.push('/edit-product/' + id)
    }
  },
  created() {
    this.fetchProducts()
    this.fetchSizeProducts()
  }
}
</script>

<template>
  <section class="container mt-5">
    <RouterLink :to="'/add-product'">Add Product</RouterLink>
    <div class="table-responsive pt-4">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Title</th>
            <th>Price</th>
            <th>Image Url</th>
            <th>Category</th>
            <th>Size</th>
            <th>Actions</th>
            <th>Edit Product</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.imgUrl }}</td>
            <td>{{ product.categoryName }}</td>
            <td>
              <select class="form-select">
                <option value="" selected>Available Size</option>
                <option value="" v-for="(item, index) in product.SizeProducts" :key="index">
                  {{ item.size }} - {{ item.stock }}
                </option>
              </select>
            </td>
            <td class="">
              <form @submit.prevent="addSizeProductHandler(product.id)" class="d-flex">
                <select @change="selectHandler" class="form-select mx-2">
                  <option value="" selected disabled>-- Select Size --</option>
                  <option
                    v-for="(item, index) in ['XS', 'S', 'M', 'L', 'XL', 'XXL']"
                    :value="item"
                    :key="index"
                  >
                    {{ item }}
                  </option>
                </select>
                <input
                  type="number"
                  @change="sizeHandler"
                  class="form-control mx-2"
                  placeholder="Stock"
                  style="width: 90px"
                />
                <button type="submit" class="btn btn-success">Submit</button>
                <button
                  type="button"
                  @click="deleteSizeProductHandler(product.id)"
                  class="btn btn-danger mx-2"
                >
                  Delete
                </button>
              </form>
            </td>
            <td>
              <button @click="editProductHandler(product.id)" class="btn btn-secondary mx-2">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.form-select {
  width: 180px;
}

.form-control {
  width: 60px;
}

a {
  color: #333;
}
</style>
