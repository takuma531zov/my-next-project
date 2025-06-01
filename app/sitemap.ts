import type { MetadataRoute } from "next";

const buildURL = (path?: string) =>
	`https://my-next-project-topaz.vercel.app/${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();
	return [
		{
			url: buildURL(),
			lastModified: now,
		},
		{
			url: buildURL("/members"),
			lastModified: now,
		},
		{
			url: buildURL("/contact"),
			lastModified: now,
		},
		{
			url: buildURL("/news"),
			lastModified: now,
		},
	];
}
