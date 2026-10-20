<script lang="ts">
	import * as m from '#lib/paraglide/messages';
</script>

<main class="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-neutral-950 text-neutral-100 font-sans">
	<div class="max-w-xl space-y-4">
		<h1 class="text-4xl font-bold tracking-tight text-white">{m.app_title()}</h1>
		<p class="text-neutral-400 text-lg leading-relaxed">{m.app_description()}</p>
		<div class="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-400">
			<span class="rounded bg-neutral-900 border border-neutral-800 px-2.5 py-1">SvelteKit 5</span>
			<span class="rounded bg-neutral-900 border border-neutral-800 px-2.5 py-1">Tailwind CSS 4</span>
			<span class="rounded bg-neutral-900 border border-neutral-800 px-2.5 py-1">Cloudflare Workers</span>
			<span class="rounded bg-neutral-900 border border-neutral-800 px-2.5 py-1">D1 + Better Auth</span>
			<span class="rounded bg-neutral-900 border border-neutral-800 px-2.5 py-1">Effect</span>
			<span class="rounded bg-neutral-900 border border-neutral-800 px-2.5 py-1">Paraglide i18n</span>
		</div>
	</div>
</main>
