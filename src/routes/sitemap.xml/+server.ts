import type { RequestHandler } from "./$types";
import { locales, localizeHref } from "#lib/paraglide/runtime";

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;
	const pages = ["/"];

	const sitemapEntries = pages.flatMap((path) =>
		locales.map((locale) => {
			const localizedPath = localizeHref(path, { locale });
			const fullUrl = `${origin}${localizedPath}`;
			const alternates = locales
				.map(
					(altLocale) =>
						`\t\t<xhtml:link rel="alternate" hreflang="${altLocale}" href="${origin}${localizeHref(path, { locale: altLocale })}" />`,
				)
				.join("\n");

			return `\t<url>\n\t\t<loc>${fullUrl}</loc>\n${alternates}\n\t\t<changefreq>weekly</changefreq>\n\t\t<priority>1.0</priority>\n\t</url>`;
		}),
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.join(
		"\n",
	)}\n</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=86400",
		},
	});
};
