import Vue from 'vue'
import VueRouter from 'vue-router';

import Index from "@/views/Index";
import Graph from "@/views/Graph";
import Recommendation from "@/views/Recommendation";
import Calculations from "@/views/Calculations";

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index
	},
	{
		path: '/graph',
		name: 'Graph',
		component: Graph
	},
	{
		path: '/calculations',
		name: 'Calculations',
		component: Calculations
	},
	{
		path: '/recommendation',
		name: 'Recommendation',
		component: Recommendation
	},
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router
