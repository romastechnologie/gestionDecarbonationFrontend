<template>
	<div class="d-flex flex-column flex-root bg-sidbar">
		<!-- Video Background Container -->
		<div class="video-container">
			<video 
				autoplay 
				muted 
				loop 
				playsinline>
				<source src="/background.mp4" type="video/mp4">
			</video>
		</div>
		
		<!--begin::Authentication - Sign-in -->
		<div class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style="position: relative; z-index: 10;">
			<!--begin::Content-->
			<div class="d-flex flex-center flex-column align-content-center flex-column-fluid p-10 pb-0">
				<div class="w-600px rounded mx-auto">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, onMounted } from "vue";

	export default defineComponent({
		name: "AuthLayout",
		components: {},
		setup() {
			onMounted(() => {
				document.body.classList.remove("bg-body-secondary");
				document.body.classList.add("bg-sidbar");
			});

			return {};
		}		
	});
</script>

<style scoped>
.bg-sidbar {
	position: relative;
	min-height: 100vh;
	overflow: hidden;
}

.video-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	overflow: hidden;
}

.video-container::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
}

.video-container video {
	position: absolute;
	top: 50%;
	left: 50%;
	min-width: 100%;
	min-height: 100%;
	width: auto;
	height: auto;
	transform: translate(-50%, -50%);
	object-fit: cover;
}
</style>
