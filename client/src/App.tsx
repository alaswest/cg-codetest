import styles from './App.module.scss';
import { CityForm } from './components/CityForm';
import { ActivityTable } from './components/ActivityTable';
import { useState } from 'react';
import type { Activity } from './types/Activity';
import { fetchActivityForecast } from './services/apiService';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleCitySubmit = async (cityName: string) => {
    const activitiesResponse = await fetchActivityForecast(cityName);
    setActivities(activitiesResponse);
  };

  return (
    <div className={styles.app}>
      <CityForm onSubmit={(cityName) => handleCitySubmit(cityName)} />
      {activities.length > 0 && <ActivityTable activities={activities} />}
    </div>
  );
}

export default App;
