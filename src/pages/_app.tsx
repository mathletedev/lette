import { AppProps } from "next/app";
import { FC } from "react";
import "../globals.css";

const _App: FC<AppProps> = ({ Component, pageProps }) => (
	<Component {...pageProps} />
);

export default _App;
