<script>
import { mapActions } from 'pinia'

export default {}
</script>

<template>
  <div class="card h-100">
    <div>
      <div>
        <img
          height="320"
          src="https://www.footlocker.id/media/catalog/product/0/1/01-ADIDAS-AYAV6ADI5-ADIHZ4935-White.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="card-body">
      <p class="">Relaxed Fit Printed T-shirt</p>
      <p class="">Rp&nbsp;459.900,00</p>
    </div>
  </div>
</template>

<style scoped>
img,
p,
h4 {
  cursor: pointer;
}

h4:hover {
  color: #f57a35;
  transition: 0.8s;
  font-weight: 700;
  font-size: 30px;
}

img {
  width: 100%;
  max-width: 100%;
  height: 320px;
  max-height: 100%;
  object-fit: cover;
  opacity: 1;
}
.img-wrapper {
  overflow: hidden;
  border-radius: 5px;
  margin: 0 auto;
}

.img-wrapper img {
  width: 100%;
  transition: 0.5s all ease-in-out;
}

.card:hover {
  transform: scale(1.1);
}
</style>
