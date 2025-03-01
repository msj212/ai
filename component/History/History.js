import React, { useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Card, Avatar, IconButton, Text, ProgressBar, Chip, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Interview from '../Interview/Interview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const completedInterviews = [
  {
    id: '1',
    name: 'John Doe',
    date: 'Feb 25, 2024',
    role: 'Software Engineer',
    status: 'Passed',
    image: 'https://source.unsplash.com/600x400/?man',
    feedback: 'Great problem-solving skills and good communication.',
    totalQuestions: 10,
    correctAnswers: 8,
    duration: '45 min',
  },
  {
    id: '2',
    name: 'Jane Smith',
    date: 'Feb 20, 2024',
    role: 'UI/UX Designer',
    status: 'Failed',
    image: 'https://source.unsplash.com/600x400/?woman',
    feedback: 'Needs improvement in design principles and prototyping.',
    totalQuestions: 15,
    correctAnswers: 6,
    duration: '30 min',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    date: 'Feb 18, 2024',
    role: 'Data Scientist',
    status: 'Passed',
    image: 'https://source.unsplash.com/600x400/?data,science',
    feedback: 'Strong analytical skills and great knowledge of ML models.',
    totalQuestions: 12,
    correctAnswers: 10,
    duration: '50 min',
  },
];

export default function History() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getAvatarColor = (status) => {
    return status === 'Passed' ? '#4CAF50' : '#F44336';
  };

  const getScoreText = (correct, total) => {
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    return `${correct}/${total} (${percentage.toFixed(0)}%)`;
  };

  const navigation = useNavigation();

  const retryInterview = () => {
    navigation.navigate('Interview');
    console.log("hello world");
    
  };

  const renderStatusChip = (status) => (
    <Chip
      mode="outlined"
      style={{
        backgroundColor: status === 'Passed' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
        borderColor: status === 'Passed' ? '#4CAF50' : '#F44336',
      }}
      textStyle={{
        color: status === 'Passed' ? '#4CAF50' : '#F44336',
        fontWeight: 'bold',
      }}
    >
      {status}
    </Chip>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Interview History</Text>
      <FlatList
        data={completedInterviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={styles.card} elevation={2}>
            <Card.Title
              title={item.name}
              titleStyle={styles.cardTitle}
              subtitle={`${item.role}`}
              subtitleStyle={styles.cardSubtitle}
              left={(props) => (
                <Avatar.Text
                  {...props}
                  label={item.name?.charAt(0) || '?'}
                  style={{ backgroundColor: getAvatarColor(item.status) }}
                />
              )}
              right={(props) => (
                <View style={styles.headerRight}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  {renderStatusChip(item.status)}
                </View>
              )}
            />
            <Card.Cover source={{ uri: item.image }} style={styles.cardCover} />
            
            <Card.Content style={styles.statsContainer}>
              <Surface style={styles.statItem}>
                <MaterialCommunityIcons name="file-question-outline" size={22} color="#666" />
                <Text style={styles.statValue}>{item.totalQuestions}</Text>
                <Text style={styles.statLabel}>Questions</Text>
              </Surface>
              
              <Surface style={styles.statItem}>
                <MaterialCommunityIcons name="check-circle-outline" size={22} color="#4CAF50" />
                <Text style={styles.statValue}>{getScoreText(item.correctAnswers, item.totalQuestions)}</Text>
                <Text style={styles.statLabel}>Score</Text>
              </Surface>
              
              <Surface style={styles.statItem}>
                <MaterialCommunityIcons name="clock-outline" size={22} color="#666" />
                <Text style={styles.statValue}>{item.duration}</Text>
                <Text style={styles.statLabel}>Duration</Text>
              </Surface>
            </Card.Content>
            
            <Card.Content style={styles.progressContainer}>
              <ProgressBar
                progress={item.totalQuestions > 0 ? item.correctAnswers / item.totalQuestions : 0}
                color={item.correctAnswers / item.totalQuestions > 0.5 ? '#4CAF50' : '#F44336'}
                style={styles.progressBar}
              />
            </Card.Content>
            
            <Card.Actions style={styles.cardActions}>
            <IconButton  onPress={retryInterview} icon="history" style={styles.actionIcon}  size={20}  />
              <IconButton icon="share" style={styles.actionIcon} size={20} />
              <IconButton
                icon={expanded[item.id] ? 'chevron-up' : 'chevron-down'}
                onPress={() => toggleExpand(item.id)}
                style={styles.expandIcon}
                size={20}
              />
            </Card.Actions>
            
            {expanded[item.id] && (
              <Card.Content style={styles.feedbackContainer}>
                <Text style={styles.feedbackTitle}>Feedback:</Text>
                <Surface style={styles.feedbackContent}>
                  <Text style={styles.feedbackText}>{item.feedback}</Text>
                </Surface>
              </Card.Content>
            )}
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 12,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 24,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    width: width - 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 13,
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  cardCover: {
    height: 180,
    resizeMode: 'cover',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 1,
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  actionIcon: {
    margin: 0,
  },
  expandIcon: {
    marginLeft: 8,
  },
  feedbackContainer: {
    paddingTop: 0,
    paddingBottom: 16,
  },
  feedbackTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  feedbackContent: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    elevation: 1,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});