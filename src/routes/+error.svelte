<script lang="ts">
	import { page } from "$app/state";
	import * as m from "#lib/paraglide/messages";
</script>

<svelte:head>
	<title>{page.status} · {m.error_title()}</title>
</svelte:head>

<main
	class="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-8 text-center font-sans text-neutral-100"
>
	<div class="max-w-md space-y-4">
		<span class="font-mono text-6xl font-extrabold text-neutral-500">{page.status}</span>
		<h1 class="text-2xl font-bold tracking-tight text-white">{m.error_title()}</h1>
		<p class="text-sm leading-relaxed text-neutral-400">
			{page.error?.message || "Une erreur inattendue est survenue."}
		</p>
		<div class="pt-4">
			<a
				href="/"
				class="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
			>
				{m.error_back_home()}
			</a>
		</div>
	</div>
</main>
