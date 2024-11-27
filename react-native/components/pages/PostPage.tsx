import React, { useEffect, useState } from "react";
import { Button, Container, Text } from "@/components/atoms";
import { RequestPostType } from "@/interfaces/RequestPostType";
import { router } from "expo-router";
import { get } from "@/utils/api";
import { useToast } from "react-native-toast-notifications";
import { RequestPostOrganism } from "@/components/organismes";

interface PostPageProps {
  id: string | number;
}

const PostContent = ({ post }: { post: RequestPostType }) => {
  return (
    <Container.Page style={{ alignItems: "flex-start" }}>
      <Container.Base>
        <Text.Bold>Intitulé</Text.Bold>
        <Text.Common>{post.title}</Text.Common>
      </Container.Base>
      <Container.Base>
        <Text.Bold>Autheur</Text.Bold>
        <Text.Common>{post.user.username}</Text.Common>
      </Container.Base>
      <Container.Base style={{ alignItems: "flex-start" }}>
        <Text.Bold>Description</Text.Bold>
        <Text.Common>{post.description}</Text.Common>
      </Container.Base>
      <Container.Base>
        <RequestPostOrganism.ContactButton post={post} />
      </Container.Base>
    </Container.Page>
  );
};

const PostPage: React.FC<PostPageProps> = ({ id }) => {
  const [post, setPost] = useState<RequestPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    get(`/request-posts/${id}`)
      .then((response) => {
        setPost(response);
        setLoading(false);
      })
      .catch((error) => {
        if (error.status === 404) {
          toast.show("Post not found", {
            type: "danger",
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
          });
        } else {
          toast.show("Something went wrong", {
            type: "danger",
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
          });
        }
        router.push("/");
      });
  }, []);

  const handleEditPress = () => {
    console.log("Edit post");
  };

  return loading || !post ? (
    <Text.Common>Loading...</Text.Common>
  ) : (
    <PostContent post={post} />
  );
  // return (
  //   <Container.Page>
  //   </Container.Page>
  // );
};

export default PostPage;
