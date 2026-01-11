import { View, Text, Button } from "react-native";
import { useTodoStore } from "../store/useTodoStore";
//import { useDispatch } from "react-redux";
//mport { removeTodo } from "../store/todosSlice"; 
export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title } = route.params;
  const { removeTodo } = useTodoStore(); // Zustand

  const handleDelete = () => {
    removeTodo(id);       // supprime la tâche du store
    navigation.goBack();  // revient à l'écran précédent
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{title}</Text>

      <Button
        title="Supprimer cette tâche"
        color="red"
        onPress={handleDelete}
      />
    </View>
  );
}
/*
export default function TodoDetailsScreen({ route, navigation }) { 
 const { id, title } = route.params; 
 const dispatch = useDispatch(); 
 
 const handleDelete = () => { 
   dispatch(removeTodo(id)); 
   navigation.goBack(); 
 }; 
 
 return ( 
   <View style={{ flex: 1, padding: 20 }}> 
     <Text style={{ fontSize: 24 }}>{title}</Text> 
 
     <Button 
       title="Supprimer cette tâche" 
       color="red" 
       onPress={handleDelete} 
     /> 
   </View> 
 ); 
} 
*/