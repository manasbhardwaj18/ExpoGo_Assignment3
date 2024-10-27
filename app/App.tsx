const NASA_API_KEY = YOUR_API_KEY; 

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator, Text, Card, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';


type AsteroidData = {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
} | null;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00796B', 
    accent: '#FFB74D', 
    background: '#E0F7FA', 
    text: '#004D40', 
  },
};

const App: React.FC = () => {
  const [asteroidID, setAsteroidID] = useState<string>('');
  const [asteroidData, setAsteroidData] = useState<AsteroidData>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAsteroidData = async (id: string) => {
    setIsFetching(true);
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${NASA_API_KEY}`);
      if (!response.ok) throw new Error('Asteroid not found');
      const data = await response.json();
      setAsteroidData(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setAsteroidData(null);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchRandomAsteroid = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`);
      const data = await response.json();
      const randomAsteroid = data.near_earth_objects[Math.floor(Math.random() * data.near_earth_objects.length)];
      fetchAsteroidData(randomAsteroid.id);
    } catch (err) {
      setError('Failed to fetch random asteroid');
      setIsFetching(false);
    }
  };

  const handleSubmit = () => {
    if (asteroidID) fetchAsteroidData(asteroidID);
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.title}>Asteroid Explorer</Text>
        
        <TextInput
          label="Enter Asteroid ID"
          mode="outlined"
          value={asteroidID}
          onChangeText={setAsteroidID}
          style={styles.input}
          placeholderTextColor="#004D40"
        />
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!asteroidID}
          style={[styles.button, { marginBottom: 10 }]}
          labelStyle={styles.buttonLabel}
        >
          Search Asteroid
        </Button>
        
        <Button
          mode="outlined"
          onPress={fetchRandomAsteroid}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Random Asteroid
        </Button>
        
        {isFetching && <ActivityIndicator animating={true} size="large" color="#00796B" style={styles.loader} />}
        
        {error && <Text style={styles.error}>{error}</Text>}

        {asteroidData && (
          <Card style={styles.card}>
            <Card.Title title={asteroidData.name} titleStyle={{ color: theme.colors.primary }} />
            <Card.Content>
              <Text style={styles.cardText}>NASA JPL URL: {asteroidData.nasa_jpl_url}</Text>
              <Text style={styles.cardText}>
                Potentially Hazardous: {asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
              </Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  button: {
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#004D40',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#004D40',
  },
});

export default App;
