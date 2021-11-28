import { FC, Fragment, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const _Index: FC = () => {
	const [number, setNumber] = useState(6);
	const [saturation, setSaturation] = useState(100);
	const [value, setValue] = useState(100);

	const [selected, setSelected] = useState<number | undefined>();

	const [colors, setColors] = useState<string[]>([]);
	const [hex, setHex] = useState("");

	const hsvToHex = (h: number, s: number, v: number) => {
		let r = 0;
		let g = 0;
		let b = 0;

		let i = Math.floor(h * 6);
		let f = h * 6 - i;
		let p = v * (1 - s);
		let q = v * (1 - f * s);
		let t = v * (1 - (1 - f) * s);

		switch (i % 6) {
			case 0:
				(r = v), (g = t), (b = p);
				break;
			case 1:
				(r = q), (g = v), (b = p);
				break;
			case 2:
				(r = p), (g = v), (b = t);
				break;
			case 3:
				(r = p), (g = q), (b = v);
				break;
			case 4:
				(r = t), (g = p), (b = v);
				break;
			case 5:
				(r = v), (g = p), (b = q);
				break;
		}

		return `#${[r, g, b]
			.map((val) => {
				let hex = Math.round(val * 255).toString(16);
				return hex.length === 1 ? `0${hex}` : hex;
			})
			.join("")}`;
	};

	const parsedNumber = Math.floor((number * 35) / 100) + 1;

	useEffect(() => {
		let colors = [];

		for (let i = 0; i < parsedNumber; i++)
			colors.push(
				hsvToHex(
					((360 / parsedNumber) * i) / 360,
					saturation / 100,
					value / 100
				)
			);

		colors.reverse();
		setColors(colors);
	}, [number, saturation, value]);

	return (
		<Fragment>
			<PieChart
				className="wheel"
				data={colors.map((color) => ({ value: 100 / colors.length, color }))}
				onMouseOver={(_, i) => setHex(colors[i])}
				onMouseOut={() => {
					setSelected(undefined);
					setHex("");
				}}
				onClick={(_, i) => {
					navigator.clipboard.writeText(colors[i]);
					setSelected(i);
					setHex("copied!");
				}}
				animate
				segmentsStyle={(i) =>
					!selected || selected === i ? undefined : { stroke: "none" }
				}
			/>
			<div className="main">
				<div className="hex">{hex || "lette"}</div>
				<div className="divider"></div>
				<div className="description">click to copy hex value</div>
				<div className="settings">
					<div className="setting">
						<label>number: {parsedNumber}</label>
						<input
							type="range"
							value={number}
							onChange={(e) => setNumber(parseInt(e.target.value))}
						/>
					</div>
					<div className="setting">
						<label>saturation: {saturation}%</label>
						<input
							type="range"
							value={saturation}
							onChange={(e) => setSaturation(parseInt(e.target.value))}
						/>
					</div>
					<div className="setting">
						<label>value: {value}%</label>
						<input
							type="range"
							value={value}
							onChange={(e) => setValue(parseInt(e.target.value))}
						/>
					</div>
				</div>
				<button
					className="copy"
					onClick={() => {
						navigator.clipboard.writeText(colors.join("\n"));
						setHex("copied!");
					}}
					onMouseOut={() => setHex("")}
				>
					copy all
				</button>
			</div>
		</Fragment>
	);
};

export default _Index;
