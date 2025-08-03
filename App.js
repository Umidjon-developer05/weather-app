"use client";

import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  TextInput,
  SectionList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CITIES_BY_CONTINENT = [
  {
    title: "🇺🇿 Uzbekistan",
    data: [
      {
        name: "Tashkent",
        country: "Uzbekistan",
        query: "tashkent",
        flag: "🇺🇿",
      },
      {
        name: "Samarkand",
        country: "Uzbekistan",
        query: "samarkand",
        flag: "🇺🇿",
      },
      { name: "Bukhara", country: "Uzbekistan", query: "bukhara", flag: "🇺🇿" },
      { name: "Nukus", country: "Uzbekistan", query: "nukus", flag: "🇺🇿" },
      { name: "Andijan", country: "Uzbekistan", query: "andijan", flag: "🇺🇿" },
      {
        name: "Namangan",
        country: "Uzbekistan",
        query: "namangan",
        flag: "🇺🇿",
      },
      { name: "Fergana", country: "Uzbekistan", query: "fergana", flag: "🇺🇿" },
    ],
  },
  {
    title: "🌏 Asia",
    data: [
      { name: "Tokyo", country: "Japan", query: "tokyo", flag: "🇯🇵" },
      { name: "Seoul", country: "South Korea", query: "seoul", flag: "🇰🇷" },
      { name: "Beijing", country: "China", query: "beijing", flag: "🇨🇳" },
      { name: "Shanghai", country: "China", query: "shanghai", flag: "🇨🇳" },
      { name: "Mumbai", country: "India", query: "mumbai", flag: "🇮🇳" },
      { name: "Delhi", country: "India", query: "delhi", flag: "🇮🇳" },
      { name: "Bangkok", country: "Thailand", query: "bangkok", flag: "🇹🇭" },
      {
        name: "Singapore",
        country: "Singapore",
        query: "singapore",
        flag: "🇸🇬",
      },
      {
        name: "Kuala Lumpur",
        country: "Malaysia",
        query: "kuala lumpur",
        flag: "🇲🇾",
      },
      { name: "Jakarta", country: "Indonesia", query: "jakarta", flag: "🇮🇩" },
      { name: "Manila", country: "Philippines", query: "manila", flag: "🇵🇭" },
      {
        name: "Ho Chi Minh City",
        country: "Vietnam",
        query: "ho chi minh city",
        flag: "🇻🇳",
      },
      { name: "Hanoi", country: "Vietnam", query: "hanoi", flag: "🇻🇳" },
      { name: "Dhaka", country: "Bangladesh", query: "dhaka", flag: "🇧🇩" },
      { name: "Karachi", country: "Pakistan", query: "karachi", flag: "🇵🇰" },
      {
        name: "Islamabad",
        country: "Pakistan",
        query: "islamabad",
        flag: "🇵🇰",
      },
      { name: "Colombo", country: "Sri Lanka", query: "colombo", flag: "🇱🇰" },
      { name: "Kathmandu", country: "Nepal", query: "kathmandu", flag: "🇳🇵" },
    ],
  },
  {
    title: "🌍 Europe",
    data: [
      {
        name: "London",
        country: "United Kingdom",
        query: "london",
        flag: "🇬🇧",
      },
      { name: "Paris", country: "France", query: "paris", flag: "🇫🇷" },
      { name: "Berlin", country: "Germany", query: "berlin", flag: "🇩🇪" },
      { name: "Rome", country: "Italy", query: "rome", flag: "🇮🇹" },
      { name: "Madrid", country: "Spain", query: "madrid", flag: "🇪🇸" },
      { name: "Barcelona", country: "Spain", query: "barcelona", flag: "🇪🇸" },
      {
        name: "Amsterdam",
        country: "Netherlands",
        query: "amsterdam",
        flag: "🇳🇱",
      },
      { name: "Vienna", country: "Austria", query: "vienna", flag: "🇦🇹" },
      { name: "Zurich", country: "Switzerland", query: "zurich", flag: "🇨🇭" },
      { name: "Stockholm", country: "Sweden", query: "stockholm", flag: "🇸🇪" },
      { name: "Oslo", country: "Norway", query: "oslo", flag: "🇳🇴" },
      {
        name: "Copenhagen",
        country: "Denmark",
        query: "copenhagen",
        flag: "🇩🇰",
      },
      { name: "Helsinki", country: "Finland", query: "helsinki", flag: "🇫🇮" },
      { name: "Warsaw", country: "Poland", query: "warsaw", flag: "🇵🇱" },
      {
        name: "Prague",
        country: "Czech Republic",
        query: "prague",
        flag: "🇨🇿",
      },
      { name: "Budapest", country: "Hungary", query: "budapest", flag: "🇭🇺" },
      { name: "Athens", country: "Greece", query: "athens", flag: "🇬🇷" },
      { name: "Lisbon", country: "Portugal", query: "lisbon", flag: "🇵🇹" },
      { name: "Brussels", country: "Belgium", query: "brussels", flag: "🇧🇪" },
      { name: "Dublin", country: "Ireland", query: "dublin", flag: "🇮🇪" },
      { name: "Moscow", country: "Russia", query: "moscow", flag: "🇷🇺" },
      {
        name: "St. Petersburg",
        country: "Russia",
        query: "st petersburg",
        flag: "🇷🇺",
      },
      { name: "Kiev", country: "Ukraine", query: "kiev", flag: "🇺🇦" },
      { name: "Istanbul", country: "Turkey", query: "istanbul", flag: "🇹🇷" },
      { name: "Ankara", country: "Turkey", query: "ankara", flag: "🇹🇷" },
    ],
  },
  {
    title: "🌎 North America",
    data: [
      { name: "New York", country: "USA", query: "new york", flag: "🇺🇸" },
      { name: "Los Angeles", country: "USA", query: "los angeles", flag: "🇺🇸" },
      { name: "Chicago", country: "USA", query: "chicago", flag: "🇺🇸" },
      { name: "Miami", country: "USA", query: "miami", flag: "🇺🇸" },
      {
        name: "San Francisco",
        country: "USA",
        query: "san francisco",
        flag: "🇺🇸",
      },
      { name: "Las Vegas", country: "USA", query: "las vegas", flag: "🇺🇸" },
      {
        name: "Washington DC",
        country: "USA",
        query: "washington dc",
        flag: "🇺🇸",
      },
      { name: "Toronto", country: "Canada", query: "toronto", flag: "🇨🇦" },
      { name: "Vancouver", country: "Canada", query: "vancouver", flag: "🇨🇦" },
      { name: "Montreal", country: "Canada", query: "montreal", flag: "🇨🇦" },
      {
        name: "Mexico City",
        country: "Mexico",
        query: "mexico city",
        flag: "🇲🇽",
      },
      { name: "Cancun", country: "Mexico", query: "cancun", flag: "🇲🇽" },
      { name: "Havana", country: "Cuba", query: "havana", flag: "🇨🇺" },
    ],
  },
  {
    title: "🌎 South America",
    data: [
      { name: "São Paulo", country: "Brazil", query: "sao paulo", flag: "🇧🇷" },
      {
        name: "Rio de Janeiro",
        country: "Brazil",
        query: "rio de janeiro",
        flag: "🇧🇷",
      },
      {
        name: "Buenos Aires",
        country: "Argentina",
        query: "buenos aires",
        flag: "🇦🇷",
      },
      { name: "Lima", country: "Peru", query: "lima", flag: "🇵🇪" },
      { name: "Bogotá", country: "Colombia", query: "bogota", flag: "🇨🇴" },
      { name: "Santiago", country: "Chile", query: "santiago", flag: "🇨🇱" },
      { name: "Caracas", country: "Venezuela", query: "caracas", flag: "🇻🇪" },
      { name: "Quito", country: "Ecuador", query: "quito", flag: "🇪🇨" },
      { name: "La Paz", country: "Bolivia", query: "la paz", flag: "🇧🇴" },
      {
        name: "Montevideo",
        country: "Uruguay",
        query: "montevideo",
        flag: "🇺🇾",
      },
    ],
  },
  {
    title: "🌍 Africa",
    data: [
      { name: "Cairo", country: "Egypt", query: "cairo", flag: "🇪🇬" },
      { name: "Lagos", country: "Nigeria", query: "lagos", flag: "🇳🇬" },
      {
        name: "Cape Town",
        country: "South Africa",
        query: "cape town",
        flag: "🇿🇦",
      },
      {
        name: "Johannesburg",
        country: "South Africa",
        query: "johannesburg",
        flag: "🇿🇦",
      },
      { name: "Nairobi", country: "Kenya", query: "nairobi", flag: "🇰🇪" },
      {
        name: "Casablanca",
        country: "Morocco",
        query: "casablanca",
        flag: "🇲🇦",
      },
      { name: "Tunis", country: "Tunisia", query: "tunis", flag: "🇹🇳" },
      { name: "Algiers", country: "Algeria", query: "algiers", flag: "🇩🇿" },
      {
        name: "Addis Ababa",
        country: "Ethiopia",
        query: "addis ababa",
        flag: "🇪🇹",
      },
      { name: "Accra", country: "Ghana", query: "accra", flag: "🇬🇭" },
    ],
  },
  {
    title: "🌏 Oceania",
    data: [
      { name: "Sydney", country: "Australia", query: "sydney", flag: "🇦🇺" },
      {
        name: "Melbourne",
        country: "Australia",
        query: "melbourne",
        flag: "🇦🇺",
      },
      { name: "Brisbane", country: "Australia", query: "brisbane", flag: "🇦🇺" },
      { name: "Perth", country: "Australia", query: "perth", flag: "🇦🇺" },
      {
        name: "Auckland",
        country: "New Zealand",
        query: "auckland",
        flag: "🇳🇿",
      },
      {
        name: "Wellington",
        country: "New Zealand",
        query: "wellington",
        flag: "🇳🇿",
      },
      { name: "Suva", country: "Fiji", query: "suva", flag: "🇫🇯" },
    ],
  },
  {
    title: "🌍 Middle East",
    data: [
      { name: "Dubai", country: "UAE", query: "dubai", flag: "🇦🇪" },
      { name: "Abu Dhabi", country: "UAE", query: "abu dhabi", flag: "🇦🇪" },
      { name: "Doha", country: "Qatar", query: "doha", flag: "🇶🇦" },
      {
        name: "Kuwait City",
        country: "Kuwait",
        query: "kuwait city",
        flag: "🇰🇼",
      },
      { name: "Riyadh", country: "Saudi Arabia", query: "riyadh", flag: "🇸🇦" },
      { name: "Jeddah", country: "Saudi Arabia", query: "jeddah", flag: "🇸🇦" },
      { name: "Tehran", country: "Iran", query: "tehran", flag: "🇮🇷" },
      { name: "Baghdad", country: "Iraq", query: "baghdad", flag: "🇮🇶" },
      { name: "Damascus", country: "Syria", query: "damascus", flag: "🇸🇾" },
      { name: "Beirut", country: "Lebanon", query: "beirut", flag: "🇱🇧" },
      { name: "Amman", country: "Jordan", query: "amman", flag: "🇯🇴" },
      { name: "Jerusalem", country: "Israel", query: "jerusalem", flag: "🇮🇱" },
      { name: "Tel Aviv", country: "Israel", query: "tel aviv", flag: "🇮🇱" },
    ],
  },
  {
    title: "🌏 Central Asia",
    data: [
      { name: "Almaty", country: "Kazakhstan", query: "almaty", flag: "🇰🇿" },
      {
        name: "Nur-Sultan",
        country: "Kazakhstan",
        query: "nur-sultan",
        flag: "🇰🇿",
      },
      { name: "Bishkek", country: "Kyrgyzstan", query: "bishkek", flag: "🇰🇬" },
      {
        name: "Dushanbe",
        country: "Tajikistan",
        query: "dushanbe",
        flag: "🇹🇯",
      },
      {
        name: "Ashgabat",
        country: "Turkmenistan",
        query: "ashgabat",
        flag: "🇹🇲",
      },
    ],
  },
];

export default function App() {
  const [city, setCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(
    CITIES_BY_CONTINENT[0].data[0]
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(CITIES_BY_CONTINENT);

  const getWeather = async (cityQuery) => {
    setLoading(true);
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityQuery}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "4d8732ff41mshb43406621fab0c0p1548b9jsn707a6eb4d959",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.location && result.current) {
        setCity(result);
      } else {
        Alert.alert("Error", "Weather data not available for this city");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(selectedCity.query);
  }, [selectedCity]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCities(CITIES_BY_CONTINENT);
    } else {
      const filtered = CITIES_BY_CONTINENT.map((continent) => ({
        ...continent,
        data: continent.data.filter(
          (city) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            city.country.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((continent) => continent.data.length > 0);
      setFilteredCities(filtered);
    }
  }, [searchQuery]);

  const handleCitySelect = (cityItem) => {
    setSelectedCity(cityItem);
    setModalVisible(false);
    setSearchQuery("");
  };

  const getBackgroundImage = () => {
    if (!city) return null;

    const isDay = city.current.is_day;
    const condition = city.current.condition.text.toLowerCase();

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (condition.includes("snow")) {
      return "https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (condition.includes("cloud")) {
      return isDay
        ? "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else {
      return isDay
        ? "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        : "https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("sun") || conditionLower.includes("clear"))
      return "☀️";
    if (conditionLower.includes("cloud")) return "☁️";
    if (conditionLower.includes("rain")) return "🌧️";
    if (conditionLower.includes("snow")) return "❄️";
    if (conditionLower.includes("storm")) return "⛈️";
    if (conditionLower.includes("fog") || conditionLower.includes("mist"))
      return "🌫️";
    return "🌤️";
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {city && (
        <ImageBackground
          source={{ uri: getBackgroundImage() }}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay} />
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.citySelector}
                onPress={() => setModalVisible(true)}
              >
                <View style={styles.cityInfo}>
                  <Text style={styles.cityFlag}>{selectedCity.flag}</Text>
                  <View>
                    <Text style={styles.cityName}>{city.location.name}</Text>
                    <Text style={styles.countryName}>
                      {city.location.country}
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-down" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Main Weather Info */}
            <View style={styles.mainWeather}>
              <Text style={styles.weatherIcon}>
                {getWeatherIcon(city.current.condition.text)}
              </Text>
              <Text style={styles.temperature}>
                {Math.round(city.current.temp_c)}°
              </Text>
              <Text style={styles.condition}>
                {city.current.condition.text}
              </Text>
              <Text style={styles.feelsLike}>
                Feels like {Math.round(city.current.feelslike_c)}°
              </Text>
            </View>

            {/* Weather Details */}
            <View style={styles.weatherDetails}>
              <View style={styles.detailItem}>
                <Feather name="wind" size={20} color="#fff" />
                <Text style={styles.detailText}>
                  {city.current.wind_kph} km/h
                </Text>
                <Text style={styles.detailLabel}>Wind</Text>
              </View>

              <View style={styles.detailItem}>
                <Feather name="droplet" size={20} color="#fff" />
                <Text style={styles.detailText}>{city.current.humidity}%</Text>
                <Text style={styles.detailLabel}>Humidity</Text>
              </View>

              <View style={styles.detailItem}>
                <Feather name="eye" size={20} color="#fff" />
                <Text style={styles.detailText}>{city.current.vis_km} km</Text>
                <Text style={styles.detailLabel}>Visibility</Text>
              </View>

              <View style={styles.detailItem}>
                <Feather name="thermometer" size={20} color="#fff" />
                <Text style={styles.detailText}>
                  {city.current.pressure_mb} mb
                </Text>
                <Text style={styles.detailLabel}>Pressure</Text>
              </View>
            </View>
          </View>

          {/* City Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select City</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Feather name="x" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                  <Feather
                    name="search"
                    size={20}
                    color="#666"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search cities or countries..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#999"
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                      <Feather name="x" size={20} color="#666" />
                    </TouchableOpacity>
                  )}
                </View>

                <SectionList
                  sections={filteredCities}
                  keyExtractor={(item, index) => item.name + index}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.cityItem,
                        selectedCity.name === item.name &&
                          styles.selectedCityItem,
                      ]}
                      onPress={() => handleCitySelect(item)}
                    >
                      <View style={styles.cityItemContent}>
                        <Text style={styles.cityFlag}>{item.flag}</Text>
                        <View style={styles.cityItemInfo}>
                          <Text style={styles.cityItemName}>{item.name}</Text>
                          <Text style={styles.cityItemCountry}>
                            {item.country}
                          </Text>
                        </View>
                      </View>
                      {selectedCity.name === item.name && (
                        <Feather name="check" size={20} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                  )}
                  style={styles.cityList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </Modal>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    alignItems: "flex-start",
  },
  citySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    backdropFilter: "blur(10px)",
    minWidth: 200,
  },
  cityInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  cityName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  countryName: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  mainWeather: {
    alignItems: "center",
    marginTop: -50,
  },
  weatherIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 120,
    fontWeight: "200",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  condition: {
    fontSize: 24,
    color: "#fff",
    marginTop: -10,
    textAlign: "center",
    fontWeight: "300",
  },
  feelsLike: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 8,
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backdropFilter: "blur(10px)",
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  detailLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  cityList: {
    maxHeight: 500,
  },
  sectionHeader: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedCityItem: {
    backgroundColor: "#f8f9ff",
  },
  cityItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityItemInfo: {
    marginLeft: 12,
  },
  cityItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  cityItemCountry: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
