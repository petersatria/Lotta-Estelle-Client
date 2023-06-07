<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'
export default {
  data() {
    return {
      productData: {
        name: '',
        title: '',
        description: '',
        imgUrl: '',
        price: 0,
        categoryName: ''
      }
    }
  },
  computed: {
    ...mapState(useProductStore, ['product'])
  },
  methods: {
    ...mapActions(useProductStore, ['createProduct', 'fetchProductById', 'updateProduct']),
    createProductHandler() {
      const formData = new FormData()
      formData.append('image', this.productData.imgUrl)
      formData.append('title', this.productData.title)
      formData.append('name', this.productData.name)
      formData.append('description', this.productData.description)
      formData.append('price', this.productData.price)
      formData.append('categoryName', this.productData.categoryName)
      if (this.$route.name === 'add-product') {
        this.createProduct(formData)
      } else if (this.$route.name === 'edit-product') {
        this.updateProduct(formData, this.product.id)
      }
    },
    imgHandler(e) {
      this.productData.imgUrl = e.target.files[0]
    }
  },
  created() {
    if (this.$route.name === 'edit-product') {
      this.fetchProductById(this.$route.params.id)
      this.productData.name = this.product.name
      this.productData.title = this.product.title
      this.productData.description = this.product.description
      this.productData.price = this.product.price
      this.productData.categoryName = this.product.categoryName
    }
  }
}
</script>

<template>
  <div class="container">
    <form class="mt-3" @submit.prevent="createProductHandler" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="name" class="form-label">Name<span class="text-danger fw-bold">*</span></label>
        <div class="input-group">
          <span for="name" class="input-group-text"></span>
          <input
            type="text"
            class="form-control"
            placeholder="Enter product name"
            name="name"
            required
            v-model="productData.name"
          />
          <span for="name" class="input-group-text"></span>
        </div>
      </div>
      <div class="mb-3">
        <label for="title" class="form-label"
          >Title<span class="text-danger fw-bold">*</span></label
        >
        <div class="input-group">
          <span for="title" class="input-group-text"></span>
          <input
            type="text"
            class="form-control"
            placeholder="Enter product title"
            name="title"
            required
            v-model="productData.title"
          />
          <span for="name" class="input-group-text"></span>
        </div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label"
          >Description<span class="text-danger fw-bold">*</span></label
        >
        <div class="input-group">
          <span class="input-group-text"></span>
          <textarea
            class="form-control"
            placeholder="Enter product description"
            style="min-height: 120px"
            required
            v-model="productData.description"
          ></textarea>
          <span class="input-group-text"></span>
        </div>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label"
          >Image Url<span class="text-danger fw-bold">*</span></label
        >
        <div class="input-group">
          <span for="image" class="input-group-text"></span>
          <input
            type="file"
            class="form-control"
            placeholder="Enter article image url"
            name="image"
            required
            @change="imgHandler"
          />
          <span for="image" class="input-group-text"></span>
        </div>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label"
          >Price<span class="text-danger fw-bold">*</span></label
        >
        <div class="input-group">
          <span for="price" class="input-group-text"></span>
          <input
            type="number"
            class="form-control"
            placeholder="Enter product price"
            name="price"
            required
            v-model="productData.price"
          />
          <span for="name" class="input-group-text"></span>
        </div>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label"
          >Category<span class="text-danger fw-bold">*</span></label
        >
        <div class="input-group">
          <span for="category" class="input-group-text"></span>
          <input
            type="text"
            class="form-control"
            placeholder="Enter product category"
            name="category"
            required
            v-model="productData.categoryName"
          />
          <span for="name" class="input-group-text"></span>
        </div>
      </div>
      <div class="col col-md-6 d-md-flex justify-content-center mx-auto">
        <RouterLink to="/admin" class="btn btn-warning btn-lg py-2 w-100 m-2"> Cancel </RouterLink>
        <button type="submit" class="btn btn-dark btn-lg py-2 w-100 m-2">Submit</button>
      </div>
    </form>
  </div>
</template>
