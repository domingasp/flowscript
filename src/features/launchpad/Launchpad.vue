<script setup lang="ts">
import { open, save } from '@tauri-apps/plugin-dialog';
import { FilePlusCorner, FolderOpen } from 'lucide-vue-next';

import Button from '../../components/Button.vue';

const DEFAULT_FILE_NAME = "Untitled Script.md";
const SUPPORTED_FILE_FILTERS = [{ extensions: ['md', 'markdown'], name: "Markdown Files" }];

const onOpen = () =>
	open({
		filters: SUPPORTED_FILE_FILTERS,
		multiple: false
	}).then((path) => {
		console.log(path);
	})


const onNew = () => save({
	defaultPath: DEFAULT_FILE_NAME,
	filters: SUPPORTED_FILE_FILTERS,
}).then((path) => {
	console.log(path);
});
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
				<Button @click="onNew">
					<FilePlusCorner />New Script
				</Button>
				<Button variant="ghost" @click="onOpen">
					<FolderOpen />Open
				</Button>
			</div>
		</div>
	</div>
</template>
