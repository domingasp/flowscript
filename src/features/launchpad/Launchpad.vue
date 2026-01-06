<script setup lang="ts">
import { FilePlusCorner, FolderOpen } from 'lucide-vue-next';

import Button from '../../components/Button.vue';

</script>

<template>
	<div>
		<div class="
    relative flex flex-col items-center justify-center gap-md p-md pt-53
  ">
			<img src="@/assets/flowscript.svg" class="
     absolute top-0 h-64 -rotate-5 opacity-30 grayscale
     not-dark:invert
   " />
			<p class="text-foreground-secondary">Keep your words
				flowing smoothly
			</p>

			<div class="flex gap-lg">
				<Button>
					<FilePlusCorner />New Script
				</Button>
				<Button variant="ghost">
					<FolderOpen />Open
				</Button>
			</div>
		</div>
	</div>
</template>
