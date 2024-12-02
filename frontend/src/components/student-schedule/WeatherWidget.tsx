import React from 'react';
import {
  Box,
  Text,
  Icon,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';
import MinimizableWidget from './MinimizableWidget';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = React.useState({
    temp: '24°C',
    condition: 'sunny',
    location: 'Your Location'
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return WiDaySunny;
      case 'rainy':
        return WiRain;
      case 'cloudy':
        return WiCloudy;
      case 'snow':
        return WiSnow;
      default:
        return WiDaySunny;
    }
  };

  return (
    <MinimizableWidget title="Weather">
      <VStack spacing={3} align="center">
        <Text 
          color="whiteAlpha.800" 
          fontSize="sm"
        >
          {weather.location}
        </Text>
        <HStack spacing={4} align="center">
          <Icon
            as={getWeatherIcon(weather.condition)}
            color="#CDF683"
            w={10}
            h={10}
          />
          <Text 
            color="white" 
            fontSize="2xl" 
            fontWeight="semibold"
          >
            {weather.temp}
          </Text>
        </HStack>
      </VStack>
    </MinimizableWidget>
  );
};

export default WeatherWidget;
