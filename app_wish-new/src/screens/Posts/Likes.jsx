import React from 'react';
import {
  FlatList, Text, View
} from 'native-base';
import { COLORS } from '../../functions/constants';
import { getLikes } from '../../redux/actions/postsActions';
import LikesBody from '../../components/Posts/LikesBody';
import useLoader from "../../hooks/useLoader";
import {handleGoToUser} from "../../functions/helpers";
import { useIsFocused } from '@react-navigation/native';
import {useI18n} from "../../i18n/i18n";

function Likes({ navigation, route: { params: { postId }, ...props } }) {
  const parent = navigation.getParent();
  const { start, stop, loading } = useLoader(true);
  const [data, setData] = React.useState([]);
  const t = useI18n()

  React.useEffect(() => {
    (async function () {
      start()
      try {
        const likesData = await getLikes(postId);
        setData(likesData);
      } finally {
        stop()
      }
    }());
  }, [postId]);

  const handleGoToUserHandler = async (id) => {
    parent.setOptions({ tabBarStyle: { display: 'flex' } });
    await handleGoToUser(id)
  }


  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused)
    parent.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation, focused]);

  return (
    <>
      {data?.length ? (
        <FlatList
          data={data}
          height="100%"
          backgroundColor={COLORS.white2}
          pl="20px"
          pr="20px"
          pt="20px"
          flex={1}
          width="100%"
          renderItem={({ item: el }) => {
            return (
              <LikesBody handleGoToUserHandler={handleGoToUserHandler} lenta my el={el} postId={postId} />
            );
          }}
        />
      ) : (
        <View backgroundColor={COLORS.white2} height="100%" width="100%" flex={1} justifyContent="center" alignItems="center">
          <Text color={COLORS.gray}>{t('noLikes')}</Text>
        </View>
      )}
    </>
  );
}

export default Likes;
