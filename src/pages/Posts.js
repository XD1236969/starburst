import { Grid, GridRow ,Item,Icon,Container} from "semantic-ui-react";
import Topics from "../components/Topics";
import React from "react";
import firebase from "../utils/firebase";
import { DocumentSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";


function Posts(){
    const [posts,setPosts] =React.useState([]);
    React.useEffect(()=>{
        firebase.firestore().collection("posts").get().then((collectionSnapshot)=>{
            const data = collectionSnapshot.docs.map(docSnapshot =>{
                const id=docSnapshot.id;
                return {...docSnapshot.data(),id};
            })
            setPosts(data);
        })
    }, []) // Add an empty dependency array to useEffect to ensure it only runs once
    return ( 
    <Container>
    <Grid>
        <Grid.Row>
            <Grid.Column width={3}><Topics/></Grid.Column>
            <Grid.Column width={10}>
                <Item.Group>
                {posts.map(post=>{
                return  <Item key={post.id} as={Link} to={`/posts/${post.id}`} >
                    <Item.Image src={post.imageUrl || "https://cdn.discordapp.com/attachments/1012352722244227144/1225236820405780480/rickroll-roll_1.gif?ex=662065b5&is=660df0b5&hm=6ec83c23a8a05874f8534be727502301e8b56d08a9ebdeb949fa4ac299f01a79&"} size="medium" />
                    <Item.Content>
                        <Item.Meta>
                            {(post.author.photoURL?  <Image src={post.author.photoURL}/> : <Icon name="user circle" /> )}
                        {post.topic}.{post.author.displayname || "使用者"}
                        </Item.Meta>
                        <Item.Header>{post.title}</Item.Header>
                        <Item.Description>{post.content}</Item.Description>
                        <Item.Extra>
                            留言 0 。 讚 0
                        </Item.Extra>
                    </Item.Content>
                </Item>;
            })}
            </Item.Group>
            </Grid.Column>
            <Grid.Column width={3}>星爆</Grid.Column>
        </Grid.Row>
    </Grid>;
    </Container>
    )
}

export default Posts;