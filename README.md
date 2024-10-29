# NASA Asteroid Explorer

## Overview
NASA Asteroid Explorer is a mobile application that allows users to search for asteroids using their unique IDs and discover interesting facts about them. Users can also explore random asteroids with just a click of a button.

## Getting Started

### Prerequisites
1. **API Key**: Sign up at [NASA API](https://api.nasa.gov/) to get your personal API key.
2. **React Native Environment**: Ensure you have a React Native development environment set up.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
## Usage

1. **Open the application.**

2. **You will see a form with an input field and two buttons:**
   - **Input Field**: This field will have “Search Here” as the placeholder text.
   - **Buttons**:
     - **Submit Button**: This button is disabled until the input field is filled with an Asteroid ID.
     - **Random Asteroid Button**: Allows you to fetch a random asteroid.

3. **Searching for an Asteroid**:
   - Enter a valid Asteroid ID in the input field.
   - Press the **Submit Button**.
   - The application will make a request to:

     ```ruby
     https://api.nasa.gov/neo/rest/v1/neo/{{ENTER_ASTEROID_ID_HERE}}?api_key={{YOUR_API_KEY}}
     ```

   - You will be redirected to a new screen displaying the following information:
     - **Name**
     - **NASA JPL URL**
     - **Is Potentially Hazardous Asteroid** (Boolean)

4. **Fetching a Random Asteroid**:
   - Click the **Random Asteroid Button**.
   - The application will make a request to:

     ```bash
     https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY
     ```

   - A random asteroid ID will be selected, and another request will be made to:

     ```ruby
     https://api.nasa.gov/neo/rest/v1/neo/{{ENTER_ASTEROID_ID_HERE}}?api_key={{YOUR_API_KEY}}
     ```

   - You will be taken to a screen displaying the same information as above.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- NASA for providing the Asteroid data API.
- React Native community for their support and resources.



## Output : 

Using Search - 
![Screenshot 2024-10-29 160943](https://github.com/user-attachments/assets/6b30f989-aa72-49db-96ef-3fe309e2b2b5)

![Screenshot 2024-10-29 160959](https://github.com/user-attachments/assets/d8f66b75-ae6d-44a5-bc9b-6f522ed5d481)


Generated Randomly -

![Screenshot 2024-10-29 160055](https://github.com/user-attachments/assets/df77c331-969b-432c-8f64-c387a800897a)

