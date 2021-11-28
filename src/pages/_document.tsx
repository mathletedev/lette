import { DocumentProps, Head, Html, Main, NextScript } from "next/document";
import { FC } from "react";

const _Document: FC<DocumentProps> = () => {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default _Document;
