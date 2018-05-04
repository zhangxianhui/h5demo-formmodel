<template>
  <div id="app">
    <div class="header">
      <h1>
        <i>ShanGu </i>
        陕鼓集团
      </h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    font-family: "Arial","MicrosoftYaHei","黑体","宋体",sans-serif;
    background: rgb(246,248, 248);
  }
  body, h1, h2 {
    padding:0;
    margin: 0;
  }
  .header { 
    background: rgb(26,119,211);
    color: #fff;
  }
  .header h1{
    padding:8px 15px;
    font-size: 20px;
    font-weight: normal;
  }
  .body {
    padding:25px 50px;
  }
  button {
    background: rgb(26,119,211);
    border: none;
    color: #fff;
    padding: 5px 20px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
  }
  .titleBox .title { display: inline-block; }
  .titleBox button { float: right; }
  .tableBox { margin-top: 25px; }
  li{
    list-style:none;
  }
  a{
    text-decoration:none;
  }
  .pagination {
    position: relative;

  }
  .pagination li{
    display: inline-block;
    margin:0 5px;
  }
  .pagination li a{
    padding:5px 10px;
    display:inline-block;
    border:1px solid #ddd;
    background:#fff;

    color:#0E90D2;
  }
  .pagination li a:hover{
    background:#eee;
  }
  .pagination li.active a{
    background:#0E90D2;
    color:#fff;
  }
</style>
