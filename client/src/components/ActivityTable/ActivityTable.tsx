import type { Activity } from '../../types/Activity';

interface ActivityTableProps {
  activities: Activity[];
}

export function ActivityTable({ activities }: ActivityTableProps) {
  // Get unique dates from all activities

  const dates = activities[0].activityForecast.map((forecast) => forecast.date);

  // Calculate cumulative score for each activity and sort
  const sortedActivities = [...activities].sort((a, b) => {
    const scoreA = a.activityForecast.reduce(
      (sum, forecast) => (forecast.isSuitable ? sum + forecast.score : sum),
      0
    );
    const scoreB = b.activityForecast.reduce(
      (sum, forecast) => (forecast.isSuitable ? sum + forecast.score : sum),
      0
    );
    return scoreB - scoreA; // Sort in descending order
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            {dates.map((date) => (
              <th key={date}>{new Date(date).toLocaleDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedActivities.map((activity) => (
            <tr key={activity.activityName}>
              <td>{activity.activityName}</td>
              {dates.map((date) => {
                const forecast = activity.activityForecast.find(
                  (f) => f.date === date
                );
                return (
                  <td key={date} style={{ textAlign: 'center' }}>
                    {forecast?.isSuitable ? '😊' : '😞'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={dates.length + 1} style={{ fontSize: '0.75rem' }}>
              <span>*Activities sorted by suitability</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
