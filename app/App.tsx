const NASA_API_KEY = 'keeeKbMcOcUuf6Yq1eZifLIOPYNYZT9Ch1jlQlxc'; 

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
    backgroundColor: '#FFEB3B', // Bright yellow for a cheerful vibe
  },
  title: {
    fontSize: 28, // Slightly larger font size
    fontWeight: 'bold',
    color: '#D5006D', // A lively pink
    textAlign: 'center',
    marginBottom: 25,
    textTransform: 'uppercase', // Uppercase for emphasis
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderColor: '#D32F2F', // Red border for better visibility
    borderWidth: 1,
    borderRadius: 10, // More rounded corners
  },
  button: {
    paddingVertical: 10, // Increased padding
    borderRadius: 25, // More rounded for a modern look
    backgroundColor: '#00796B', // A refreshing teal
  },
  buttonLabel: {
    fontSize: 18, // Larger button text
    color: '#ffffff', // White text for contrast
  },
  loader: {
    marginTop: 20,
    color: '#00796B', // Match loader color with the button
  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold', // Bold for emphasis
  },
  card: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 15, // Increased padding
    borderRadius: 12, // Slightly more rounded
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // Elevation for Android
  },
  cardText: {
    fontSize: 18, // Slightly larger text
    marginVertical: 8,
    color: '#004D40', // Keeping the original text color
  },
});

export default App;
