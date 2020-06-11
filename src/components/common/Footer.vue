<template>
	<div class="footer-wrap">
    <div class="logo">
      <!-- 社团logo图片  -->
     <img src="../../assets/JDZUlogo.png" alt="社团网logo"/>
    </div>
		<!--<div class="footer">
        <p class="word1">欢迎访问JDZU社团管理系统</p>
      &lt;!&ndash;<p class="introduce"></p>&ndash;&gt;
		</div>-->
	</div>
</template>

<script>
  export default {
  }
</script>

<style scoped="scoped">
  .footer-wrap {
		background-color:#22b3c8;
    position: fixed;
    position: relative;
    left: 0;
    right: 0;
    bottom:0;
    height: 70px;
	}
  .logo {
  }
	.footer-wrap .footer {
		width: 1024px;
		margin: 0 auto;
		height: 70px;
	}
  word1{
    left: 100px;
  }
  .introduce{
    margin: 10px;
  }
	.footer-wrap .footer p{
		line-height: 16px;
	}

	@media screen and (max-width: 600px){
	  .footer-wrap {
	  	padding: 2px 15px;
	  }
	}

</style>
