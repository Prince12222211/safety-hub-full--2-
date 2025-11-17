import { useEffect, useState } from "react";
import { getAlerts } from "../services/alertService";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    const data = await getAlerts();
    setAlerts(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Community Alerts</h1>

      {alerts.map((a) => (
        <div key={a._id} className="border p-4 my-3 rounded">
          <h2 className="font-semibold">{a.title}</h2>
          <p>{a.message}</p>
        </div>
      ))}
    </div>
  );
}
