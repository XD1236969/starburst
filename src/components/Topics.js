import React from "react";
import { List, ListItem } from "semantic-ui-react";
import firebase from "../utils/firebase"
import "firebase/firestore";
function Topics(){
    const[topics,setTopics] =React.useState([]);
    React.useEffect(()=>{
        firebase.firestore().collection("topics")
        .get()
        .then((collectionSnapshot)=>{
            const data = collectionSnapshot.docs.map(doc=>{
                return doc.data();
            });
            setTopics(data);
        });
    },[])
    return <List animated selection>
        {topics.map(topic =>{
            return(
                <ListItem key={topic.name}>
                    {topic.name}
                </ListItem>
            )
        })}
    </List>;
}

export default Topics;