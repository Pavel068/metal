<template>
	<div class="charts">
		<Bar :chart-data="chartData" :chart-options="chartOptions"/>
	</div>
</template>

<script>
import Bar from "@/components/Charts/Bar";

export default {
	name: "Graph",
	components: {Bar},
	data() {
		return {
			chartData: {
				labels: ['Май', 'Июнь'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [40, 20]
					}
				]
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false
			}
		}
	}
}
</script>

<style scoped>

</style>