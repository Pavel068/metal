<template>
	<div class="charts">
		<div v-if="loading">Загрузка данных ...</div>
		<div class="graph_wrapper" v-else>
			<div v-if="chart_data && !chart_data.error">
				<Scatter :chart-data="chartData" :chart-options="chartOptions" :width="800" :height="450"/>
				<button class="btn btn-primary" @click="up"> Следующие {{items_show}} </button> &nbsp;
				<button class="btn btn-primary" :disabled="start_at === 0" @click="down"> Предыдущие {{items_show}} </button> &nbsp;
				<button class="btn btn-primary" @click="resizeUp"> Увеличить </button> &nbsp;
				<button class="btn btn-primary" :disabled="items_show === 100" @click="resizeDown"> Уменьшить </button> &nbsp;
			</div>
			<div v-else>
				<p class="lead" v-if="chart_data">{{chart_data.message}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Scatter from "@/components/Charts/Scatter";

export default {
	name: "Graph",
	components: {Scatter},
	data() {
		return {
			loading: false,
			start_at: 0,
			end_at: 100,
			items_show: 100,
			chart_data: null,
			chartData: {
				datasets: []
			},
			chartOptions: {
				responsive: false,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							}
						}]
				}
			}
		}
	},
	computed: {
		env() {
			return process.env;
		},
	},
	methods: {
		randomInt(min, max) {
			let rand = min - 0.5 + Math.random() * (max - min + 1);
			return Math.round(rand);
		},
		async loadData() {
			this.loading = true;
			this.chart_data = (await axios.get(this.env.VUE_APP_API + '/api/parse')).data.data;
			this.loading = false;
		},
		resizeUp() {
			this.end_at += this.items_show;
			this.items_show += 100;
			this.drawData();
		},
		resizeDown() {
			this.end_at -= this.items_show;
			this.items_show -= 100;
			this.drawData();
		},
		up() {
			this.start_at += this.items_show;
			this.end_at += this.items_show;
			this.drawData();
		},
		down() {
			this.start_at -= this.items_show;
			this.end_at -= this.items_show;
			this.drawData();
		},
		drawData() {
			if (this.chart_data && !this.chart_data.error) {
				let cd = {
					datasets: []
				};

				[
					'steel_temp',
					'steel_weight',
					'water_expense_1',
					'water_expense_2',
					'water_expense_3',
					'persistence_1',
					'persistence_2',
					'persistence_3',
					'persistence_4',
					'persistence_5',
					'persistence_6',
				].forEach(field => {
					let color = `rgba(${this.randomInt(0, 255)}, ${this.randomInt(0, 255)}, ${this.randomInt(0, 255)}, 0.8)`;
					cd.datasets.push({
						label: this.chart_data.fields[field],
						fill: false,
						showLine: true,
						backgroundColor: color,
						data: this.chart_data.data.slice(this.start_at, this.end_at).map((item, index) => {
							return {
								x: index,
								y: item[field]
							}
						})
					});
				});
				this.chartData = cd;
			}
		}
	},
	async mounted() {
		await this.loadData();
		this.drawData();
	}
}
</script>

<style scoped>
.graph_wrapper {
	height: 600px;
}
</style>