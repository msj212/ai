import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import * as Speech from 'expo-speech';

const interviewQuestions = [
  { id: 1, question: 'What is React Native?', options: ['Library', 'Framework', 'Language', 'IDE'], correct: 1 },
  { id: 2, question: 'What does JSX stand for?', options: ['Java Syntax XML', 'JavaScript XML', 'JavaScript Extension', 'None'], correct: 1 },
  { id: 3, question: 'Which company developed React Native?', options: ['Google', 'Microsoft', 'Facebook', 'Apple'], correct: 2 },
];

export default function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const mouthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      nextQuestion();
    }
  }, [timer]);

  useEffect(() => {
    if (isSpeaking) {
      // Start avatar animations when speaking
      startSpeakingAnimation();
    } else {
      // Reset animations when not speaking
      Animated.timing(pulseAnim, { toValue: 1, duration: 100, useNativeDriver: true }).start();
      Animated.timing(glowAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
      Animated.timing(mouthAnim, { toValue: 0, duration: 100, useNativeDriver: false }).start();
    }
  }, [isSpeaking]);

  const startSpeakingAnimation = () => {
    // Create pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Create glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Create mouth animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(mouthAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(mouthAnim, {
          toValue: 0.5,
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(mouthAnim, {
          toValue: 0.8,
          duration: 150,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(mouthAnim, {
          toValue: 0.3,
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const handleAnswer = (index) => {
    setSelectedOption(index);
    if (index === interviewQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    // Stop speaking if in progress
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    }
    
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimer(30);
    } else {
      alert(`Interview Completed! Your Score: ${score}/${interviewQuestions.length}`);
    }
  };

  const speakQuestion = () => {
    // Stop any previous speech
    Speech.stop();
    
    setIsSpeaking(true);
    
    Speech.speak(interviewQuestions[currentQuestion].question, {
      language: 'en-US',
      rate: 0.5,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // Dynamic shadow based on glow animation
  const glowStyle = {
    shadowColor: '#4299e1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowAnim,
    shadowRadius: 10,
    elevation: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 12]
    }),
  };

  // Dynamic border for "mouth" animation
  const mouthStyle = {
    borderBottomWidth: mouthAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 5]
    }),
    borderBottomColor: '#333',
    marginBottom: 5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}/{interviewQuestions.length}</Text>
        <Text style={[styles.timer, timer < 10 && styles.timerWarning]}>
          Time Left: {timer}s
        </Text>
      </View>
      
      <TouchableOpacity onPress={speakQuestion} style={styles.avatarContainer}>
        <Animated.View 
          style={[
            styles.avatarWrapper, 
            glowStyle,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <Image source={require('./../../assets/avatar.webp')} style={styles.avatar} />
          <Animated.View style={[styles.mouth, mouthStyle, isSpeaking && styles.mouthActive]} />
          
          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <Text style={styles.speakingText}>Speaking...</Text>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.question}>{interviewQuestions[currentQuestion].question}</Text>
      
      <View style={styles.optionsContainer}>
        {interviewQuestions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && styles.selectedOption
            ]}
            onPress={() => handleAnswer(index)}
            disabled={selectedOption !== null}
          >
            <Text style={[
              styles.optionText,
              selectedOption === index && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={[
          styles.nextButton,
          selectedOption === null && styles.disabledButton
        ]}
        onPress={nextQuestion}
        disabled={selectedOption === null}
      >
        <Text style={styles.nextButtonText}>Next Question</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  timerWarning: {
    color: '#e53e3e',
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarWrapper: {
    borderRadius: 60,
    backgroundColor: '#fff',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  mouth: {
    position: 'absolute',
    bottom: 30,
    width: 40,
    height: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    borderRadius: 10,
  },
  mouthActive: {
    borderBottomColor: '#3182ce',
  },
  speakingIndicator: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: '#3182ce',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  speakingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2d3748',
    lineHeight: 30,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#edf2f7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedOption: {
    backgroundColor: '#3182ce',
    borderColor: '#2c5282',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4a5568',
  },
  selectedOptionText: {
    color: 'white',
  },
  nextButton: {
    backgroundColor: '#3182ce',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#a0aec0',
  },
});