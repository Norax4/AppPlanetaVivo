import { RootStack } from './src/routes/RootStack.js';
import { AuthProvider } from './src/database/authContext.js';

export default function App() {
	return (
		<AuthProvider>
			<RootStack />
		</AuthProvider>
	);
}
