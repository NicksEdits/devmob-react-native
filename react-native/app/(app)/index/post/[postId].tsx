import { Text } from "@/components/atoms";
import ListPage from "@/components/pages/ListPage";
import PostPage from "@/components/pages/PostPage";
import { useLocalSearchParams } from "expo-router";

const PostScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  return <PostPage id={postId} />;
};

export default PostScreen;
