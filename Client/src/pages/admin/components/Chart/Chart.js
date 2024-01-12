import React , {useState}from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "./Data";

function BarChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: UserData.map((data) => data.userLost),
        backgroundColor: [
          "rgba(75,192,192,1)"
          
        ],
        borderColor: "transparent ",
        borderWidth: 2,
      },
    ],
  });


  return <Bar data={userData} />;
}

export default BarChart;