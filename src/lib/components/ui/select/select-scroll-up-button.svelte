<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { ChevronUpIcon } from "@lucide/svelte";
	import { cn, type WithoutChildrenOrChild } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps> = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	data-slot="select-scroll-up-button"
	class={cn("z-10 flex cursor-default items-center justify-center bg-surface py-1 text-content-muted [&_svg:not([class*='size-'])]:size-4", className)}
	{...restProps}
>
	<ChevronUpIcon />
</SelectPrimitive.ScrollUpButton>
