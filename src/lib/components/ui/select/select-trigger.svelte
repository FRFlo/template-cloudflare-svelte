<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { ChevronDownIcon } from "@lucide/svelte";
	import { cn, type WithoutChild } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		chevronClass,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & {
		size?: "sm" | "default";
		chevronClass?: string;
	} = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	data-size={size}
	class={cn(
		"flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-control border border-border bg-surface/70 px-3 py-2 text-small font-semibold text-content shadow-none transition-[background-color,border-color,box-shadow] duration-150 ease hover:border-border-strong hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/50 data-open:border-border-strong data-open:bg-surface disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 *:data-[slot=select-value]:line-clamp-1 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronDownIcon class={cn("size-4 pointer-events-none text-content-muted", chevronClass)} />
</SelectPrimitive.Trigger>
