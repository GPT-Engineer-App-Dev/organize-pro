import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, Text } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleToggleTaskCompletion = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Todo List</Text>
      <Box display="flex" mb={4}>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button onClick={handleAddTask} ml={2} colorScheme="blue">
          <FaPlus />
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" alignItems="center">
            <ListIcon
              as={task.isCompleted ? FaCheckCircle : FaRegCircle}
              color={task.isCompleted ? 'green.500' : 'gray.500'}
              onClick={() => handleToggleTaskCompletion(task.id)}
              cursor="pointer"
            />
            <Text as={task.isCompleted ? 's' : 'span'} flex="1" ml={2}>
              {task.text}
            </Text>
            <IconButton
              icon={<FaTrash />}
              onClick={() => handleDeleteTask(task.id)}
              colorScheme="red"
              aria-label="Delete task"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;