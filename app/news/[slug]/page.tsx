import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";
type Params = Promise<{
	slug: string;
}>;

type SearchParams = Promise<{
	dk?: string;
}>;

type Props = {
	params: Params;
	searchParams: SearchParams;
};

export async function generateMetadata({
	params,
	searchParams,
}: Props): Promise<Metadata> {
	const resolvedParams = await params; // 非同期でparamsを取得
	const resolvedSearchParams = await searchParams; // 非同期でsearchParamsを取得

	const data = await getNewsDetail(resolvedParams.slug, {
		draftKey: resolvedSearchParams.dk,
	});

	return {
		title: data.title,
		description: data.description,
		openGraph: {
			title: data.title,
			description: data.description,
			url: `https://example.com/news/${resolvedParams.slug}`,
			images: [data?.thumbnail?.url ?? ""],
		},
	};
}

export default async function Page(props: Props) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const data = await getNewsDetail(params.slug, {
		draftKey: searchParams.dk,
	}).catch(notFound);

	return (
		<>
			<Article data={data} />
			<div className={styles.footer}>
				<ButtonLink href="/news">ニュース一覧へ</ButtonLink>
			</div>
		</>
	);
}
