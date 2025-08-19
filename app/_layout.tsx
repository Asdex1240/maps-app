import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/presentation/hooks/useColorScheme';
import PermissionCheckerProvider from '@/presentation/providers/PermissionCheckerProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PermissionCheckerProvider>
        <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='loading/index' options={{ animation: 'none'}}/>
        <Stack.Screen name='map/index' options={{ animation: 'fade'}}/>
        <Stack.Screen name='permissions/index' options={{ animation: 'fade'}}/>
      </Stack>
      </PermissionCheckerProvider>
    </ThemeProvider>
  );
}
