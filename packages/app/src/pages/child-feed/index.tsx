import React from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRoute, RouteProp } from "@react-navigation/core";
import { ChildStackParamList } from "navigation/child-stack-navigator";
import * as Types from "types";
import colors from "colors";
import FeedTile from "components/feed-tile";

const fullWidth = Dimensions.get("window").width;

export type FeedRouteParam = {
  categoryId: string;
};

type CategoryData = {
  categoryById: Types.ICategory;
};

const GET_CHILD_CATEGORY = gql`
  query GetChildCategory($categoryId: ID!) {
    categoryById(id: $categoryId) {
      id
      title
      description
      icon
      feed {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            title
            type
            category
            images {
              id
              url
            }
            videos {
              id
              url
              cover
            }
          }
        }
      }
    }
  }
`;

type FeedRoute = RouteProp<ChildStackParamList, "childFeed">;

const Feed = () => {
  const route = useRoute<FeedRoute>();
  const { categoryId } = route.params;

  const { data } = useQuery<CategoryData>(GET_CHILD_CATEGORY, {
    variables: { categoryId }, //, types: ["image", "markdown", "video", "inapp"] },
  });

  const category = data?.categoryById;
  if (!category) {
    return null;
  }

  const feed = category.feed;

  const renderItem = ({ item }: { item: Types.IPostEdge }) => {
    return <FeedTile post={item} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={feed.edges}
        renderItem={renderItem}
        keyExtractor={(item: Types.IPostEdge) => item.node.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop: 120,
  },
  scrollViewContent: {
    marginTop: 45,
    paddingBottom: 200,
    // marginHorizontal: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  backContainer: {
    width: 44,
    height: 44,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  navbarContainer: {
    flexGrow: 1,
    position: "absolute",
    bottom: 0,
    width: fullWidth,
    height: 100,
    borderColor: "red",
  },
  navbarRow: {
    flexDirection: "row",
    paddingHorizontal: 30,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default Feed;
