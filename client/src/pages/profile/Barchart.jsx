
import { useSelector } from 'react-redux';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);
const BarChart = () => {
	const labels = ['Easy', 'Medium', 'Hard'];
	const { easy, medium, hard } = useSelector((state) => state.progress);

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'My First dataset',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: [easy, medium, hard],
			},
		],
	};
	return (
		<div>
			<Bar data={data} />
		</div>
	);
};

export default BarChart;
