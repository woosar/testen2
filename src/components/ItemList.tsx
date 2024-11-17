import React, { useEffect, useState } from 'react';
import { getItems } from '../services/databaseService.ts';

interface Item {
  _id: string;
  date: string;
  sum: number;
  sheet_name: string;
  comment: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const queryParams = {
          date: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        };
        const data = await getItems(queryParams);
        console.log('Fetched data:', data); // Log the fetched data
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems().then();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.sheet_name} - {item.sum} -{' '}
            {new Date(item.date).toLocaleDateString()} - {item.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
