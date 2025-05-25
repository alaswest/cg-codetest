import styles from './CityForm.module.scss';

interface CityFormProps {
  onSubmit: (city: string) => void;
}

export function CityForm({ onSubmit }: CityFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const city = formData.get('city');
    if (city && typeof city === 'string') {
      onSubmit(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.cityform}>
      <input type="text" placeholder="City" name="city" />
      <button type="submit">Search</button>
    </form>
  );
}
