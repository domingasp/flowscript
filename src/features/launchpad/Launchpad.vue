<script setup lang="ts">
import { open, save } from '@tauri-apps/plugin-dialog';
import { create } from '@tauri-apps/plugin-fs';
import { platform } from '@tauri-apps/plugin-os';
import { FilePlusCorner, FolderOpen } from 'lucide-vue-next';
// import mime from 'mime-types';
import mime from 'mime';

import Button from '../../components/Button.vue';
import { useFileStore } from '../../stores/file.store';

const DEFAULT_FILE_NAME = "Untitled Script.md";
const SUPPORTED_FILE_FILTERS = [{ extensions: ['md', 'markdown'], name: "Markdown content" }];

const fileStore = useFileStore();

const onOpen = () =>
	open({
		directory: false,
		// Known bug: iOS file dialog does not support filters
		// https://github.com/tauri-apps/plugins-workspace/issues/3030
		filters: platform() === "ios" ? undefined : SUPPORTED_FILE_FILTERS,
		multiple: false,
	}).then((path) => {
		if (!path) return;
		if (mime.getType(path) !== 'text/markdown') return;
		fileStore.setCurrentFile(path)
	})


const onNew = () => save({
	defaultPath: DEFAULT_FILE_NAME,
	filters: SUPPORTED_FILE_FILTERS,
}).then(async (path) => {
	if (!path) return;
	// Native file dialog handles check to overwrite existing files
	try {
		(await create(path)).close();
		fileStore.setCurrentFile(path);
	} catch (e) {
		console.error("Error creating new file:", e);
	}
});
</script>

<template>
	<div>
		<div class="
    relative flex flex-col items-center justify-center gap-md p-md pt-53
  ">
			<div>Current path: {{ fileStore.currentFile?.path }}</div>
			<div>Current name: {{ fileStore.currentFile?.name }}</div>

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
