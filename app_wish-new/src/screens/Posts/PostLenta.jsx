import React, {useState} from 'react';
import {FlatList, ScrollView, View} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';
import EmptyPost from '../../components/Posts/EmptyPost';
import {
  getMyWishLists,
  getPostsForLenta,
  resetReportStatus
} from '../../redux/actions/postsActions';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';


function PostLenta({ empty = true }) {
  const { lentaPosts, reportStatus } = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = React.useState(false);
  const [take, setTake] = useState(5)
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
      await getPostsForLenta(5).then(() => setRefreshing(false));
  }, []);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(reportStatus === 'success') {
      getPostsForLenta(take);
      dispatch(resetReportStatus());
      Toast.show({
        type: 'search',
        text1: t('successReport'),
        position: 'bottom',
        bottomOffset: 95
      })
    }
  }, [reportStatus]);
  const loadMore = async () => {
      setTake((prevState => prevState + 5))
      await getPostsForLenta(take);
  }

  React.useEffect(() => {
    (async function () {
        await getPostsForLenta(take);
    }());
  }, []);
  return (
    <>
      <View
          width="100%"
          height="100%"
          backgroundColor={COLORS.white2}
          display="flex"
          flex={1}
      >
      {lentaPosts?.length ? (
        <FlatList
          data={lentaPosts}
          keyExtractor={(item) => item.id}
          width="100%"
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          backgroundColor={COLORS.white2}
          display="flex"
          marginBottom='80px'
          refreshControl={(
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
              />
          )}
          flex={1}
          renderItem={({ item: el }) => {
            return <PostBody lenta key={el.id} my={false} el={el} more />;
          }}
        />
      ) : <EmptyPost variant={1} />}
      </View>
    </>
  );
}

export default PostLenta;
