<script lang="ts">
	import type { Path } from "$app/types";
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import { locales, localizeHref } from "#lib/paraglide/runtime";
	import * as m from "#lib/paraglide/messages";
	import "./layout.css";
	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{m.app_title()}</title>
	<meta name="description" content={m.app_description()} />
	<link rel="canonical" href="{page.url.origin}{page.url.pathname}" />

	<!-- Open Graph / Embeds -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={m.app_title()} />
	<meta property="og:title" content={m.app_title()} />
	<meta property="og:description" content={m.app_description()} />
	<meta property="og:url" content="{page.url.origin}{page.url.pathname}" />
	<meta property="og:image" content="{page.url.origin}/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={m.app_title()} />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.app_title()} />
	<meta name="twitter:description" content={m.app_description()} />
	<meta name="twitter:image" content="{page.url.origin}/og-image.png" />

	<!-- Internationalization alternates (hreflang) -->
	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href="{page.url.origin}{resolve(localizeHref(page.url.pathname, { locale }) as Path)}"
		/>
	{/each}
</svelte:head>

{@render children()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>
