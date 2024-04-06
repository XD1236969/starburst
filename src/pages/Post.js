import React from "react";
import { Container, Grid , Image ,Item ,Header, Segment, Icon } from "semantic-ui-react";
import Topics from "../components/Topics";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import firebase from "../utils/firebase";
import { firestore } from "firebase/firestore";

function Post() {
    const { postId } = useParams();
    const [post, setPost] = React.useState({
        author:{},
    });
    React.useEffect(() => {
        firebase.firestore().collection("posts").doc(postId).get().then((docSnapshot) => {
            const data = docSnapshot.data();
            setPost(data);
        })
    }, [])
    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}><Topics /></Grid.Column>
                    <Grid.Column width={10}>
                        {post.author.displayName}
                        <Header>
                            {post.title}
                            <Header.Subheader>
                                {post.topic}。{post.createdAt?.toDate().toLocaleDateString()}
                            </Header.Subheader>
                        </Header>
                        <Image src={post.imageUrl || "https://cdn.discordapp.com/attachments/1012352722244227144/1225236820405780480/rickroll-roll_1.gif?ex=662065b5&is=660df0b5&hm=6ec83c23a8a05874f8534be727502301e8b56d08a9ebdeb949fa4ac299f01a79&"} size="massive" />
                        <Segment basic vertical>{post.content}</Segment>
                        <Segment basic vertical>
                            留言 0 。 讚 0 。 <Icon name="thumbs up outline" color="grey"/>。 <Icon name="bookmark outline" color="grey"/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>星爆</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Post;
