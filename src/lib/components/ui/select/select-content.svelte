<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "#lib/utils.js";
	import type { WithoutChildrenOrChild } from "#lib/utils.js";
	import SelectPortal from "./select-portal.svelte";
	import SelectScrollDownButton from "./select-scroll-down-button.svelte";
	import SelectScrollUpButton from "./select-scroll-up-button.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		portalProps,
		children,
		preventScroll = true,
		motion = true,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SelectPortal>>;
		motion?: boolean;
	} = $props();
</script>

<SelectPortal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		{preventScroll}
		data-slot="select-content"
		class={cn(
			"relative z-50 min-w-36 max-h-(--bits-select-content-available-height) origin-(--bits-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-panel border border-border bg-surface text-content shadow-floating ring-1 ring-border/70",
			motion &&
				"transition-[opacity,scale] duration-200 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-safe:data-[starting-style]:scale-95 motion-safe:data-[ending-style]:scale-95",
			className
		)}
		{...restProps}
	>
		<SelectScrollUpButton />
		<SelectPrimitive.Viewport
			class={cn(
				"h-(--bits-select-anchor-height) w-full min-w-(--bits-select-anchor-width) scroll-my-1"
			)}
		>
			{@render children?.()}
		</SelectPrimitive.Viewport>
		<SelectScrollDownButton />
	</SelectPrimitive.Content>
</SelectPortal>

<style>
	:global([data-slot="select-content"][data-starting-style] [data-slot="select-item"]),
	:global([data-slot="select-content"][data-ending-style] [data-slot="select-item"]) {
		opacity: 0;
		translate: 0 0.25rem;
	}

	:global([data-slot="select-content"][data-starting-style] [data-slot="select-item"]) {
		transition-delay: var(--select-item-enter-delay, 0ms);
	}

	:global([data-slot="select-content"][data-ending-style] [data-slot="select-item"]) {
		transition-delay: var(--select-item-exit-delay, 0ms);
	}

	@media (prefers-reduced-motion: reduce) {
		:global([data-slot="select-content"] [data-slot="select-item"]) {
			transition-property: opacity !important;
			transition-duration: 100ms !important;
		}

		:global([data-slot="select-content"][data-starting-style] [data-slot="select-item"]),
		:global([data-slot="select-content"][data-ending-style] [data-slot="select-item"]) {
			translate: none;
			transition-delay: 0ms !important;
		}
	}
</style>
