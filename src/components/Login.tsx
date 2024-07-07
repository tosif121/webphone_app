import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HistoryContext from '../context/HistoryContext';
import { login } from '../utils/apiUtils';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, secureTextEntry, error }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { username, setUsername, password, setPassword } = useContext(HistoryContext);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const formValidation = (values: { username: string; password: string }) => {
    const errors: Record<string, string> = {};
    if (!values.username) errors.username = 'Please enter username';
    if (!values.password) {
      errors.password = 'Please enter password';
    } else if (values.password.length < 6) {
      errors.password = 'Password length should be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = useCallback(async () => {
    setError(null);
    const errors = formValidation({ username, password });
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const data = await login(username, password);
      if (data.message === 'wrong login info') {
        setValidationErrors({ general: 'Incorrect username or password' });
        return;
      }
      navigation.navigate('Home');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  }, [username, password, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <InputField
            label="Username"
            value={username}
            onChangeText={setUsername}
            error={validationErrors.username}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={!showPassword}
                placeholder="Enter password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                <Icon
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {validationErrors.password && (
              <Text style={styles.errorText}>{validationErrors.password}</Text>
            )}
          </View>
          {validationErrors.general && (
            <Text style={styles.errorText}>{validationErrors.general}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: 'black',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Login;
