<template>
	<div class="container" id="app">
		<div class="row mt-2">
			<div class="col-md-12">
				<div class="nav">
					<img src="@/assets/logo.png" alt="">
					<router-link :to="{name: 'Index'}">Главная</router-link>
					<router-link :to="{name: 'Graph'}">Графики</router-link>
					<router-link :to="{name: 'Recommendation'}">Рекомендации</router-link>
				</div>
			</div>
		</div>
		<div class="row mt-5">
			<div class="col-md-12">
				<router-view :key="$route.fullPath"></router-view>
			</div>
		</div>
	</div>
</template>

<style>
.nav img {
	width: 50px;
}

.nav a {
	margin-left: 15px;
}

.router-link-exact-active {
	font-weight: bold;
	text-decoration: underline;
}
</style>
