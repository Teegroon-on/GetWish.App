import Toast from 'react-native-toast-message';
import { navigateAction } from './NavigationService';
import {
  goToAddPost,
  goToAddWish, goToAddWishList, goToShareScreen, goToWishList
} from './helpers';
import { archiveWishList, deleteWish, deleteWishList } from '../redux/actions/wishListActions';
import { deleteComment, deletePost, reportPost } from '../redux/actions/postsActions';

export class ActionSheets {
  constructor(t, showActionSheetWithOptions) {
    this.t = t;
    this.showActionSheetWithOptions = showActionSheetWithOptions;
  }

  deleteWishList(id, el, close, goToWishListFunc) {
    this.showActionSheetWithOptions({
      options: [
        this.t('cancel'),
        this.t('delete'),
      ],
      title: this.t('wishlists_delete'),
      message: this.t('nonCancelable'),
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1,
      userInterfaceStyle: 'dark'
    }, async (buttonIndexChild) => {
      if (buttonIndexChild === 1) {
        await deleteWishList(id, el?.private);
        if (close) {
          close();
        }
        if (goToWishListFunc) {
          goToWishList();
        }
        Toast.show({
          type: 'search',
          text1: this.t('wishlists_deleted'),
          position: 'bottom',
          bottomOffset: 95
        });
      }
    });
  }

  showShareAction(close) {
    this.showActionSheetWithOptions({
      options: [this.t('cancel'), this.t('share')],
      cancelButtonIndex: 0,
      useModal: true,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
        close();
      }
    });
  }

  showActionComment(id) {
    this.showActionSheetWithOptions({
      options: [this.t('cancel'), this.t('delete')],
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1,
      userInterfaceStyle: 'dark'
    }, async (buttonIndexChild) => {
      if (buttonIndexChild === 1) {
        await deleteComment(id);
        Toast.show({
          type: 'search',
          text1: this.t('commentsDeleted'),
          position: 'bottom',
          bottomOffset: 95
        });
      }
    });
  }

  showShareActionInMyWish(id, close, backEdit) {
    this.showActionSheetWithOptions({
      options: [
        this.t('cancel'),
        this.t('change'),
        this.t('share'),
        this.t('delete'),
      ],
      message: this.t('wishlists_actions'),
      cancelButtonIndex: 0,
      useModal: true,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        goToAddWish({ id, backEdit });
        if (close) {
          close();
        }
      }
      if (buttonIndex === 2) {
        goToShareScreen();
        if (close) {
          close();
        }
      }
      if (buttonIndex === 3) {
        this.showActionSheetWithOptions({
          options: [this.t('cancel'), this.t('delete')],
          title: this.t('desires_delete'),
          message: this.t('nonCancelable'),
          cancelButtonIndex: 0,
          destructiveButtonIndex: 1,
          userInterfaceStyle: 'dark'
        }, async (buttonIndexChild) => {
          if (buttonIndexChild === 1) {
            await deleteWish(id);
            if (close) {
              close();
            }
            Toast.show({
              type: 'search',
              text1: this.t('desires_deleted'),
              position: 'bottom',
              bottomOffset: 95
            });
          }
        });
      }
    });
  }

  showShareActionInMyWishList(id, el, privateMode, archiveMode, close, parent, goToWishListFunc) {
    if (archiveMode) {
      this.showActionSheetWithOptions({
        options: [
          this.t('cancel'),
          this.t('change'),
          this.t('publish'),
          this.t('delete')],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      }, async (buttonIndex) => {
        if (buttonIndex === 1) {
          await goToAddWishList({ id });
          parent.setOptions({ tabBarStyle: { display: 'none' } });
        }
        if (buttonIndex === 2) {
          this.showActionSheetWithOptions({
            options: [
              this.t('cancel'),
              this.t('publish')
            ],
            title: this.t('wishlists_publish'),
            message: this.t('wishlists_publishInfo'),
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          }, async (buttonIndexChild) => {
            if (buttonIndexChild === 1) {
              await archiveWishList(id, el?.private, el, false);
            }
          });
        }
        if (buttonIndex === 3) {
          this.deleteWishList(id, el, close, goToWishListFunc);
        }
      });
    } else {
      this.showActionSheetWithOptions({
        options: [
          this.t('cancel'),
          this.t('change'),
          this.t('share'),
          this.t('archive'),
          this.t('delete')],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      }, async (buttonIndex) => {
        if (buttonIndex === 1) {
          await goToAddWishList({ id });
          parent.setOptions({ tabBarStyle: { display: 'none' } });
        }
        if (buttonIndex === 2) {
          goToShareScreen();
        }
        if (buttonIndex === 3) {
          this.showActionSheetWithOptions({
            options: [this.t('cancel'), this.t('archive')],
            title: this.t('wishlists_archiveList'),
            message: this.t('wishlists_archiveListInfo'),
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          }, async (buttonIndexChild) => {
            if (buttonIndexChild === 1) {
              await archiveWishList(id, el?.private, el);
              Toast.show({
                type: 'search',
                text1: this.t('addToArchive'),
                position: 'bottom',
                bottomOffset: 95
              })
            }
          });
        }
        if (buttonIndex === 4) {
          this.deleteWishList(id, el, close, goToWishListFunc);
        }
      });
    }
  }

  showPostAction(id, my) {
    if (my) {
      this.showActionSheetWithOptions({
        options: [
          this.t('cancel'),
          this.t('change'),
          this.t('share'),
          this.t('delete')],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      }, async (buttonIndex) => {
        if (buttonIndex === 1) {
          goToAddPost({ id });
        }
        if (buttonIndex === 2) {
          goToShareScreen();
        }
        if (buttonIndex === 3) {
          this.showActionSheetWithOptions({
            options: [
              this.t('cancel'),
              this.t('delete')
            ],
            title: this.t('deletePostQuestion'),
            message: this.t('nonCancelable'),
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          }, async (buttonIndexChild) => {
            if (buttonIndexChild === 1) {
              await deletePost(id);
              Toast.show({
                type: 'search',
                text1: this.t('postDeleted'),
                position: 'bottom',
                bottomOffset: 95
              })
            }
          });
        }
      });
    } else {
      this.showActionSheetWithOptions({
        options: [
          this.t('cancel'),
          this.t('share'),
          this.t('report')
        ],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      }, async (buttonIndex) => {
        if (buttonIndex === 1) {
          goToShareScreen();
        }
        if (buttonIndex === 2) {
          this.showActionSheetWithOptions({
            options: [
              this.t('cancel'),
              this.t('dontLikeIt'),
              this.t('thisSpam'),
              this.t('nakedImg'),
              this.t('agressiveImage'),
              this.t('fakeInfo'),
              this.t('fakeFollowing'),
              this.t('fraud'),
              this.t('dangerOrganization'),
              this.t('intelleginceP'),
              this.t('noLegalSale'),
              this.t('suicide'),
              this.t('fakeEat')
            ],
            title: this.t('titleReport'),
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          }, async (buttonIndexChild) => {
            if (buttonIndexChild === 1) {
              await reportPost(id, 'Мне это не нравится');
            }
            if (buttonIndexChild === 2) {
              await reportPost(id, 'Это спам'); // reaon2
            }
            if (buttonIndexChild === 3) {
              await reportPost(id, 'Изображение обнаженного тела или действий сексуального характера'); // reason3
            }
            if (buttonIndexChild === 4) {
              await reportPost(id, 'Враждебные высказывания или символы'); // reason3
            }
            if (buttonIndexChild === 5) {
              await reportPost(id, 'Ложная информация'); // reason3
            }
            if (buttonIndexChild === 6) {
              await reportPost(id, 'Травля или преследование'); // reason3
            }
            if (buttonIndexChild === 7) {
              await reportPost(id, 'Мошенничество или обман'); // reason3
            }
            if (buttonIndexChild === 8) {
              await reportPost(id, 'Насилие или опасные организации'); // reason3
            }
            if (buttonIndexChild === 9) {
              await reportPost(id, 'Нарушение прав на интеллектуальную собственность'); // reason3
            }
            if (buttonIndexChild === 10) {
              await reportPost(id, 'Нарушение прав на интеллектуальную собственность'); // reason3
            }
            if (buttonIndexChild === 11) {
              await reportPost(id, 'Самоубийство или нанесение себе увечий'); // reason3
            }
            if (buttonIndexChild === 12) {
              await reportPost(id, 'Расстройства пищевого поведения'); // reason3
            }

          });
        }
      });
    }

  }
}
