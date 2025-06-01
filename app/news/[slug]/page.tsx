import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
	params: {
		slug: string;
	};
	searchParams: {
		dk?: string;
	};
};

export async function generateMetadata({
	params,
	searchParams,
}: Props): Promise<Metadata> {
	const data = await getNewsDetail(params.slug, {
		draftKey: searchParams.dk,
	});

	return {
		title: data.title,
		description: data.description,
		openGraph: {
			title: data.title,
			description: data.description,
			url: `https://example.com/news/${params.slug}`,
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
