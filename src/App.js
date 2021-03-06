import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {

// Setting up the initial states using
// react hook 'useState'
const [search, setSearch] = useState("");
const [crypto, setCrypto] = useState([]);

// Fetching crypto data from the API only
// once when the component is mounted
useEffect(() => {
	Axios.get(
`https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD`
	).then((res) => {
	setCrypto(res.data.coins);
	});
}, []);

return (
	<div className="App">
	<h1>CRYPTO CURRENCY DASHBOARD</h1>
	<h2>1$ = 77.46₹</h2>
	<input
		type="text"
		placeholder="Search..."
		onChange={(e) => {
		setSearch(e.target.value);
		}}
	/>
	<table>
		<thead>
		<tr>
			<td>Rank</td>
			<td>Name</td>
			<td>Symbol</td>
			<td>Market Cap</td>
			<td>Price($)</td>
			<td>Price(₹)</td>
			<td>Volume(24hrs)</td>
			<td>Price Change(1hr)</td>
                   	<td>Price Change(1d)</td>
                   	<td>Price Change(1w)</td>
              		<td></td>
		</tr>
		</thead>
		{/* Mapping all the cryptos */}
		<tbody>
		{/* Filtering to check for the searched crypto */}
		{crypto
			.filter((val) => {
			return val.name.toLowerCase().includes(search.toLowerCase());
			})
			.map((val, id) => {
			return (
				<>
				<tr id={id}>
					<td className="rank">{val.rank}</td>
					<td className="logo">
					<a href={val.websiteUrl}>
						<img src={val.icon} alt="logo" width="30px" />
					</a>
					<p>{val.name}</p>
					</td>
					<td className="symbol">{val.symbol}</td>
					<td>${val.marketCap.toFixed(2)}</td>
					<td>${val.price.toFixed(2)}</td>
					<td>₹{val.price.toFixed(2) * 77.46.toFixed(2)}</td>
					<td>{val.volume}</td>
 					<td>{val.priceChange1h}</td>
                                    	<td>{val.priceChange1d}</td>
                                   	<td>{val.priceChange1w}</td>
				</tr>
				</>
			);
			})}
		</tbody>
	</table>
	</div>
);
}

export default App;

