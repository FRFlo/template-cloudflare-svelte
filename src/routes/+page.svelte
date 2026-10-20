<script lang="ts">
	import * as m from "#lib/paraglide/messages";
	import {
		Layers,
		Flame,
		Cloud,
		Database,
		ShieldCheck,
		Sparkles,
		Globe,
	} from "@lucide/svelte";
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-8 text-center font-sans text-neutral-100"
>
	<div class="max-w-xl space-y-4">
		<div class="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
			<Sparkles class="size-3.5 text-amber-400" />
			<span>Ready for production</span>
		</div>
		<h1 class="text-4xl font-bold tracking-tight text-white">{m.app_title()}</h1>
		<p class="text-lg leading-relaxed text-neutral-400">{m.app_description()}</p>
		<div class="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs font-mono text-neutral-300">
			<span class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-2.5 py-1">
				<Layers class="size-3.5 text-orange-400" />
				SvelteKit 5
			</span>
			<span class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-2.5 py-1">
				<Flame class="size-3.5 text-cyan-400" />
				Tailwind CSS 4
			</span>
			<span class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-2.5 py-1">
				<Cloud class="size-3.5 text-amber-500" />
				Cloudflare Workers
			</span>
			<span class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-2.5 py-1">
				<Database class="size-3.5 text-emerald-400" />
				D1 + Better Auth
			</span>
			<span class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-2.5 py-1">
				<ShieldCheck class="size-3.5 text-indigo-400" />
				Effect
			</span>
			<span class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900 px-2.5 py-1">
				<Globe class="size-3.5 text-sky-400" />
				Paraglide i18n
			</span>
		</div>
	</div>
</main>
