<script lang="ts">
	import { page } from "$app/state";
	import * as m from "#lib/paraglide/messages";
	import { AlertTriangle, ArrowLeft } from "@lucide/svelte";
</script>

<svelte:head>
	<title>{page.status} · {m.error_title()}</title>
</svelte:head>

<main
	class="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-8 text-center font-sans text-neutral-100"
>
	<div class="max-w-md space-y-4">
		<div class="inline-flex items-center justify-center rounded-full bg-red-500/10 p-3 text-red-400">
			<AlertTriangle class="size-8" />
		</div>
		<div>
			<span class="block font-mono text-5xl font-extrabold text-neutral-500">{page.status}</span>
			<h1 class="mt-2 text-2xl font-bold tracking-tight text-white">{m.error_title()}</h1>
		</div>
		<p class="text-sm leading-relaxed text-neutral-400">
			{page.error?.message || "Une erreur inattendue est survenue."}
		</p>
		<div class="pt-4">
			<a
				href="/"
				class="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
			>
				<ArrowLeft class="size-4" />
				{m.error_back_home()}
			</a>
		</div>
	</div>
</main>
