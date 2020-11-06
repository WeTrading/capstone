<template>
  <div class = "goods">
    <ul>
      <li>
        <div class="bg"></div>
        <div class="info"><a href="https://google.com">DESCRIPTION</a></div>
      </li>
      <li>
        <div class="bg"></div>
        <div class="info"><a href="https://google.com">DESCRIPTION</a></div>
      </li>
      <li>
        <div class="bg"></div>
        <div class="info"><a href="https://google.com">DESCRIPTION</a></div>
      </li>
      <li>
        <div class="bg"></div>
        <div class="info"><a href="https://google.com">DESCRIPTION</a></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'product'
}
</script>

<style scoped>
.goods{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //margin: auto;
  //margin-left: 250px;
  //margin-top: 100px;
}
.goods li{
  list-style-type: none;
  float: left;
  width: 400px;
  height: 190px;
  background-color: wheat;

  margin-right: 13px;
  margin-bottom: 13px;
}
.goods .bg{
  float: left;
  width: 190px;
  height: 190px;
  border: 1px solid red;
}
.goods .info{

}
</style>
